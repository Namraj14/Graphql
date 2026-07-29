# 08 - GraphQL Fragments

# Table of Contents

1. Introduction
2. What are Fragments?
3. Why Fragments are Important
4. Basic Syntax
5. How Fragments Work
6. Reusing Fields
7. Named Fragments
8. Inline Fragments
9. Fragments with Interfaces
10. Fragments with Union Types
11. Nested Fragments
12. Fragments vs Aliases
13. Fragments vs Variables
14. Internal Execution
15. Common Errors
16. Best Practices
17. Real-World Examples
18. Summary

---

# Introduction

As GraphQL queries grow larger, you'll often notice that the same group of fields is requested repeatedly.

For example,

```graphql
name

email

phone
```

may appear in several different queries.

Instead of rewriting these fields every time, GraphQL allows you to group them into a **Fragment**.

A fragment is simply a reusable collection of fields.

---

# What are Fragments?

A fragment is a reusable selection of fields that can be included in one or more queries.

Instead of writing

```graphql
query {

    account {

        name

        industry

        phone

    }

}
```

You can define

```graphql
fragment AccountFields on Account {

    name

    industry

    phone

}
```

and reuse it anywhere.

---

# Why Fragments are Important

Without fragments

```graphql
query {

    account {

        name

        email

        phone

    }

}

query {

    customer {

        name

        email

        phone

    }

}
```

The same fields are repeated.

With fragments

```graphql
fragment BasicInfo on User {

    name

    email

    phone

}
```

You write them once and reuse them many times.

---

# Basic Syntax

General syntax

```graphql
fragment FragmentName on Type {

    field1

    field2

}
```

Usage

```graphql
query {

    account {

        ...FragmentName

    }

}
```

The three dots (`...`) tell GraphQL to include the fragment.

---

# How Fragments Work

```
Query

↓

Fragment Reference

↓

Fragment Definition

↓

Expand Fields

↓

Resolver

↓

Response
```

GraphQL replaces the fragment with its fields before executing the query.

---

# Named Fragments

Example

```graphql
fragment AccountInfo on Account {

    id

    name

    industry

    phone

}
```

Using the fragment

```graphql
query {

    account(id: "001") {

        ...AccountInfo

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
            "industry": "Technology",
            "phone": "1234567890"
        }
    }
}
```

---

# Reusing Fragments

One fragment can be used multiple times.

```graphql
fragment UserFields on User {

    id

    name

    email

}
```

Query

```graphql
query {

    employee {

        ...UserFields

    }

    manager {

        ...UserFields

    }

}
```

No duplicated field definitions.

---

# Nested Fragments

Fragments can include other fragments.

Example

```graphql
fragment ContactFields on Contact {

    email

    phone

}
```

```graphql
fragment UserFields on User {

    name

    ...ContactFields

}
```

Query

```graphql
query {

    user {

        ...UserFields

    }

}
```

---

# Inline Fragments

Inline fragments don't have a name.

Syntax

```graphql
... on Type {

    field

}
```

Example

```graphql
query {

    search(text: "John") {

        ... on User {

            name

            email

        }

    }

}
```

---

# Why Inline Fragments?

Sometimes GraphQL doesn't know the object's type until runtime.

Example

```
Search

↓

User

or

Company

or

Product
```

Inline fragments allow different fields for different object types.

---

# Fragments with Interfaces

Schema

```graphql
interface Person {

    id

    name

}
```

Query

```graphql
query {

    people {

        ... on Employee {

            salary

        }

        ... on Customer {

            loyaltyPoints

        }

    }

}
```

---

# Fragments with Union Types

Schema

```graphql
union SearchResult =

User

Company

Product
```

Query

```graphql
query {

    search(keyword: "Laptop") {

        ... on Product {

            name

            price

        }

        ... on Company {

            companyName

        }

    }

}
```

---

# Combining Fragments

Multiple fragments can be used together.

```graphql
fragment BasicInfo on User {

    id

    name

}
```

```graphql
fragment ContactInfo on User {

    email

    phone

}
```

Query

```graphql
query {

    user {

        ...BasicInfo

        ...ContactInfo

    }

}
```

---

# Fragments vs Aliases

Fragment

```
Purpose

↓

Reuse fields
```

Alias

```
Purpose

↓

Rename fields
```

Example

Fragment

```graphql
...UserFields
```

Alias

```graphql
employee: user
```

---

# Fragments vs Variables

Variables

```
Dynamic input values
```

Fragments

```
Reusable field selections
```

Variables control **what data is requested**.

Fragments control **how fields are organized**.

---

# Internal Execution

```
Client

↓

Query

↓

Fragment

↓

Expand Fields

↓

Validation

↓

Resolver

↓

Response
```

Fragments don't exist in the final execution.

GraphQL expands them into normal fields before calling resolvers.

---

# Common Errors

## Unknown Fragment

```graphql
query {

    account {

        ...AccountInfo

    }

}
```

If `AccountInfo` isn't defined

```
Unknown fragment "AccountInfo".
```

---

## Wrong Type

```graphql
fragment UserFields on User {

    name

}
```

Used on

```graphql
product {

    ...UserFields

}
```

GraphQL validation fails because `Product` isn't a `User`.

---

## Circular Fragment

Incorrect

```graphql
fragment A on User {

    ...B

}
```

```graphql
fragment B on User {

    ...A

}
```

This creates an infinite loop.

GraphQL doesn't allow circular fragment references.

---

# Best Practices

✔ Create reusable fragments

✔ Use descriptive fragment names

✔ Group related fields together

✔ Avoid very large fragments

✔ Reuse fragments across queries

✔ Use inline fragments only when necessary

✔ Keep fragments readable

---

# Real-World Salesforce Example

Suppose several pages display Account information.

Instead of repeating fields,

define a fragment.

```graphql
fragment AccountDetails on Account {

    id

    name

    industry

    phone

    website

}
```

Use it

```graphql
query {

    account(id: "001XXXXXXXXXXXX") {

        ...AccountDetails

    }

}
```

If another query also needs the same fields,

reuse the fragment.

---

# Practical Example

Suppose an HR application displays employees and managers.

```graphql
fragment PersonInfo on User {

    id

    name

    email

    phone

}
```

Query

```graphql
query {

    employees {

        ...PersonInfo

    }

    managers {

        ...PersonInfo

    }

}
```

One fragment serves multiple queries.

---

# Summary

Fragments help eliminate duplicate field selections.

Execution Flow

```
Query

↓

Fragment

↓

Expand Fields

↓

Validation

↓

Resolver

↓

Response
```

## Key Takeaways

- Fragments are reusable collections of fields.
- Named fragments can be used multiple times.
- Inline fragments work with interfaces and union types.
- Fragments improve readability and maintainability.
- Nested fragments allow modular query design.
- Fragments are expanded before query execution.
- Fragments reduce duplicate code.
- Fragments don't change the response structure.
- Variables provide dynamic values, while fragments organize fields.
- Fragments are commonly used in production GraphQL applications.
