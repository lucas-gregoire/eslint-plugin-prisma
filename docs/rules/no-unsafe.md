# Disallow the use of potentially unsafe Prisma methods (`prisma/no-unsafe`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->
## Purpose

This rule disallows the use of potentially unsafe Prisma methods such as raw queries to prevent SQL injection vulnerabilities. Using certain Prisma methods can expose your application to SQL injection attacks if not handled properly. This rule helps in identifying and preventing the use of such methods.

## Examples

### Incorrect

```typescript
import { prisma } from '@prisma/client';

async function unsafeQuery() {
  const result = await prisma.$queryRawUnsafe('SELECT * FROM Users WHERE id = ?', userId);
}

async function unsafeExecute() {
  await prisma.$executeRawUnsafe('DELETE FROM Users WHERE id = ?', userId);
}
```

### Correct

```typescript
import { prisma } from '@prisma/client';

async function safeQuery() {
  const result = await prisma.$queryRaw`SELECT * FROM Users WHERE id = ${userId}`);
}

async function safeExecute() {
  await prisma.$executeRaw`DELETE FROM Users WHERE id = ${userId}`);
}
```

## Options

<!-- begin auto-generated rule options list -->

| Name      | Description                              | Type     | Default                                  |
| :-------- | :--------------------------------------- | :------- | :--------------------------------------- |
| `methods` | Prisma methods that are declared unsafe. | String[] | [`$queryRawUnsafe`, `$executeRawUnsafe`] |

<!-- end auto-generated rule options list -->

## Further Reading

* [Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries)
* [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
