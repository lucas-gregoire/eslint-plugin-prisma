import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/lucas-gregoire/eslint-plugin-prisma/blob/main/docs/rules/${name}.md`,
);
