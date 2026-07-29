# GraphQL Cheat Sheet

A quick reference for the most commonly used GraphQL concepts and syntax.

---

# GraphQL Operations

| Operation | Purpose |
|------------|----------|
| query | Read data |
| mutation | Create, update, or delete data |
| subscription | Receive real-time updates |

---

# Basic Query

```graphql
query {
  account(id: "001") {
    id
    name
    industry
  }
}
```

---

# Query with Variables

```graphql
query GetAccount($id: ID!) {
  account(id: $id) {
    id
    name
  }
}
```

Variables

```json
{
  "id": "001XXXXXXXXXXXX"
}
```

---

# Mutation

```graphql
mutation {
  createAccount(name: "OpenAI") {
    id
    name
  }
}
```

---

# Fragment

```graphql
fragment AccountFields on Account {
  id
  name
  industry
}

query {
  account(id: "001") {
    ...AccountFields
  }
}
```

---

# Alias

```graphql
query {
  primary: account(id: "001") {
    name
  }

  secondary: account(id: "002") {
    name
  }
}
```

---

# Arguments

```graphql
query {
  accounts(first: 10)
}
```

---

# Pagination

```graphql
query {
  accounts(first: 10, after: "cursor123") {
    edges {
      node {
        name
      }
    }

    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

# Filtering

```graphql
query {
  accounts(
    where: {
      industry: {
        eq: "Technology"
      }
    }
  ) {
    id
    name
  }
}
```

---

# Sorting

```graphql
query {
  accounts(
    orderBy: {
      name: ASC
    }
  ) {
    id
    name
  }
}
```

---

# Nested Query

```graphql
query {
  account(id: "001") {

    name

    owner {
      name
      email
    }

    contacts {
      firstName
      email
    }
  }
}
```

---

# Input Object

```graphql
mutation CreateAccount($input: AccountInput!) {

  createAccount(input: $input) {

    id
    name

  }

}
```

Variables

```json
{
  "input": {
    "name": "OpenAI"
  }
}
```

---

# Inline Fragment

```graphql
query {

  search(text: "Laptop") {

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

# Common Scalar Types

| Type | Example |
|------|----------|
| ID | "001" |
| String | "John" |
| Int | 100 |
| Float | 99.99 |
| Boolean | true |

---

# Common Pagination Arguments

| Argument | Purpose |
|-----------|----------|
| first | Number of records |
| after | Cursor after record |
| last | Previous records |
| before | Cursor before record |
| limit | Offset pagination |
| offset | Skip records |

---

# GraphQL Response

```json
{
  "data": {},
  "errors": []
}
```

---

# Common GraphQL Keywords

```
query

mutation

subscription

fragment

on

type

input

enum

union

interface

scalar
```

---

# GraphQL Execution Flow

```
Client

↓

Query

↓

Validation

↓

Resolver

↓

Database

↓

Response
```

---

# Best Practices

✔ Request only required fields

✔ Use variables

✔ Use fragments

✔ Use pagination

✔ Handle errors

✔ Keep queries small

✔ Cache when possible

✔ Validate inputs
