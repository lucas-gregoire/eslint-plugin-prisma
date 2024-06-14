# eslint-plugin-prisma

ESLint plugin ensuring best practices and code quality for Prisma with TypeScript

## Overview

This ESLint plugin is designed to help developers maintain best practices and enforce code quality when using Prisma in TypeScript projects. It includes a set of custom rules tailored to the specific requirements and idioms of Prisma, aiming to prevent common pitfalls and encourage efficient, clean, and secure database interactions.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm install eslint --save-dev
```

Next, install `eslint-plugin-prisma`:

```sh
npm install eslint-plugin-prisma --save-dev
```

## Usage

Load the `recommended` configuration:

```json
{
  "extends": ["plugin:eslint-plugin-prisma/recommended"]
}
```

Add `prisma` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix.
Then configure the rules you want to use under the rules section:

```json
{
  "plugins": ["prisma"],
  "rules": {
    "prisma/explicit-field-selection": "error"
  }
}
```

## Configurations

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                           | Description                                               | 💼 | 💡 |
| :--------------------------------------------- | :-------------------------------------------------------- | :- | :- |
| [require-select](docs/rules/require-select.md) | Forces explicit selection of all fields in Prisma queries | ✅  | 💡 |

<!-- end auto-generated rules list -->
