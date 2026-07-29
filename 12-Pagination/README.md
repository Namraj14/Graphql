# 12 - GraphQL Pagination

# Table of Contents

1. Introduction
2. What is Pagination?
3. Why Pagination is Important
4. Types of Pagination
5. Offset Pagination
6. Cursor Pagination
7. Relay Cursor Connections
8. Connection Pattern
9. Edges and Nodes
10. PageInfo
11. Forward Pagination
12. Backward Pagination
13. Pagination Arguments
14. Internal Execution
15. Performance Considerations
16. Common Errors
17. Best Practices
18. Real-World Salesforce Example
19. Summary

---

# Introduction

Imagine a database containing **1 million Accounts**.

If a GraphQL query returned all of them in one response, the result would be:

- Slow
- Memory intensive
- Large network traffic
- Poor user experience

Instead, GraphQL returns data in **small chunks**.

This process is called **Pagination**.

---

# What is Pagination?

Pagination means splitting large datasets into smaller pages.

Instead of

```
1,000,000 Records
```

You retrieve

```
Page 1 → 20 Records

Page 2 → 20 Records

Page 3 → 20 Records
```

Only the required data is transferred.

---

# Why Pagination is Important

Without Pagination

```
Database

↓

1 Million Records

↓

GraphQL

↓

Client
```

Problems

- Slow response
- High bandwidth
- High memory usage

With Pagination

```
Database

↓

20 Records

↓

GraphQL

↓

Client
```

Much faster and more efficient.

---

# Types of Pagination

GraphQL commonly supports two approaches.

```
Pagination

├── Offset Pagination

└── Cursor Pagination
```

Cursor Pagination is generally preferred for production systems.

---

# Offset Pagination

Offset pagination skips a number of records.

Example

```graphql
query {

    accounts(

        limit: 10

        offset: 20

    ) {

        id

        name

    }

}
```

Meaning

```
Skip first 20 records

Return next 10 records
```

---

# Advantages of Offset Pagination

✔ Easy to understand

✔ Easy to implement

✔ Works well for small datasets

---

# Disadvantages of Offset Pagination

Problems

- Slow on large datasets
- Records may shift after inserts/deletes
- Can produce duplicate or skipped records

Example

```
Record inserted

↓

Offset changes

↓

Wrong page returned
```

---

# Cursor Pagination

Cursor pagination remembers the last record instead of counting records.

Example

```graphql
query {

    accounts(

        first: 10

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

Instead of saying

```
Skip 100
```

It says

```
Continue after this record.
```

---

# Why Cursor Pagination?

Suppose new Accounts are inserted.

Offset

```
Page 2

↓

New Record Inserted

↓

Page shifts
```

Cursor

```
Page 2

↓

Cursor remains valid

↓

Correct next page
```

Cursor pagination is more reliable.

---

# Relay Cursor Connections

Many GraphQL APIs follow the **Relay Connection Specification**.

Structure

```
Connection

├── edges

├── node

└── pageInfo
```

This standard makes pagination consistent across APIs.

---

# Connection Pattern

Typical response

```graphql
accounts {

    edges {

        node {

            id

            name

        }

    }

    pageInfo {

        hasNextPage

    }

}
```

---

# Edges

Each edge contains

- Cursor
- Node

Example

```graphql
edges {

    cursor

    node {

        id

        name

    }

}
```

---

# Nodes

The node represents the actual object.

Example

```graphql
node {

    id

    name

    industry

}
```

---

# PageInfo

`pageInfo` tells the client whether more pages exist.

Example

```graphql
pageInfo {

    hasNextPage

    hasPreviousPage

    startCursor

    endCursor

}
```

Typical response

```json
{
    "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "abc123",
        "endCursor": "xyz789"
    }
}
```

---

# Forward Pagination

Retrieve the next records.

Arguments

```graphql
first

after
```

Example

```graphql
query {

    accounts(

        first: 20

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

# Backward Pagination

Retrieve previous records.

Arguments

```graphql
last

before
```

Example

```graphql
query {

    accounts(

        last: 20

        before: "cursor456"

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

# Pagination Arguments

Common pagination arguments

| Argument | Purpose |
|-----------|----------|
| first | Number of records after a cursor |
| after | Cursor to continue forward |
| last | Number of records before a cursor |
| before | Cursor to continue backward |
| limit | Maximum records (offset style) |
| offset | Number of records to skip |

---

# Internal Execution

```
Client

↓

GraphQL Query

↓

Pagination Arguments

↓

Resolver

↓

Database

↓

Limited Result

↓

Response
```

The resolver only retrieves the required records.

---

# Performance Considerations

Good

```
20 Records

↓

Fast Response
```

Bad

```
100,000 Records

↓

Slow Response
```

Always limit the number of returned records.

---

# Common Errors

## Requesting Too Many Records

```graphql
query {

    accounts(first: 100000) {

        id

    }

}
```

Many APIs reject excessively large page sizes.

---

## Invalid Cursor

```graphql
after: "invalidCursor"
```

The server returns an error because the cursor cannot be found or decoded.

---

## Missing Pagination

```graphql
query {

    accounts {

        id

    }

}
```

Returning all records is usually discouraged for large datasets.

---

# Best Practices

✔ Prefer cursor pagination

✔ Keep page sizes reasonable

✔ Use pageInfo to determine navigation

✔ Request only required fields

✔ Avoid large page sizes

✔ Handle invalid cursors gracefully

✔ Cache results when appropriate

✔ Follow the Relay Connection Specification if supported

---

# Real-World Salesforce Example

Query

```graphql
query GetAccounts(

    $first: Int!

    $after: String

) {

    accounts(

        first: $first

        after: $after

    ) {

        edges {

            cursor

            node {

                id

                name

                industry

            }

        }

        pageInfo {

            hasNextPage

            endCursor

        }

    }

}
```

Variables

```json
{
    "first": 10,
    "after": null
}
```

To retrieve the next page,

use the returned `endCursor`.

---

# Summary

Pagination efficiently retrieves large datasets in smaller pages.

Execution Flow

```
Client

↓

Pagination Query

↓

Resolver

↓

Database

↓

Limited Records

↓

Response
```

## Key Takeaways

- Pagination divides large datasets into smaller pages.
- Offset pagination uses `limit` and `offset`.
- Cursor pagination uses `first`, `after`, `last`, and `before`.
- Cursor pagination is more reliable for changing datasets.
- Relay uses the Connection pattern with `edges`, `node`, and `pageInfo`.
- `pageInfo` tells clients whether more pages exist.
- The resolver retrieves only the requested records.
- Large page sizes can negatively impact performance.
- Cursor pagination is the preferred approach for production GraphQL APIs.
