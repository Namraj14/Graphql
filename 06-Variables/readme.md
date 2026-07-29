# 06 - GraphQL Variables

# Table of Contents

1. Introduction
2. What are Variables?
3. Why Variables are Important
4. Hardcoded Values vs Variables
5. Variable Syntax
6. Declaring Variables
7. Using Variables
8. Variable Types
9. Required Variables
10. Optional Variables
11. Default Values
12. Multiple Variables
13. Variables with Input Objects
14. Variables with Lists
15. Variables in Mutations
16. Variables in GraphQL Clients
17. Validation Rules
18. Common Errors
19. Best Practices
20. Real-World Examples
21. Summary

---

# Introduction

Variables allow you to **pass dynamic values** into a GraphQL query.

Instead of hardcoding values inside the query, you declare placeholders and provide their values separately.

This makes queries:

- Reusable
- Cleaner
- More secure
- Easier to maintain

Variables are heavily used in production GraphQL applications.

---

# What are Variables?

Variables are placeholders whose values are supplied when the query executes.

Instead of writing

```graphql
query {

    account(id: "001") {

        name

    }

}
```

You write

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

    }

}
```

And pass

```json
{
    "id": "001"
}
```

---

# Why Variables are Important

Imagine searching for different Accounts.

Without variables

```graphql
query {

    account(id: "001") {

        name

    }

}
```

To fetch Account 002, you must edit the query.

With variables

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

    }

}
```

You only change

```json
{
    "id":"002"
}
```

The query remains unchanged.

---

# Hardcoded Values vs Variables

Hardcoded

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Using Variables

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
    "id":"001"
}
```

| Hardcoded | Variables |
|-----------|-----------|
| Less reusable | Highly reusable |
| Requires editing | Query stays unchanged |
| Harder to maintain | Easy to maintain |
| Less flexible | Very flexible |

---

# Variable Syntax

General syntax

```graphql
query OperationName($variable: Type) {

    field(argument: $variable) {

        field

    }

}
```

Example

```graphql
query GetUser($id: ID!) {

    user(id: $id) {

        name

    }

}
```

---

# Declaring Variables

Variables are declared after the operation name.

```graphql
query GetAccount(

    $id: ID!

) {

    account(id: $id) {

        name

    }

}
```

---

# Using Variables

Variables are referenced using `$`.

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        id

        name

    }

}
```

Variables JSON

```json
{
    "id":"001"
}
```

---

# Variable Types

Variables use GraphQL data types.

Example

```graphql
query Search(

    $id: ID!

    $name: String

    $age: Int

    $salary: Float

    $active: Boolean

) {

    user(id: $id) {

        name

    }

}
```

Common types

| Type | Example |
|------|----------|
| ID | `"001"` |
| String | `"John"` |
| Int | `25` |
| Float | `95.5` |
| Boolean | `true` |

---

# Required Variables

A required variable uses `!`.

```graphql
query GetUser($id: ID!) {

    user(id: $id) {

        name

    }

}
```

Variables

```json
{
    "id":"100"
}
```

If the value isn't supplied,

GraphQL returns an error.

---

# Optional Variables

Optional variables don't use `!`.

```graphql
query SearchUsers(

    $department: String

) {

    users(department: $department) {

        name

    }

}
```

The variable may be omitted.

---

# Default Values

Variables can have default values.

```graphql
query GetAccount(

    $id: ID = "001"

) {

    account(id: $id) {

        name

    }

}
```

If no value is passed,

GraphQL uses `"001"`.

---

# Multiple Variables

```graphql
query SearchUsers(

    $department: String!

    $active: Boolean!

) {

    users(

        department: $department

        active: $active

    ) {

        name

        email

    }

}
```

Variables

```json
{
    "department":"Sales",
    "active":true
}
```

---

# Variables with Input Objects

Instead of many variables,

GraphQL often accepts one input object.

Schema

```graphql
input UserFilter {

    department: String

    active: Boolean

}
```

Query

```graphql
query Search(

    $filter: UserFilter

) {

    users(filter: $filter) {

        name

    }

}
```

Variables

```json
{
    "filter":{
        "department":"Sales",
        "active":true
    }
}
```

---

# Variables with Lists

Variables can also hold lists.

```graphql
query GetUsers(

    $ids: [ID!]!

) {

    users(ids: $ids) {

        name

    }

}
```

Variables

```json
{
    "ids":[
        "100",
        "101",
        "102"
    ]
}
```

---

# Variables in Mutations

Variables are commonly used in mutations.

```graphql
mutation CreateAccount(

    $name: String!

    $industry: String!

) {

    createAccount(

        name: $name

        industry: $industry

    ) {

        id

        name

    }

}
```

Variables

```json
{
    "name":"OpenAI",
    "industry":"Technology"
}
```

---

# Variables in GraphQL Clients

Most GraphQL clients send variables separately.

Example request

```json
{
    "query":"query GetAccount($id:ID!){account(id:$id){name}}",
    "variables":{
        "id":"001"
    }
}
```

This is how tools like Apollo Client, Relay, and Postman send GraphQL requests.

---

# Validation Rules

Before execution,

GraphQL validates variables.

Checks include

- Required variables exist
- Correct data type
- Correct list type
- Correct input object fields
- Correct enum values

If validation fails,

the query never executes.

---

# Common Errors

## Missing Required Variable

Query

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

    }

}
```

Variables

```json
{}
```

Error

```
Variable "$id" of required type "ID!" was not provided.
```

---

## Wrong Type

Expected

```graphql
$id: Int
```

Provided

```json
{
    "id":"ABC"
}
```

Validation fails.

---

## Unknown Variable

Query

```graphql
query GetAccount {

    account(id: $id) {

        name

    }

}
```

The variable wasn't declared.

GraphQL returns an error.

---

## Unused Variable

```graphql
query GetAccount(

    $id: ID!

) {

    accounts {

        name

    }

}
```

`$id` is declared but never used.

Most GraphQL implementations return a validation error.

---

# Internal Execution

```
Client

↓

Query

↓

Variables

↓

Parser

↓

Validation

↓

Resolver

↓

Database

↓

JSON Response
```

Example

```
Variables

↓

{
"id":"001"
}

↓

Resolver

↓

SELECT *

FROM Account

WHERE Id='001'

↓

Response
```

---

# Real-World Salesforce Example

Query

```graphql
query GetAccount(

    $accountId: ID!

) {

    account(id: $accountId) {

        id

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
    "accountId":"001XXXXXXXXXXXX"
}
```

The same query can be reused for any Account by changing only the variable value.

---

# Best Practices

✔ Always use variables instead of hardcoded values

✔ Use meaningful variable names

✔ Declare only variables you need

✔ Use required variables when appropriate

✔ Prefer input objects for complex filters

✔ Validate user input before sending variables

✔ Reuse queries whenever possible

✔ Keep variables separate from query text

---

# Summary

Variables make GraphQL queries dynamic and reusable.

Execution Flow

```
Query

↓

Variables

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

- Variables replace hardcoded values in GraphQL queries.
- Variables are declared after the operation name.
- Variables are referenced using the `$` symbol.
- Variable values are sent separately as JSON.
- Variables support all GraphQL scalar, list, enum, and input object types.
- Required variables use `!`.
- Default values can be assigned to variables.
- Variables are validated before query execution.
- Variables improve security, readability, and reusability.
- Nearly every production GraphQL application uses variables.
