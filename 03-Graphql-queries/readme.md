# 03 - GraphQL Queries

# Table of Contents

1. Introduction
2. What is a Query?
3. Query Syntax
4. Basic Query Structure
5. Requesting Single Fields
6. Requesting Multiple Fields
7. Nested Queries
8. Query Arguments
9. Variables
10. Operation Names
11. Aliases
12. Fragments
13. Inline Fragments
14. Directives
15. Multiple Root Fields
16. Pagination Basics
17. Best Practices
18. Common Errors
19. Complete Examples
20. Summary

---

# Introduction

A **Query** is the most commonly used operation in GraphQL.

Its purpose is simple:

> **Retrieve data from the server.**

Think of a GraphQL query as asking a question.

Example:

> "Give me the account's name."

Or

> "Give me the account's name, industry, and owner's email."

Unlike REST APIs, GraphQL allows you to choose exactly which fields you want.

---

# What is a Query?

A query tells the GraphQL server:

- What object you want
- Which fields you need
- How the response should look

Example

```graphql
query {
    account(id: "001") {
        name
    }
}
```

Response

```json
{
    "data": {
        "account": {
            "name": "OpenAI"
        }
    }
}
```

---

# Query Syntax

Basic syntax

```graphql
query {
    object {
        field
    }
}
```

Example

```graphql
query {
    account {
        name
        industry
    }
}
```

Every GraphQL query follows this pattern.

---

# Basic Query Structure

```
query

↓

Root Field

↓

Arguments (Optional)

↓

Requested Fields

↓

Response
```

Example

```graphql
query {

    account(id: "001") {

        name

        industry

    }

}
```

---

# Anatomy of a Query

```graphql
query GetAccount {

    account(id: "001") {

        name

        industry

        phone

    }

}
```

Breakdown

| Part | Purpose |
|-------|----------|
| query | GraphQL operation |
| GetAccount | Operation name |
| account | Root field |
| id | Argument |
| name | Requested field |
| industry | Requested field |
| phone | Requested field |

---

# Requesting a Single Field

Query

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Response

```json
{
    "data": {
        "account": {
            "name": "OpenAI"
        }
    }
}
```

Only one field is returned.

---

# Requesting Multiple Fields

Query

```graphql
query {

    account(id: "001") {

        name

        industry

        phone

    }

}
```

Response

```json
{
    "data": {
        "account": {
            "name": "OpenAI",
            "industry": "Technology",
            "phone": "1234567890"
        }
    }
}
```

Only requested fields appear.

---

# Nested Queries

Objects can contain other objects.

Example

```graphql
query {

    account(id: "001") {

        name

        owner {

            name

            email

        }

    }

}
```

Response

```json
{
    "data": {
        "account": {
            "name": "OpenAI",
            "owner": {
                "name": "John Doe",
                "email": "john@test.com"
            }
        }
    }
}
```

Nested objects are one of GraphQL's biggest strengths.

---

# Deeply Nested Query

```graphql
query {

    account(id: "001") {

        name

        owner {

            name

            manager {

                name

                department {

                    name

                }

            }

        }

    }

}
```

Response structure

```
Account

└── Owner

      └── Manager

             └── Department
```

---

# Query Arguments

Arguments help filter data.

Example

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Arguments are similar to method parameters in programming languages.

Multiple arguments

```graphql
query {

    accounts(
        industry: "Technology",
        active: true
    ) {

        name

    }

}
```

---

# Variables

Instead of hardcoding values

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Use variables

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

Benefits

- Reusable
- Secure
- Cleaner
- Easier to maintain

---

# Variable Types

Example

```graphql
query GetUser(
    $id: ID!,
    $active: Boolean!
) {

    user(
        id: $id,
        active: $active
    ) {

        name

    }

}
```

Variable values

```json
{
    "id": "101",
    "active": true
}
```

---

# Operation Names

Operation names identify queries.

Example

```graphql
query GetAccounts {

    accounts {

        name

    }

}
```

Benefits

- Easier debugging
- Better logging
- Better monitoring
- Easier testing

---

# Aliases

Without aliases

```graphql
query {

    account(id: "001") {

        name

    }

    account(id: "002") {

        name

    }

}
```

