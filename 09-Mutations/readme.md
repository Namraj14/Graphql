# 09 - GraphQL Mutations

# Table of Contents

1. Introduction
2. What is a Mutation?
3. Queries vs Mutations
4. Why Mutations are Needed
5. Mutation Syntax
6. How Mutations Work
7. Creating Data
8. Updating Data
9. Deleting Data
10. Mutation Arguments
11. Variables in Mutations
12. Input Objects
13. Returning Data
14. Multiple Mutations
15. Mutation Execution Order
16. Error Handling
17. Best Practices
18. Real-World Salesforce Examples
19. Summary

---

# Introduction

Until now, we've learned how GraphQL retrieves data using **Queries**.

But applications also need to **create**, **update**, and **delete** data.

These operations are performed using **Mutations**.

A mutation changes the data stored on the server.

---

# What is a Mutation?

A mutation is a GraphQL operation used to modify data.

Mutations can:

- Create records
- Update records
- Delete records

Example

```graphql
mutation {

    createAccount(

        name: "OpenAI"

    ) {

        id

        name

    }

}
```

Unlike queries, mutations change the application's state.

---

# Queries vs Mutations

| Query | Mutation |
|--------|----------|
| Read data | Modify data |
| No data changes | Creates, updates, or deletes |
| Safe to repeat | May produce different results |
| Similar to HTTP GET | Similar to POST, PUT, PATCH, DELETE |

---

# Why Mutations are Needed

Imagine a CRM application.

Users need to:

- Create an Account
- Update an Opportunity
- Delete a Contact
- Change an Order Status

Queries cannot perform these actions.

Mutations are designed for them.

---

# Basic Mutation Syntax

General syntax

```graphql
mutation {

    operation(arguments) {

        returnedFields

    }

}
```

Example

```graphql
mutation {

    createUser(

        name: "John"

    ) {

        id

        name

    }

}
```

---

# How Mutations Work

```
Client

↓

Mutation

↓

Validation

↓

Resolver

↓

Database

↓

Response
```

Unlike queries,

the server changes the stored data before sending the response.

---

# Creating Data

Example

```graphql
mutation {

    createAccount(

        name: "OpenAI"

        industry: "Technology"

    ) {

        id

        name

        industry

    }

}
```

Possible response

```json
{
    "data": {
        "createAccount": {
            "id": "001",
            "name": "OpenAI",
            "industry": "Technology"
        }
    }
}
```

---

# Updating Data

Example

```graphql
mutation {

    updateAccount(

        id: "001"

        phone: "1234567890"

    ) {

        id

        name

        phone

    }

}
```

Only the specified fields are updated.

---

# Deleting Data

Example

```graphql
mutation {

    deleteAccount(

        id: "001"

    ) {

        success

        message

    }

}
```

Possible response

```json
{
    "data": {
        "deleteAccount": {
            "success": true,
            "message": "Account deleted successfully."
        }
    }
}
```

---

# Mutation Arguments

Mutations receive input using arguments.

Example

```graphql
mutation {

    createProduct(

        name: "Laptop"

        price: 999.99

    ) {

        id

        name

    }

}
```

Arguments work exactly like query arguments.

---

# Variables in Mutations

Instead of hardcoding values,

use variables.

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
    "name": "OpenAI",
    "industry": "Technology"
}
```

Using variables is recommended for production applications.

---

# Input Objects

Mutations often accept an input object.

Schema

```graphql
input AccountInput {

    name: String!

    industry: String

    phone: String

}
```

Mutation

```graphql
mutation CreateAccount(

    $input: AccountInput!

) {

    createAccount(

        input: $input

    ) {

        id

        name

    }

}
```

Variables

```json
{
    "input": {
        "name": "OpenAI",
        "industry": "Technology",
        "phone": "1234567890"
    }
}
```

Input objects keep mutations organized.

---

# Returning Data

A mutation returns exactly the fields requested.

Mutation

```graphql
mutation {

    createUser(

        name: "John"

    ) {

        id

    }

}
```

Response

```json
{
    "data": {
        "createUser": {
            "id": "101"
        }
    }
}
```

If more fields are requested,

more data is returned.

---

# Multiple Mutations

GraphQL allows multiple mutations in one request.

```graphql
mutation {

    createUser(

        name: "John"

    ) {

        id

    }

    createDepartment(

        name: "Engineering"

    ) {

        id

    }

}
```

Unlike queries,

mutations execute sequentially.

---

# Mutation Execution Order

Queries may execute fields in parallel.

Mutations execute one after another.

```
Mutation 1

↓

Database Updated

↓

Mutation 2

↓

Database Updated

↓

Response
```

This ensures consistent data.

---

# Error Handling

If a mutation fails,

GraphQL returns an error.

Example

```json
{
    "errors": [
        {
            "message": "Account already exists."
        }
    ]
}
```

Some successful mutations may still return partial data alongside errors.

---

# Internal Execution

```
Client

↓

Mutation

↓

Parser

↓

Validation

↓

Resolver

↓

Business Logic

↓

Database

↓

Response
```

Resolvers contain the logic for creating, updating, or deleting records.

---

# Real-World Salesforce Example

Create an Account

```graphql
mutation CreateAccount(

    $input: AccountInput!

) {

    createAccount(

        input: $input

    ) {

        id

        name

        industry

    }

}
```

Variables

```json
{
    "input": {
        "name": "Acme Corporation",
        "industry": "Manufacturing"
    }
}
```

Update the same Account

```graphql
mutation UpdateAccount(

    $id: ID!

    $phone: String!

) {

    updateAccount(

        id: $id

        phone: $phone

    ) {

        id

        phone

    }

}
```

Delete an Account

```graphql
mutation DeleteAccount(

    $id: ID!

) {

    deleteAccount(

        id: $id

    ) {

        success

    }

}
```

---

# Best Practices

✔ Use variables instead of hardcoded values

✔ Prefer input objects for complex mutations

✔ Return only required fields

✔ Validate user input

✔ Handle mutation errors gracefully

✔ Keep mutations focused on one task

✔ Use meaningful mutation names

✔ Avoid returning unnecessary data

---

# Summary

Mutations are used to modify data in GraphQL.

Execution Flow

```
Client

↓

Mutation

↓

Validation

↓

Resolver

↓

Business Logic

↓

Database

↓

Response
```

## Key Takeaways

- Mutations create, update, and delete data.
- Mutations change server-side state.
- They use the `mutation` keyword.
- Arguments and variables work the same way as in queries.
- Input objects simplify complex inputs.
- Mutations return only the requested fields.
- Multiple mutations execute sequentially.
- Resolvers contain the business logic.
- Variables are the recommended way to provide input.
- Mutations are equivalent to write operations in traditional APIs.
