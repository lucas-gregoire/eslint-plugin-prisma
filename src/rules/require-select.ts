import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { createRule } from '../utils/create-rule';

type MessageIds = 'missingSelect' | 'insertSelect';

type Options = [{ methods?: readonly string[] }?];

const DEFAULT_OPTIONS = [
  { methods: ['findFirst', 'findFirstOrThrow', 'findMany', 'findUnique', 'findUniqueOrThrow'] },
] as const;

export const requireSelect = createRule<Options, MessageIds>({
  name: 'require-select',
  defaultOptions: DEFAULT_OPTIONS,
  meta: {
    type: 'problem',
    docs: {
      description: 'Forces explicit selection of all fields in Prisma queries',
      recommended: 'recommended',
    },
    schema: [
      {
        type: 'object',
        properties: {
          methods: {
            type: 'array',
            description: 'Prisma methods that should be checked for explicit field selection',
            items: { type: 'string' },
            default: [...DEFAULT_OPTIONS[0].methods],
          },
        },
        additionalProperties: false,
      },
    ],
    hasSuggestions: true,
    messages: {
      missingSelect: '"select" property is required in Prisma "{{ method }}" calls',
      insertSelect: 'Insert "select" property',
    },
  },
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const methods = context.options[0]?.methods ?? DEFAULT_OPTIONS[0].methods;

    return {
      CallExpression(node) {
        if (
          node.callee.type !== AST_NODE_TYPES.MemberExpression ||
          node.callee.property.type !== AST_NODE_TYPES.Identifier ||
          !methods.includes(node.callee.property.name)
        ) {
          return;
        }

        const firstArg = node.arguments.at(0);
        if (!firstArg || firstArg.type !== AST_NODE_TYPES.ObjectExpression) {
          context.report({
            node,
            messageId: 'missingSelect',
            data: { method: node.callee.property.name },
            suggest: [
              {
                messageId: 'insertSelect',
                fix: (fixer) => fixer.replaceTextRange([node.callee.range[1], node.range[1]], '({ select: {} })'),
              },
            ],
          });
          return;
        }

        const hasSelect = firstArg.properties.some(
          (prop) =>
            prop.type === AST_NODE_TYPES.Property &&
            prop.key.type === AST_NODE_TYPES.Identifier &&
            prop.key.name === 'select',
        );

        const firstArgText = services.esTreeNodeToTSNodeMap.get(firstArg).getFullText();
        const indentationShift = firstArgText.match(/(\s+)/)?.[1] ?? ' ';

        if (!hasSelect) {
          const hasProperties = firstArg.properties.length > 0;

          context.report({
            node: firstArg,
            messageId: 'missingSelect',
            data: { method: node.callee.property.name },
            suggest: [
              {
                messageId: 'insertSelect',
                fix: (fixer) => {
                  if (hasProperties) {
                    return fixer.insertTextBefore(firstArg.properties[0], `select: {},${indentationShift}`);
                  }
                  return fixer.replaceText(firstArg, '{ select: {} }');
                },
              },
            ],
          });
        }
      },
    };
  },
});