This causes an error because the same root field is requested twice.

With aliases

```graphql
query {

    firstAccount: account(id: "001") {

        name

    }

    secondAccount: account(id: "002") {

        name

    }

}
```

Response

```json
{
    "data": {
        "firstAccount": {
            "name": "Google"
        },
        "secondAccount": {
            "name": "Microsoft"
        }
    }
}
```

---

# Fragments

Fragments remove duplicate field selections.

Without fragment

```graphql
query {

    account {

        name

        industry

        phone

    }

    customer {

        name

        industry

        phone

    }

}
```

With fragment

```graphql
fragment BasicInfo on Company {

    name

    industry

    phone

}
```

Usage

```graphql
query {

    account {

        ...BasicInfo

    }

    customer {

        ...BasicInfo

    }

}
```

---

# Inline Fragments

Used when querying interfaces or unions.

Example

```graphql
query {

    search(text: "John") {

        ... on User {

            name

            email

        }

        ... on Company {

            companyName

            industry

        }

    }

}
```

---

# Directives

GraphQL supports built-in directives.

Common directives

```
@include

@skip

@deprecated
```

Example

```graphql
query {

    account {

        name

        phone @include(if: true)

    }

}
```

---

# Multiple Root Fields

A single query can request multiple objects.

```graphql
query {

    accounts {

        name

    }

    contacts {

        firstName

        lastName

    }

}
```

Response

```json
{
    "data": {
        "accounts": [],
        "contacts": []
    }
}
```

One request.

Multiple datasets.

---

# Pagination Basics

Instead of returning thousands of records,

fetch a limited number.

Example

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

Pagination improves performance.

---

# Query Execution Flow

```
Client

↓

Writes Query

↓

GraphQL Server

↓

Parse Query

↓

Validate Query

↓

Execute Resolvers

↓

Fetch Data

↓

Build JSON

↓

Return Response
```

---

# Common Errors

## Requesting a field that doesn't exist

```graphql
query {

    account {

        revenue

    }

}
```

Error

```
Cannot query field "revenue".
```

---

## Missing required argument

```graphql
query {

    account {

        name

    }

}
```

If the schema requires `id`, GraphQL returns an error.

---

## Invalid variable type

```graphql
query GetAccount($id: Int!) {

    account(id: $id) {

        name

    }

}
```

If `id` expects an `ID`, validation fails.

---

# Best Practices

✔ Use operation names

✔ Use variables instead of hardcoded values

✔ Request only required fields

✔ Reuse fragments

✔ Use aliases when querying the same field multiple times

✔ Avoid deeply nested queries unless necessary

✔ Paginate large datasets

✔ Keep queries readable

---

# Complete Example

Query

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        id

        name

        industry

        phone

        owner {

            id

            name

            email

        }

    }

}
```

Variables

```json
{
    "id": "001"
}
```

Response

```json
{
    "data": {
        "account": {
            "id": "001",
            "name": "OpenAI",
            "industry": "Technology",
            "phone": "1234567890",
            "owner": {
                "id": "U101",
                "name": "John Doe",
                "email": "john@test.com"
            }
        }
    }
}
```

---

# Real-World Salesforce Example

Suppose you want an Account and its Contacts.

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

        industry

        contacts {

            firstName

            lastName

            email

        }

    }

}
```

Instead of calling multiple REST endpoints, GraphQL returns everything in one response.

---

# Summary

A GraphQL Query is used to retrieve data.

General flow

```
Client

↓

Query

↓

Arguments

↓

Validation

↓

Resolvers

↓

Data Source

↓

JSON Response
```

## Key Takeaways

- Queries retrieve data from a GraphQL server.
- Clients specify exactly which fields they need.
- Queries can request nested objects.
- Arguments filter or identify records.
- Variables make queries reusable and secure.
- Operation names improve debugging.
- Aliases allow multiple requests for the same field.
- Fragments eliminate duplicate field selections.
- Inline fragments support interfaces and union types.
- Directives control conditional field execution.
- Multiple root fields allow fetching several datasets in one request.
- Pagination helps efficiently retrieve large datasets.
- GraphQL always returns data matching the query's structure.
