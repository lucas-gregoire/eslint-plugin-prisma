import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule } from '../utils/create-rule';

type MessageIds = 'unsafeMethod';

type Options = [{ unsafeMethods?: readonly string[] }?];

const DEFAULT_OPTIONS = [{ unsafeMethods: ['$queryRawUnsafe', '$executeRawUnsafe'] }] as const;

export const noUnsafe = createRule<Options, MessageIds>({
  name: 'no-unsafe',
  defaultOptions: DEFAULT_OPTIONS,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow the use of potentially unsafe Prisma methods',
      recommended: 'recommended',
    },
    schema: [
      {
        type: 'object',
        properties: {
          methods: {
            type: 'array',
            description: 'Prisma methods that are declared unsafe.',
            items: { type: 'string' },
            default: [...DEFAULT_OPTIONS[0].unsafeMethods],
          },
        },
        additionalProperties: false,
      },
    ],
    hasSuggestions: false,
    messages: {
      unsafeMethod:
        'Avoid using potentially unsafe Prisma methods such as {{method}}. These methods can lead to SQL injection vulnerabilities if not used carefully.',
    },
  },
  create(context) {
    const unsafeMethods = context.options[0]?.unsafeMethods ?? DEFAULT_OPTIONS[0].unsafeMethods;

    return {
      CallExpression(node) {
        if (
          node.callee.type !== AST_NODE_TYPES.MemberExpression ||
          node.callee.property.type !== AST_NODE_TYPES.Identifier ||
          !unsafeMethods.includes(node.callee.property.name)
        ) {
          return;
        }

        context.report({
          node,
          messageId: 'unsafeMethod',
          data: { method: node.callee.property.name },
        });
      },
    };
  },
});
