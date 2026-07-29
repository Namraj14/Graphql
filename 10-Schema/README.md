# 10 - GraphQL Schema

# Table of Contents

1. Introduction
2. What is a Schema?
3. Why a Schema is Important
4. Schema Architecture
5. Schema Definition Language (SDL)
6. Types in GraphQL
7. Scalar Types
8. Object Types
9. Query Type
10. Mutation Type
11. Subscription Type
12. Input Types
13. Enum Types
14. Interface Types
15. Union Types
16. Custom Scalars
17. Lists and Non-Null Types
18. Relationships
19. Schema Validation
20. Schema Introspection
21. Schema Evolution
22. Best Practices
23. Real-World Salesforce Example
24. Summary

---

# Introduction

A GraphQL **Schema** is the foundation of every GraphQL API.

It defines:

- What data exists
- What operations clients can perform
- What fields each object contains
- Relationships between objects
- Input and output types

Without a schema, GraphQL cannot process queries.

Think of the schema as the **contract** between the client and the server.

---

# What is a Schema?

A schema is a blueprint that describes every object and operation available in a GraphQL API.

It tells GraphQL:

- Which queries are allowed
- Which mutations are allowed
- Which subscriptions are available
- What data types exist
- Which fields belong to each type

Example

```graphql
type Account {

    id: ID!

    name: String!

    industry: String

}
```

This schema says that an Account contains three fields.

---

# Why a Schema is Important

The schema ensures that both the client and server understand the same data structure.

Without a schema

```
Client

↓

Guess Field Names

↓

Possible Errors
```

With a schema

```
Client

↓

Read Schema

↓

Valid Query

↓

Correct Response
```

The schema eliminates ambiguity.

---

# Schema Architecture

```
                 GraphQL Schema

        ┌─────────────┬──────────────┬──────────────┐
        │             │              │
      Query        Mutation      Subscription
        │             │              │
        ▼             ▼              ▼
     Object Types  Object Types  Object Types
        │
        ▼
    Scalar Types
```

Everything in GraphQL starts from the schema.

---

# Schema Definition Language (SDL)

GraphQL schemas are written using **Schema Definition Language (SDL)**.

Example

```graphql
type User {

    id: ID!

    name: String!

    email: String!

}
```

SDL is human-readable and easy to understand.

---

# Types in GraphQL

GraphQL provides several kinds of types.

```
Schema

├── Scalar Types

├── Object Types

├── Input Types

├── Enum Types

├── Interface Types

├── Union Types

├── Query

├── Mutation

└── Subscription
```

---

# Scalar Types

Scalars represent single values.

Built-in scalar types

| Type | Example |
|------|----------|
| Int | 25 |
| Float | 95.5 |
| String | "John" |
| Boolean | true |
| ID | "001XYZ" |

Example

```graphql
type Product {

    id: ID!

    name: String!

    price: Float!

}
```

---

# Object Types

Objects represent entities.

Example

```graphql
type Account {

    id: ID!

    name: String!

    industry: String

    phone: String

}
```

Object types are the most common GraphQL types.

---

# Query Type

The Query type defines how data is retrieved.

Example

```graphql
type Query {

    account(id: ID!): Account

    accounts: [Account!]!

}
```

Query operations never modify data.

---

# Mutation Type

Mutation defines write operations.

Example

```graphql
type Mutation {

    createAccount(

        input: AccountInput!

    ): Account

}
```

Mutations create, update, or delete data.

---

# Subscription Type

Subscriptions provide real-time updates.

Example

```graphql
type Subscription {

    accountCreated: Account

}
```

Subscriptions are useful for:

- Chat applications
- Notifications
- Live dashboards
- Stock prices

---

# Input Types

Input types define data sent from clients.

Example

```graphql
input AccountInput {

    name: String!

    industry: String

    phone: String

}
```

Input types are only used as inputs.

---

# Enum Types

Enums limit values to predefined options.

Example

