# 11 - GraphQL Relationships

# Table of Contents

1. Introduction
2. What are Relationships?
3. Why Relationships Matter
4. Relationship Types
5. One-to-One Relationship
6. One-to-Many Relationship
7. Many-to-Many Relationship
8. Nested Relationships
9. Parent to Child Relationships
10. Child to Parent Relationships
11. Relationship Execution
12. Relationship Resolvers
13. Circular Relationships
14. Performance Considerations
15. N+1 Query Problem
16. Best Practices
17. Real-World Salesforce Example
18. Summary

---

# Introduction

One of GraphQL's biggest strengths is its ability to represent relationships between data naturally.

Instead of making multiple API calls like REST, GraphQL allows you to retrieve related objects in a single query.

Example

```
Account

↓

Owner

↓

Manager

↓

Department
```

Everything can be fetched in one request.

---

# What are Relationships?

A relationship connects one object with another.

Example

```
Account

↓

Owner

↓

User
```

In GraphQL, relationships are represented using object fields.

Example

```graphql
type Account {

    id: ID!

    name: String!

    owner: User

}
```

The `owner` field connects the Account object to the User object.

---

# Why Relationships Matter

Suppose you need

- Account Name
- Owner Name
- Owner Email

REST

```
GET /accounts/001

↓

GET /users/101
```

Two requests.

GraphQL

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

One request.

---

# Relationship Types

GraphQL supports all common database relationships.

```
Relationships

├── One-to-One

├── One-to-Many

├── Many-to-Many

└── Self Relationships
```

---

# One-to-One Relationship

Each Account has one Owner.

Schema

```graphql
type Account {

    name: String!

    owner: User

}
```

Query

```graphql
query {

    account(id: "001") {

        name

        owner {

            name

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
                "name": "John Doe"
            }
        }
    }
}
```

---

# One-to-Many Relationship

One Account has many Contacts.

Schema

```graphql
type Account {

    name: String!

    contacts: [Contact!]!

}
```

Query

```graphql
query {

    account(id: "001") {

        name

        contacts {

            firstName

            lastName

        }

    }

}
```

---

# Many-to-Many Relationship

Students enrolled in Courses.

Schema

```graphql
type Student {

    name: String!

    courses: [Course!]!

}
```

```graphql
type Course {

    name: String!

    students: [Student!]!

}
```

---

# Self Relationship

Sometimes an object references itself.

Example

Employee

↓

Manager

↓

Employee

Schema

```graphql
type Employee {

    id: ID!

    name: String!

    manager: Employee

}
```

---

# Nested Relationships

Relationships can continue through multiple levels.

```graphql
query {

    account(id: "001") {

        owner {

            manager {

                department {

                    name

                }

            }

        }

    }

}
```

Relationship Tree

```
Account

↓

Owner

↓

Manager

↓

Department
```

---

# Parent to Child Relationships

Example

```
Account

↓

Contacts
```

Schema

```graphql
type Account {

    contacts: [Contact!]!

}
```

Query

```graphql
query {

    account(id: "001") {

        contacts {

            firstName

            email

        }

    }

}
```

---

# Child to Parent Relationships

Example

```
Contact

↓

Account
```

Schema

```graphql
type Contact {

    account: Account

}
```

Query

```graphql
query {

    contact(id: "100") {

        firstName

        account {

            name

        }

    }

}
```

---

# Relationship Execution

Execution Flow

```
Account Resolver

↓

Owner Resolver

↓

Manager Resolver

↓

Department Resolver
```

Each relationship is resolved separately.

---

# Relationship Resolvers

Example

```javascript
const resolvers = {

    Account: {

        owner(parent) {

            return getUser(parent.ownerId);

        }

    }

}
```

The Account resolver returns the Account.

The Owner resolver returns the related User.

---

# Circular Relationships

Sometimes relationships point back to each other.

Example

```
Account

↓

Owner

↓

Accounts
```

GraphQL supports this because the client decides how deep to query.

Example

```graphql
query {

    account(id: "001") {

        owner {

            name

        }

    }

}
```

---

# Performance Considerations

Deep relationships may increase execution time.

Example

```
Account

↓

Owner

↓

Manager

↓

Department

↓

Location

↓

Country
```

Only request the relationships you actually need.

---

# The N+1 Query Problem

Without optimization

```
1 Account Query

↓

100 Contacts

↓

100 User Queries

↓

101 Database Queries
```

This is known as the **N+1 Query Problem**.

---

# Solving N+1 with DataLoader

Many GraphQL servers use **DataLoader**.

Instead of

```
100 Database Queries
```

It performs

```
1 Batch Query
```

Execution

```
Resolvers

↓

DataLoader

↓

Database

↓

Results

↓

Resolvers
```

This greatly improves performance.

---

# Internal Execution

```
Client

↓

Query

↓

Account Resolver

↓

Owner Resolver

↓

Contact Resolver

↓

Database

↓

JSON Response
```

Each object relationship is resolved independently.

---

# Real-World Salesforce Example

Schema

```graphql
type Account {

    id: ID!

    name: String!

    owner: User

    contacts: [Contact!]!

    opportunities: [Opportunity!]!

}
```

Query

```graphql
query GetAccount($id: ID!) {

    account(id: $id) {

        name

        owner {

            name

            email

        }

        contacts {

            firstName

            email

        }

        opportunities {

            name

            amount

            stage

        }

    }

}
```

Variables

```json
{
    "id":"001XXXXXXXXXXXX"
}
```

Everything is returned in a single request.

---

# Best Practices

✔ Keep nesting reasonable

✔ Request only required relationships

✔ Use pagination for large child collections

✔ Avoid deeply recursive queries

✔ Use DataLoader to prevent N+1 problems

✔ Batch database queries whenever possible

✔ Design relationships carefully

✔ Keep schemas intuitive

---

# Summary

Relationships allow GraphQL to navigate connected data efficiently.

Execution Flow

```
Client

↓

Relationship Query

↓

Resolvers

↓

Related Objects

↓

JSON Response
```

## Key Takeaways

- Relationships connect GraphQL object types.
- GraphQL naturally supports one-to-one, one-to-many, many-to-many, and self relationships.
- Nested relationships allow fetching connected data in one request.
- Parent-child and child-parent traversal are both supported.
- Every relationship is resolved by its own resolver.
- Deep relationships should be used carefully for performance.
- DataLoader helps solve the N+1 query problem.
- GraphQL relationships closely mirror real-world database relationships.
