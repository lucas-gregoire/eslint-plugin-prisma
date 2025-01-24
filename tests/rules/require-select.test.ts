import { RuleTester } from '@typescript-eslint/rule-tester';
import { requireSelect } from '../../src/rules/require-select';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname + '/../test-project',
  },
});

export const INIT = `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

`;

ruleTester.run('require-select', requireSelect, {
  valid: [
    INIT + 'prisma.client.findMany({ select: { id: true, name: true } })',
    INIT + 'prisma.client.findMany({ where: { id: 123 }, select: { id: true, name: true } })',
  ],
  invalid: [
    {
      code: 'prisma.client.findMany({ where: { id: 123 } })',
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findMany' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output: 'prisma.client.findMany({ select: {}, where: { id: 123 } })',
            },
          ],
        },
      ],
    },
    {
      code: INIT + 'prisma.unknownTable.findMany({})',
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findMany' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output: INIT + 'prisma.unknownTable.findMany({ select: {} })',
            },
          ],
        },
      ],
    },
    {
      code: INIT + `prisma.client.findMany({ where: { id: 123 } })`,
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findMany' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output: INIT + `prisma.client.findMany({ select: {}, where: { id: 123 } })`,
            },
          ],
        },
      ],
    },
    {
      code:
        INIT +
        `
  prisma.client.findMany({
    where: { id: 123 },
  })
`,
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findMany' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output:
                INIT +
                `
  prisma.client.findMany({
    select: {},
    where: { id: 123 },
  })
`,
            },
          ],
        },
      ],
    },
    {
      code: INIT + 'prisma.client.findFirst({ })',
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findFirst' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output: INIT + 'prisma.client.findFirst({ select: {} })',
            },
          ],
        },
      ],
    },
    {
      code: INIT + 'prisma.client.findUnique()',
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findUnique' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output: INIT + 'prisma.client.findUnique({ select: {} })',
            },
          ],
        },
      ],
    },
    {
      code: INIT + 'const p = { prisma }; p.prisma.client.findUnique()',
      errors: [
        {
          messageId: 'missingSelect',
          data: { method: 'findUnique' },
          suggestions: [
            {
              messageId: 'insertSelect',
              output: INIT + 'const p = { prisma }; p.prisma.client.findUnique({ select: {} })',
            },
          ],
        },
      ],
    },
  ],
});
