# 04 - GraphQL Fields

# Table of Contents

1. Introduction
2. What are Fields?
3. Why Fields Matter
4. Field Syntax
5. Scalar Fields
6. Object Fields
7. Nested Fields
8. Field Selection Sets
9. Required vs Optional Fields
10. Computed Fields
11. Field Arguments
12. Aliases
13. Field Execution
14. Field Resolvers
15. Best Practices
16. Common Errors
17. Real-World Examples
18. Summary

---

# Introduction

Fields are the **building blocks** of every GraphQL query.

Whenever you write a GraphQL query, you're actually asking for one or more fields.

Example

```graphql
query {

    account(id: "001") {

        name

        industry

    }

}
```

Here,

- `account` is a field
- `name` is a field
- `industry` is a field

Everything you request in GraphQL is a field.

---

# What are Fields?

A field represents a piece of information available in the GraphQL schema.

Think of fields as properties of an object.

Example

```
Account

├── id

├── name

├── phone

├── website

└── industry
```

Each property is a field.

---

# Why Fields Matter

Unlike REST APIs,

GraphQL lets you choose exactly which fields you want.

REST

```
GET /accounts/1
```

Returns

```
Everything
```

GraphQL

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Returns

```
Only name
```

This reduces unnecessary data transfer.

---

# Field Syntax

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

    }

}
```

---

# Scalar Fields

Scalar fields return a single value.

Common scalar types

| Type | Example |
|------|----------|
| String | "OpenAI" |
| Int | 100 |
| Float | 99.5 |
| Boolean | true |
| ID | "001XYZ" |

Example

```graphql
query {

    account(id: "001") {

        id

        name

        annualRevenue

        active

    }

}
```

Response

```json
{
    "data": {
        "account": {
            "id": "001",
            "name": "OpenAI",
            "annualRevenue": 5000000,
            "active": true
        }
    }
}
```

---

# Object Fields

Some fields return another object instead of a simple value.

Example

```graphql
query {

    account(id: "001") {

        owner {

            name

            email

        }

    }

}
```

`owner` is an object field.

---

# Nested Fields

Object fields require another selection set.

Example

```graphql
query {

    account(id: "001") {

        owner {

            name

            email

            department {

                name

            }

        }

    }

}
```

GraphQL lets you navigate relationships naturally.

---

# Field Selection Sets

Whenever a field returns an object,

you must specify which fields you need.

Incorrect

```graphql
query {

    account {

        owner

    }

}
```

Correct

```graphql
query {

    account {

        owner {

            name

            email

        }

    }

}
```

This group of child fields is called a **Selection Set**.

---

# Required vs Optional Fields

GraphQL itself doesn't require you to request every field.

Suppose the schema contains

```
Account

├── id

├── name

├── phone

├── industry

└── website
```

You can request

```graphql
query {

    account {

        name

    }

}
```

or

```graphql
query {

    account {

        id

        name

        phone

        website

        industry

    }

}
```

Both are valid.

---

# Computed Fields

Some fields don't exist in a database.

Instead,

they are calculated by the resolver.

Example

Schema

```graphql
type User {

    firstName: String

    lastName: String

    fullName: String

}
```

Resolver

```
fullName = firstName + lastName
```

Query

```graphql
query {

    user {

        fullName

    }

}
```

The client doesn't know whether the value comes from a database or is computed.

---

# Field Arguments

Fields can accept arguments.

Example

```graphql
query {

    account(id: "001") {

        name

    }

}
```

Another example

```graphql
query {

    products(category: "Laptop") {

        name

        price

    }

}
```

Arguments filter or customize the returned data.

---

# Field Aliases

Aliases rename fields in the response.

Example

```graphql
query {

    companyName: account(id: "001") {

        name

    }

}
```

Response

```json
{
    "data": {
        "companyName": {
            "name": "OpenAI"
        }
    }
}
```

---

# Multiple Aliases

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

# Field Execution

GraphQL executes fields individually.

```
Query

↓

Account

↓

Owner

↓

Manager

↓

Department
```

Each field has its own execution step.

---

# Field Resolvers

Every field is resolved by a resolver function.

Example

```
name

↓

Name Resolver

↓

Database

↓

"OpenAI"
```

For nested fields

```
account

↓

owner

↓

email
```

Each field can have a different resolver.

---

# Response Shape

The response always matches the requested fields.

Query

```graphql
query {

    account(id: "001") {

        name

        owner {

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
                "email": "john@test.com"
            }
        }
    }
}
```

---

# Common Errors

## Requesting a field that doesn't exist

```graphql
query {

    account {

        salary

    }

}
```

Error

```
Cannot query field "salary".
```

---

## Missing Selection Set

Incorrect

```graphql
query {

    account {

        owner

    }

}
```

Correct

```graphql
query {

    account {

        owner {

            name

        }

    }

}
```

---

## Requesting Unnecessary Fields

Bad

```graphql
query {

    account {

        id

        name

        phone

        website

        createdDate

        modifiedDate

        annualRevenue

    }

}
```

Good

```graphql
query {

    account {

        name

        phone

    }

}
```

Only request what your application needs.

---

# Best Practices

✔ Request only required fields

✔ Keep nesting reasonable

✔ Use aliases when needed

✔ Avoid requesting unused data

✔ Understand which fields return objects

✔ Always provide selection sets for object fields

✔ Keep queries readable

---

# Salesforce Example

Suppose you need Account information.

```graphql
query {

    account(id: "001") {

        name

        industry

        billingCity

        owner {

            name

            email

        }

    }

}
```

Returned

```json
{
    "data": {
        "account": {
            "name": "Acme Corp",
            "industry": "Manufacturing",
            "billingCity": "New York",
            "owner": {
                "name": "John Doe",
                "email": "john@test.com"
            }
        }
    }
}
```

---

# Internal Execution

```
Client

↓

Query

↓

Field: account

↓

Resolver

↓

Database

↓

Account Object

↓

Field: owner

↓

Resolver

↓

User Object

↓

Field: email

↓

Response
```

Each field is resolved independently.

---

# Summary

Fields are the core of GraphQL.

Everything you request is a field.

Execution Flow

```
Query

↓

Fields

↓

Resolvers

↓

Data Source

↓

Response
```

## Key Takeaways

- Every GraphQL query is made up of fields.
- Fields define exactly what data is returned.
- Scalar fields return single values.
- Object fields return nested objects.
- Object fields require selection sets.
- Fields can accept arguments.
- Aliases rename fields in responses.
- Some fields are computed rather than stored.
- Every field is resolved independently.
- The response structure always matches the requested fields.
