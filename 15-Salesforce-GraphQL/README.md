# 15 - Salesforce GraphQL

# Table of Contents

1. Introduction
2. What is Salesforce GraphQL?
3. Why Salesforce Introduced GraphQL
4. REST API vs GraphQL API
5. Prerequisites
6. Salesforce GraphQL Architecture
7. The UI API
8. GraphQL Endpoint
9. Authentication
10. GraphQL Schema in Salesforce
11. Object Queries
12. Filtering Records
13. Sorting Records
14. Pagination
15. Querying Relationships
16. Aggregate Queries
17. Error Handling
18. Limitations
19. Best Practices
20. Real-World Examples
21. Summary

---

# Introduction

Salesforce provides a **GraphQL API** that allows developers to retrieve Salesforce data using GraphQL queries instead of traditional REST endpoints.

Instead of calling multiple REST APIs,

```
GET /Account

GET /Contact

GET /Opportunity
```

you can retrieve everything in **one GraphQL request**.

The Salesforce GraphQL API is built on top of the **UI API**, meaning it automatically respects:

- Object permissions
- Field-Level Security (FLS)
- Sharing Rules
- Record-Level Access

---

# What is Salesforce GraphQL?

Salesforce GraphQL is a single endpoint that exposes Salesforce data through a GraphQL schema.

Instead of calling multiple REST endpoints, clients send one GraphQL query.

```
Client

↓

Single GraphQL Endpoint

↓

Salesforce GraphQL

↓

UI API

↓

Salesforce Database
```

---

# Why Salesforce Introduced GraphQL

REST APIs often require multiple requests.

Example

```
Account

↓

Owner

↓

Contacts

↓

Opportunities
```

REST

```
4 Requests
```

GraphQL

```
1 Request
```

Benefits

- Smaller responses
- Faster applications
- Less network traffic
- Flexible field selection
- Better mobile performance

---

# REST API vs GraphQL API

| REST API | GraphQL API |
|-----------|-------------|
| Multiple endpoints | Single endpoint |
| Fixed response | Client chooses fields |
| Over-fetching | Minimal data |
| Under-fetching | Nested queries |
| Multiple requests | One request |

---

# Prerequisites

Before using Salesforce GraphQL you should understand

- Salesforce Objects
- SOQL
- Record Relationships
- OAuth Authentication
- REST API basics
- GraphQL fundamentals

---

# Salesforce GraphQL Architecture

```
Client

↓

GraphQL Query

↓

Salesforce GraphQL API

↓

UI API

↓

Security Checks

↓

Database

↓

JSON Response
```

---

# The UI API

Salesforce GraphQL is built on the **UI API**.

Because of this it automatically enforces

- CRUD permissions
- Field-Level Security
- Sharing Rules
- Record Access

No additional security checks are required in your GraphQL query.

---

# GraphQL Endpoint

Salesforce exposes a single endpoint.

```
/services/data/vXX.X/graphql
```

Example

```
/services/data/v64.0/graphql
```

Every GraphQL request is sent to this endpoint.

---

# Authentication

Salesforce GraphQL uses the same authentication mechanism as the REST API.

Common methods

- OAuth 2.0
- Connected Apps
- JWT OAuth Flow
- Web Server Flow

Example HTTP Headers

```http
POST /services/data/v64.0/graphql

Authorization: Bearer ACCESS_TOKEN

Content-Type: application/json
```

---

# GraphQL Schema in Salesforce

Salesforce automatically generates a GraphQL schema based on your org.

Objects become GraphQL types.

Example

```
Account

↓

Account Type
```

```
Contact

↓

Contact Type
```

Custom Objects are also included.

```
Invoice__c

↓

Invoice__c Type
```

---

# Object Queries

Salesforce queries begin with the **uiapi** root.

Example

```graphql
query {

    uiapi {

        query {

            Account {

                edges {

                    node {

                        Id

                        Name {

                            value

                        }

                    }

                }

            }

        }

    }

}
```

---

# Filtering Records

Example

```graphql
Account(

    where:{

        Industry:{

            eq:"Technology"

        }

    }

)
```

Common Operators

| Operator | Meaning |
|----------|----------|
| eq | Equal |
| ne | Not Equal |
| gt | Greater Than |
| lt | Less Than |
| like | Similar To |
| in | Exists in List |

---

# Sorting Records

Example

```graphql
Account(

    orderBy:{

        Name:{

            order:ASC

        }

    }

)
```

---

# Pagination

Salesforce GraphQL uses cursor-based pagination.

Example

```graphql
Account(

    first:10

)
```

Response

```graphql
pageInfo{

    hasNextPage

    endCursor

}
```

Use the returned cursor to fetch the next page.

---

# Querying Relationships

Example

```graphql
query {

    uiapi {

        query {

            Contact {

                edges {

                    node {

                        FirstName{

                            value

                        }

                        Account{

                            Name{

                                value

                            }

                        }

                    }

                }

            }

        }

    }

}
```

Parent-child relationships can also be queried where supported.

---

# Aggregate Queries

Salesforce GraphQL supports aggregate operations.

Example

```
Count Accounts

Average Revenue

Maximum Amount

Minimum Amount
```

These reduce the amount of client-side processing.

---

# Error Handling

GraphQL responses may contain

```json
{
    "data": {},
    "errors": []
}
```

Common Salesforce GraphQL errors

- Invalid Object
- Invalid Field
- Missing Permissions
- Authentication Failure
- Invalid Filter
- Invalid Cursor

---

# Limitations

Current Salesforce GraphQL limitations include

- Mainly focused on UI API supported objects
- Some objects are unsupported
- Some complex SOQL features are unavailable
- Metadata queries are limited
- Apex methods cannot be called directly

Always check the latest Salesforce documentation for supported features.

---

# Best Practices

✔ Request only required fields

✔ Use pagination

✔ Filter records whenever possible

✔ Avoid deeply nested queries

✔ Use variables

✔ Respect governor limits

✔ Cache frequently requested data

✔ Reuse fragments

✔ Test queries in GraphQL Explorer

---

# Real-World Example

Retrieve Accounts with Owner information.

```graphql
query GetAccounts($first:Int!){

    uiapi{

        query{

            Account(first:$first){

                edges{

                    node{

                        Id

                        Name{

                            value

                        }

                        Industry{

                            value

                        }

                        Owner{

                            Name{

                                value

                            }

                        }

                    }

                }

            }

        }

    }

}
```

Variables

```json
{
    "first":10
}
```

---

# Summary

Salesforce GraphQL provides a modern way to access Salesforce data through a single endpoint while automatically enforcing Salesforce security.

Execution Flow

```
Client

↓

GraphQL Query

↓

Salesforce GraphQL API

↓

UI API

↓

Security

↓

Database

↓

JSON Response
```

## Key Takeaways

- Salesforce GraphQL uses a single endpoint.
- It is built on top of the UI API.
- It automatically respects CRUD, FLS, and Sharing Rules.
- Objects become GraphQL types.
- Supports filtering, sorting, relationships, and pagination.
- Cursor-based pagination is used.
- Authentication is identical to the Salesforce REST API.
- Queries are strongly typed and validated.
- Request only the fields you need for better performance.
