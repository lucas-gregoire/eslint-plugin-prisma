# eslint-plugin-prisma

ESLint plugin ensuring best practices and code quality for Prisma with TypeScript

## Overview

This ESLint plugin is designed to help developers maintain best practices and enforce code quality when using Prisma in TypeScript projects. It includes a set of custom rules tailored to the specific requirements and idioms of Prisma, aiming to prevent common pitfalls and encourage efficient, clean, and secure database interactions.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-prisma` :

```sh
npm install eslint-plugin-prisma --save-dev
```

## Usage

Add `prisma` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "prisma"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
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

⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.

| Name                                                               | Description                                               | ⚠️ |
| :----------------------------------------------------------------- | :-------------------------------------------------------- | :- |
| [explicit-field-selection](docs/rules/explicit-field-selection.md) | Forces explicit selection of all fields in Prisma queries | ✅  |

<!-- end auto-generated rules list -->

* `prisma/explicit-field-selection`: Forces explicit selection of all fields in Prisma queries.
