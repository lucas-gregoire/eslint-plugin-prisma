// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../package.json') as {
  name: string;
  version: string;
};

import { Linter } from '@typescript-eslint/utils/ts-eslint';
import { requireSelect } from './rules/require-select';

export = {
  configs: {
    recommended: {
      plugins: ['prisma'],
      rules: {
        'prisma/require-select': 'error',
      } satisfies Record<string, Linter.RuleLevel>,
    },
  },
  meta: {
    name,
    version,
  },
  rules: {
    'require-select': requireSelect,
  },
} satisfies Linter.Plugin;
