import { RuleTester } from '@typescript-eslint/rule-tester';
import { noUnsafe } from '../../src/rules/no-unsafe';

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

ruleTester.run('no-unsafe', noUnsafe, {
  valid: [
    INIT + 'prisma.$queryRaw`SELECT * FROM users`',
    INIT + 'prisma.$executeRaw`DELETE FROM users WHERE id = 1`',
    INIT + 'const results = await prisma.$queryRaw`SELECT * FROM posts WHERE id = ${id}`;',
    INIT + 'await prisma.$executeRaw`UPDATE posts SET title = ${title} WHERE id = ${id}`;',
    // These cases are not compiling that's why they are valid
    'prisma.$queryRawUnsafe("SELECT * FROM users")',
    INIT + 'prisma.$queryRawUnsafe`SELECT * FROM users WHERE id = ${userId}`',
  ],
  invalid: [
    {
      code: INIT + 'prisma.$queryRawUnsafe("SELECT * FROM users")',
      errors: [
        {
          messageId: 'unsafeMethod',
          data: { method: '$queryRawUnsafe' },
        },
      ],
    },
    {
      code: INIT + 'prisma.$executeRawUnsafe("DELETE FROM users WHERE id = 1")',
      errors: [
        {
          messageId: 'unsafeMethod',
          data: { method: '$executeRawUnsafe' },
        },
      ],
    },
    {
      code: INIT + 'const results = await prisma.$queryRawUnsafe("SELECT * FROM posts WHERE id = " + id);',
      errors: [
        {
          messageId: 'unsafeMethod',
          data: { method: '$queryRawUnsafe' },
        },
      ],
    },
    {
      code: INIT + 'await prisma.$executeRawUnsafe("UPDATE posts SET title = " + title + " WHERE id = " + id);',
      errors: [
        {
          messageId: 'unsafeMethod',
          data: { method: '$executeRawUnsafe' },
        },
      ],
    },
  ],
});
