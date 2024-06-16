# Forces explicit selection of all fields in Prisma queries (`prisma/require-select`)

💼 This rule is enabled in the ✅ `recommended` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->
## Purpose

The `prisma/explicit-field-selection` rule enforces that all fields must be explicitly selected in Prisma queries. This rule ensures that developers are mindful of the data being retrieved, which helps optimize performance and avoid fetching unnecessary fields.

* **Performance optimization:** By explicitly selecting only the required fields, the amount of data transferred from the database is minimized, which can significantly improve query performance and reduce memory usage.
* **Clarity and maintainability:** Explicit field selection makes the code more readable and maintainable by clearly indicating which fields are being used. This helps other developers understand the data dependencies without needing to refer back to the schema.
* **Avoiding over-fetching:** Prevents the common mistake of over-fetching data, which can lead to inefficiencies and potential security issues if sensitive data is unintentionally retrieved.
* **Safe handling of database changes:** When no `select` clause is provided in a Prisma query, Prisma does not perform a `SELECT *` operation as in traditional SQL. Instead, it explicitly selects all columns by name. This behavior can cause queries to fail if a column is removed from the database schema. By enforcing explicit field selection, developers can ensure that their queries remain resilient to such schema changes, as they will only fetch the fields that are explicitly required.

## Examples

### Incorrect

Consider the following example of a Prisma query without explicit field selection, which is **incorrect** code for this rule:

```typescript
const users = await prisma.user.findMany();
```

### Correct

With the `prisma/explicit-field-selection` rule enforced, the **correct** code would be:

```typescript
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});
```

## How It Works

* The rule scans Prisma query methods (`findMany`, `findUnique`, `findFirst`, etc.) for the `select` property.
* If a query does not include the `select` property the rule flags an error.
* The error message guides the developer to include a `select` property with the required fields.

## Options

<!-- begin auto-generated rule options list -->

| Name      | Description                                                        | Type     | Default                                                                          |
| :-------- | :----------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------- |
| `methods` | Prisma methods that should be checked for explicit field selection | String[] | [`findFirst`, `findFirstOrThrow`, `findMany`, `findUnique`, `findUniqueOrThrow`] |

<!-- end auto-generated rule options list -->

## When Not To Use It

* **Prototyping and rapid development:** During the initial stages of development or prototyping, explicitly selecting fields might slow down the development process. In such cases, it might be more practical to disable this rule until the schema stabilizes.
* **Dynamic queries:** If your application requires dynamic selection of fields based on user input or other runtime conditions, this rule might be too restrictive. In such cases, consider alternative ways to handle field selection dynamically.
* **Legacy codebases:** Introducing this rule into an existing codebase with many Prisma queries might require significant refactoring. In such scenarios, it might be more pragmatic to gradually adopt explicit field selection rather than enforcing it immediately.

## Further Reading

* [Select fields (Concepts) | Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/queries/select-fields)
