// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../package.json') as {
  name: string;
  version: string;
};

import { Linter } from '@typescript-eslint/utils/ts-eslint';
import { requireSelect } from './rules/require-select';
import { noUnsafe } from './rules/no-unsafe';

export = {
  configs: {
    recommended: {
      plugins: ['prisma'],
      rules: {
        'prisma/no-unsafe': 'error',
        'prisma/require-select': 'error',
      } satisfies Record<string, Linter.RuleLevel>,
    },
  },
  meta: {
    name,
    version,
  },
  rules: {
    'no-unsafe': noUnsafe,
    'require-select': requireSelect,
  },
} satisfies Linter.Plugin;