```graphql
enum Status {

    ACTIVE

    INACTIVE

    PENDING

}
```

Usage

```graphql
type User {

    status: Status

}
```

---

# Interface Types

Interfaces define common fields shared by multiple types.

Example

```graphql
interface Person {

    id: ID!

    name: String!

}
```

Implementation

```graphql
type Employee implements Person {

    id: ID!

    name: String!

    salary: Float!

}
```

---

# Union Types

A union allows one field to return different object types.

Example

```graphql
union SearchResult =

User

| Product

| Company
```

Query

```graphql
search {

    ... on User {

        name

    }

}
```

---

# Custom Scalars

Applications can define custom scalar types.

Example

```graphql
scalar Date

scalar DateTime

scalar Email

scalar URL
```

Usage

```graphql
type Event {

    date: Date

}
```

---

# Lists and Non-Null Types

### List

```graphql
[Account]
```

Meaning

```
A list of Accounts
```

---

### Non-Null

```graphql
String!
```

Meaning

```
Cannot be null
```

---

### Non-Null List

```graphql
[Account!]!
```

Meaning

- The list cannot be null.
- Every Account inside the list cannot be null.

---

# Relationships

GraphQL naturally models relationships.

Example

```graphql
type Account {

    name: String!

    owner: User

}
```

```graphql
type User {

    name: String!

}
```

Relationship

```
Account

↓

Owner

↓

User
```

---

# Schema Validation

Before executing a query,

GraphQL validates it against the schema.

Checks include

- Field exists
- Type matches
- Required arguments supplied
- Correct return type
- Valid enum values

Invalid queries never execute.

---

# Schema Introspection

GraphQL supports **Introspection**.

Clients can ask the server about its schema.

Example

```graphql
{
    __schema {

        types {

            name

        }

    }

}
```

This enables tools like:

- GraphiQL
- Apollo Studio
- GraphQL Playground

to provide autocomplete and documentation.

---

# Schema Evolution

GraphQL schemas evolve without breaking clients.

Instead of changing existing fields,

developers usually add new ones.

Example

Old

```graphql
type Account {

    name: String!

}
```

New

```graphql
type Account {

    name: String!

    website: String

}
```

Existing clients continue working.

---

# Internal Working

```
Client

↓

GraphQL Query

↓

Schema

↓

Validation

↓

Execution

↓

Resolvers

↓

Response
```

The schema is consulted before any resolver executes.

---

# Real-World Salesforce Example

```graphql
type Account {

    id: ID!

    name: String!

    industry: String

    phone: String

    owner: User

    contacts: [Contact!]!

}
```

```graphql
type Query {

    account(id: ID!): Account

}
```

Client Query

```graphql
query {

    account(id: "001XXXXXXXXXXXX") {

        name

        owner {

            name

        }

    }

}
```

The schema ensures that:

- `account` exists
- `owner` exists
- `name` exists
- Returned data matches the defined types

---

# Best Practices

✔ Design a clear schema before implementation

✔ Use meaningful type names

✔ Use input objects for mutations

✔ Use enums instead of strings when possible

✔ Keep relationships simple

✔ Prefer adding new fields over changing existing ones

✔ Mark required fields using `!`

✔ Document custom scalars

✔ Keep the schema backward compatible

---

# Summary

The schema defines the entire GraphQL API.

Execution Flow

```
Client

↓

Query

↓

Schema

↓

Validation

↓

Resolvers

↓

Response
```

## Key Takeaways

- The schema is the contract between client and server.
- GraphQL uses Schema Definition Language (SDL).
- The schema defines queries, mutations, and subscriptions.
- Object types represent entities.
- Scalar types store single values.
- Input types are used for client input.
- Enums restrict values to predefined options.
- Interfaces define shared fields.
- Union types allow multiple return types.
- The schema validates every GraphQL request before execution.
- Introspection allows clients to discover the schema.
- A well-designed schema is the foundation of every GraphQL API.
