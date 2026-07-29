# Introduction to GraphQL

## Overview

GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. It was developed by Meta Platforms and released as an open-source project in 2015.

Unlike traditional REST APIs, where multiple endpoints may be required to fetch related data, GraphQL provides a single endpoint and lets clients define the structure of the response.

---

## Why GraphQL?

### Problems with REST APIs

REST APIs can lead to:

* **Over-fetching**: Receiving more data than needed.
* **Under-fetching**: Needing multiple requests to gather required data.
* **Multiple endpoints**: Different resources require different URLs.
* **Versioning challenges**: Managing API versions can become complex.

### Benefits of GraphQL

* Fetch only the required data.
* Single endpoint for all operations.
* Strongly typed schema.
* Faster development and better API documentation.
* Supports real-time data through subscriptions.
* Easier integration across web, mobile, and backend services.

---

## Core Concepts

### 1. Schema

A schema defines the structure of the API, including available data types and operations.

Example:

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}
```

---

### 2. Queries

Queries are used to retrieve data.

Example:

```graphql
query {
  user(id: "1") {
    name
    email
  }
}
```

Response:

```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 3. Mutations

Mutations are used to create, update, or delete data.

Example:

```graphql
mutation {
  createUser(
    name: "John Doe"
    email: "john@example.com"
  ) {
    id
    name
  }
}
```

---

### 4. Subscriptions

Subscriptions enable real-time communication between the server and clients.

Example:

```graphql
subscription {
  userCreated {
    id
    name
  }
}
```

---

## How GraphQL Works

1. Client sends a query to the GraphQL server.
2. The server validates the query against the schema.
3. Resolvers process the request and fetch data.
4. The server returns only the requested fields.

```text
Client
   │
   ▼
GraphQL Query
   │
   ▼
GraphQL Server
   │
   ▼
Resolvers
   │
   ▼
Database / Services
```

---

## GraphQL vs REST

| Feature           | GraphQL                  | REST                      |
| ----------------- | ------------------------ | ------------------------- |
| Endpoint          | Single                   | Multiple                  |
| Data Fetching     | Flexible                 | Fixed                     |
| Over-fetching     | No                       | Possible                  |
| Under-fetching    | No                       | Common                    |
| Versioning        | Easier                   | Often Required            |
| Real-time Support | Built-in (Subscriptions) | Requires Additional Tools |

---

## Example Query

Request:

```graphql
query {
  users {
    id
    name
  }
}
```

Response:

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Alice"
      },
      {
        "id": "2",
        "name": "Bob"
      }
    ]
  }
}
```

---

## Common Use Cases

* Web applications
* Mobile applications
* Microservices architectures
* Real-time applications
* API gateways
* Data aggregation services

---

## Popular GraphQL Tools

* Apollo Server
* Apollo Client
* GraphQL Yoga
* Relay
* GraphiQL
* Hasura

---

## Learning Outcomes

After completing this module, you should be able to:

* Understand what GraphQL is and why it was created.
* Explain the differences between GraphQL and REST.
* Write basic GraphQL queries and mutations.
* Understand schemas, resolvers, and subscriptions.
* Build a foundation for developing GraphQL APIs.

---

