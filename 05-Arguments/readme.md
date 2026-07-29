# 05 - GraphQL Arguments

# Table of Contents

1. Introduction
2. What are Arguments?
3. Why Arguments are Important
4. Basic Syntax
5. Types of Arguments
6. Required vs Optional Arguments
7. Multiple Arguments
8. Arguments with Variables
9. Default Values
10. Nested Field Arguments
11. List Arguments
12. Input Objects
13. Arguments vs Variables
14. Validation Rules
15. Common Errors
16. Best Practices
17. Real-World Examples
18. Summary

---

# Introduction

Arguments allow you to **pass values into GraphQL fields**.

Think of them as **parameters of a function**.

Without arguments, GraphQL would always return the same data.

With arguments, you can request:

- A specific Account
- Users from a department
- Products within a category
- Orders between dates
- Records matching search criteria

Arguments make GraphQL dynamic.

---

# What are Arguments?

Arguments provide input to a field.

Example

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Here,

```
id: "001"
```

is the argument.

---

# Why Arguments are Important

Suppose a database contains

```
Account

001

002

003

004

005
```

Without arguments

```graphql
query {

    accounts {

        name

    }

}
```

Returns

```
All Accounts
```

With arguments

```graphql
query {

    account(id: "003") {

        name

    }

}
```

Returns

```
Only Account 003
```

---

# Basic Syntax

General syntax

```graphql
field(argument: value)
```

Example

```graphql
query {

    user(id: "100") {

        name

    }

}
```

---

# Multiple Arguments

A field can accept multiple arguments.

```graphql
query {

    users(

        department: "Sales",

        active: true

    ) {

        name

        email

    }

}
```

---

# Common Argument Types

| Type | Example |
|------|----------|
| ID | `"001"` |
| String | `"Technology"` |
| Int | `10` |
| Float | `99.95` |
| Boolean | `true` |
| Enum | `ACTIVE` |

---

# Required Arguments

Schema

```graphql
type Query {

    account(id: ID!): Account

}
```

Notice

```
ID!
```

The exclamation mark means

```
Required
```

Query

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Valid.

---

# Optional Arguments

Schema

```graphql
users(active: Boolean)
```

Since there is no `!`

the argument is optional.

Both queries are valid.

```graphql
query {

    users {

        name

    }

}
```

and

```graphql
query {

    users(active: true) {

        name

    }

}
```

---

# Arguments with Variables

Hardcoded

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Using variables

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

    }

}
```

Variables

```json
{
    "id": "001"
}
```

Using variables is considered a best practice.

---

# Default Variable Values

Variables can have default values.

```graphql
query GetAccount($id: ID = "001") {

    account(id: $id) {

        name

    }

}
```

If no value is provided,

GraphQL uses `"001"`.

---

# Nested Field Arguments

Arguments are not limited to root fields.

Example

```graphql
query {

    account(id: "001") {

        contacts(limit: 5) {

            firstName

            lastName

        }

    }

}
```

Here,

`contacts` also accepts arguments.

---

# Pagination Arguments

A common use of arguments is pagination.

```graphql
query {

    accounts(first: 10) {

        edges {

            node {

                name

            }

        }

    }

}
```

Another example

```graphql
query {

    accounts(

        first: 10,

        after: "cursor123"

    ) {

        edges {

            node {

                name

            }

        }

    }

}
```

---

# Sorting Arguments

Example

```graphql
query {

    accounts(

        orderBy: NAME,

        direction: ASC

    ) {

        name

    }

}
```

---

# Filtering Arguments

Example

```graphql
query {

    products(

        category: "Laptop",

        available: true

    ) {

        name

        price

    }

}
```

---

# Search Arguments

```graphql
query {

    search(

        keyword: "Salesforce"

    ) {

        title

    }

}
```

---

# List Arguments

Arguments can also accept lists.

Example

```graphql
query {

    users(

        ids: [

            "100",

            "101",

            "102"

        ]

    ) {

        name

    }

}
```

---

# Input Objects

Instead of many arguments,

GraphQL often uses an input object.

Schema

```graphql
input UserFilter {

    department: String

    active: Boolean

}
```

Query

```graphql
query {

    users(

        filter: {

            department: "Sales",

            active: true

        }

    ) {

        name

    }

}
```

This keeps queries clean.

---

# Arguments vs Variables

Hardcoded arguments

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Variables

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

    }

}
```

| Arguments | Variables |
|------------|-----------|
| Actual values | Placeholders |
| Written inside the field | Declared at the top |
| Less reusable | More reusable |

---

# Validation Rules

GraphQL validates arguments before execution.

Checks include

- Required arguments provided
- Correct data type
- Valid enum values
- Correct list type
- Existing input fields

---

# Common Errors

## Missing Required Argument

```graphql
query {

    account {

        name

    }

}
```

Error

```
Field "account" argument "id" is required.
```

---

## Wrong Data Type

Expected

```graphql
id: ID
```

Sent

```graphql
id: true
```

Error

```
Expected type ID.
```

---

## Invalid Enum

Expected

```
ACTIVE

INACTIVE
```

Sent

```
RUNNING
```

Validation fails.

---

## Unknown Argument

```graphql
query {

    account(

        code: "001"

    ) {

        name

    }

}
```

If the schema doesn't define `code`

GraphQL returns an error.

---

# Internal Execution

```
Client

↓

Query

↓

Arguments

↓

Validation

↓

Resolver

↓

Database Query

↓

Response
```

Example

```
account(id:"001")

↓

Resolver

↓

SELECT * FROM Account
WHERE Id='001'

↓

Result
```

---

# Real-World Salesforce Example

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

        industry

        contacts(first: 5) {

            firstName

            lastName

            email

        }

    }

}
```

Variables

```json
{
    "id": "001XXXXXXXXXXXX"
}
```

The Account ID identifies the record, while the `first: 5` argument limits the number of related Contacts returned.

---

# Best Practices

✔ Use variables instead of hardcoded values

✔ Use meaningful argument names

✔ Keep filters simple

✔ Use input objects for many filters

✔ Validate input before sending

✔ Paginate large datasets

✔ Avoid unnecessary arguments

✔ Read the schema documentation

---

# Summary

Arguments allow GraphQL fields to receive input.

Execution Flow

```
Query

↓

Arguments

↓

Validation

↓

Resolver

↓

Database

↓

Response
```

## Key Takeaways

- Arguments provide input to GraphQL fields.
- Arguments work like function parameters.
- Arguments can be required or optional.
- Multiple arguments can be passed to a field.
- Variables make arguments reusable.
- Nested fields can also accept arguments.
- Arguments are commonly used for filtering, sorting, searching, and pagination.
- Input objects simplify complex filters.
- GraphQL validates all arguments before execution.
- Using variables with arguments is the recommended approach for production applications.
