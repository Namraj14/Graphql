# 07 - GraphQL Aliases

# Table of Contents

1. Introduction
2. What are Aliases?
3. Why Aliases are Needed
4. Basic Syntax
5. How Aliases Work
6. Querying the Same Field Multiple Times
7. Renaming Fields
8. Aliases with Arguments
9. Aliases with Nested Objects
10. Aliases vs Variables
11. Aliases vs Fragments
12. Internal Execution
13. Common Errors
14. Best Practices
15. Real-World Examples
16. Summary

---

# Introduction

Aliases allow you to **rename fields in the GraphQL response**.

They are one of GraphQL's most useful features because they let you:

- Query the same field multiple times
- Give meaningful names to fields
- Avoid naming conflicts
- Improve response readability

Without aliases, many valid use cases would not be possible.

---

# What are Aliases?

An alias gives a field a different name in the response.

Basic syntax

```graphql
aliasName: fieldName
```

Example

```graphql
query {

    company: account(id: "001") {

        name

    }

}
```

Response

```json
{
    "data": {
        "company": {
            "name": "OpenAI"
        }
    }
}
```

Notice that the response contains `company` instead of `account`.

---

# Why Aliases are Needed

Suppose you need two different accounts.

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

GraphQL returns an error because the same field is requested twice with different arguments.

Aliases solve this problem.

---

# Basic Syntax

```graphql
query {

    first: account(id: "001") {

        name

    }

    second: account(id: "002") {

        name

    }

}
```

Response

```json
{
    "data": {
        "first": {
            "name": "Google"
        },
        "second": {
            "name": "Microsoft"
        }
    }
}
```

---

# How Aliases Work

```
Query

↓

Alias

↓

Actual Field

↓

Resolver

↓

Response
```

Example

```
company

↓

account()

↓

Resolver

↓

Database

↓

Response

↓

company
```

The resolver still executes `account`.

Only the response name changes.

---

# Querying the Same Field Multiple Times

Without aliases

```graphql
query {

    user(id: "100") {

        name

    }

    user(id: "200") {

        name

    }

}
```

Result

```
Validation Error
```

With aliases

```graphql
query {

    employee: user(id: "100") {

        name

    }

    manager: user(id: "200") {

        name

    }

}
```

Response

```json
{
    "data": {
        "employee": {
            "name": "John"
        },
        "manager": {
            "name": "Sarah"
        }
    }
}
```

---

# Renaming Fields

Aliases aren't only for root fields.

You can rename any field.

Query

```graphql
query {

    account(id: "001") {

        companyName: name

        companyPhone: phone

    }

}
```

Response

```json
{
    "data": {
        "account": {
            "companyName": "OpenAI",
            "companyPhone": "1234567890"
        }
    }
}
```

---

# Aliases with Arguments

Example

```graphql
query {

    firstTen: products(limit: 10) {

        name

    }

    topFive: products(limit: 5) {

        name

    }

}
```

Response

```json
{
    "data": {
        "firstTen": [],
        "topFive": []
    }
}
```

---

# Aliases with Nested Objects

Aliases work on nested fields too.

```graphql
query {

    account(id: "001") {

        accountOwner: owner {

            fullName: name

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
            "accountOwner": {
                "fullName": "John Doe",
                "email": "john@test.com"
            }
        }
    }
}
```

---

# Multiple Levels of Aliases

```graphql
query {

    company: account(id: "001") {

        accountName: name

        ownerInfo: owner {

            ownerName: name

            ownerEmail: email

        }

    }

}
```

Response

```json
{
    "data": {
        "company": {
            "accountName": "OpenAI",
            "ownerInfo": {
                "ownerName": "John Doe",
                "ownerEmail": "john@test.com"
            }
        }
    }
}
```

---

# Aliases vs Variables

Variables

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

    }

}
```

Variables change **input values**.

Aliases

```graphql
query {

    company: account(id: "001") {

        name

    }

}
```

Aliases change **output names**.

| Variables | Aliases |
|-----------|----------|
| Input | Output |
| Dynamic values | Renamed fields |
| Sent separately | Written in query |

---

# Aliases vs Fragments

Fragments

```graphql
fragment UserFields on User {

    name

    email

}
```

Purpose

```
Reuse fields
```

Aliases

```graphql
employee: user(id:"100")
```

Purpose

```
Rename fields
```

They solve completely different problems.

---

# Internal Execution

```
Client

↓

Alias

↓

Actual Field

↓

Resolver

↓

Database

↓

Response

↓

Alias Name
```

The resolver never knows about the alias.

It only executes the original field.

---

# Common Errors

## Duplicate Fields Without Alias

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

Result

```
Fields "account" conflict because they have differing arguments.
```

---

## Using the Same Alias Twice

```graphql
query {

    company: account(id: "001") {

        name

    }

    company: account(id: "002") {

        name

    }

}
```

Result

```
Field conflict
```

Aliases must be unique within the same selection set.

---

## Confusing Aliases with Variables

Incorrect

```graphql
query {

    $company: account {

        name

    }

}
```

Variables begin with `$`.

Aliases never use `$`.

---

# Best Practices

✔ Use meaningful alias names

✔ Use aliases when requesting the same field multiple times

✔ Keep aliases readable

✔ Don't alias every field unnecessarily

✔ Avoid cryptic names

✔ Use aliases to improve API responses

---

# Real-World Salesforce Example

Suppose a dashboard compares two Accounts.

```graphql
query {

    currentCustomer: account(id: "001XXXXXXXXXXXX") {

        name

        industry

    }

    previousCustomer: account(id: "001YYYYYYYYYYYY") {

        name

        industry

    }

}
```

Response

```json
{
    "data": {
        "currentCustomer": {
            "name": "Acme Corp",
            "industry": "Manufacturing"
        },
        "previousCustomer": {
            "name": "Global Tech",
            "industry": "Technology"
        }
    }
}
```

Without aliases, this query would fail.

---

# Practical Example

Suppose an e-commerce website needs two product lists.

```graphql
query {

    featuredProducts: products(limit: 5) {

        name

        price

    }

    newestProducts: products(limit: 10) {

        name

        price

    }

}
```

One request returns two different datasets.

---

# Summary

Aliases rename fields in GraphQL responses.

Execution Flow

```
Query

↓

Alias

↓

Original Field

↓

Resolver

↓

Response

↓

Alias Name
```

## Key Takeaways

- Aliases rename fields in the response.
- They prevent naming conflicts.
- They allow the same field to be queried multiple times.
- Aliases work on root fields and nested fields.
- Aliases do not affect the resolver.
- Variables change input values, while aliases change output names.
- Fragments reuse field selections, whereas aliases rename fields.
- Use aliases only when they improve readability or resolve conflicts.
