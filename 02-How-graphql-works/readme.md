# 02 - How GraphQL Works

# Table of Contents

1. Introduction
2. Traditional REST Flow
3. GraphQL Flow
4. GraphQL Architecture
5. Request Lifecycle
6. Components of GraphQL
7. Client and Server Communication
8. How GraphQL Executes a Query
9. Parsing and Validation
10. Resolver Execution
11. Data Fetching
12. Response Generation
13. GraphQL Request Types
14. Variables
15. Aliases
16. Fragments
17. Directives
18. Execution Order
19. Error Handling
20. Network Flow
21. Complete Example
22. Internal Working
23. Summary

---

# Introduction

GraphQL is not just a query language.

It is a complete runtime that defines **how clients request data** and **how servers return exactly that data**.

Whenever a client sends a GraphQL request, several internal steps happen before the response is returned.

Understanding this lifecycle is one of the most important GraphQL concepts.

---

# Traditional REST Flow

Suppose an application needs:

- User Name
- Email
- Company Name

The application performs multiple API calls.

```
Client
   │
   ▼
GET /users/10
   │
   ▼
User Data

Client
   │
   ▼
GET /companies/5
   │
   ▼
Company Data
```

Multiple endpoints.

Multiple requests.

More network traffic.

---

# GraphQL Flow

GraphQL combines everything into one request.

```
Client
   │
   ▼
POST /graphql

query{
    user(id:10){
        name
        email
        company{
            name
        }
    }
}
```

Server responds

```
{
  "data":{
      "user":{
          "name":"John",
          "email":"john@test.com",
          "company":{
              "name":"OpenAI"
          }
      }
  }
}
```

Only one request.

Only requested fields.

---

# High-Level Architecture

```
          Client

             │

             ▼

      GraphQL Query

             │

             ▼

      GraphQL Server

             │

      Parse Request

             │

      Validate Query

             │

      Execute Resolvers

             │

      Database / APIs

             │

      Build Response

             │

             ▼

           Client
```

---

# GraphQL Request Lifecycle

A GraphQL request goes through several stages.

```
Client

↓

Send Query

↓

Parse Query

↓

Validate Query

↓

Execute Resolvers

↓

Fetch Data

↓

Combine Results

↓

Return JSON
```

Every GraphQL request follows this same lifecycle.

---

# Step 1 - Client Sends Query

Example

```graphql
query{
  account(id:"100"){
      name
      industry
  }
}
```

Normally this is sent as an HTTP POST request.

```
POST /graphql
```

Body

```json
{
  "query":"query{account(id:\"100\"){name industry}}"
}
```

---

# Step 2 - GraphQL Parses the Query

The GraphQL engine reads the query.

It checks:

- Syntax
- Structure
- Brackets
- Parentheses
- Keywords

Example

Correct

```graphql
query{
   account{
      name
   }
}
```

Incorrect

```graphql
query{
account{
name
```

Missing braces.

Parsing fails immediately.

---

# Step 3 - Validation

After parsing succeeds, GraphQL validates the query.

Checks include:

- Does the field exist?
- Does the object exist?
- Is the argument valid?
- Is the return type correct?
- Is the query allowed?

Example

Schema

```graphql
type Account{
    name:String
}
```

Query

```graphql
query{
    account{
        revenue
    }
}
```

Validation Error

```
Cannot query field "revenue".
```

Execution never starts.

---

# Step 4 - Resolver Execution

Every field has a resolver.

Resolver = Function that fetches data.

Example

```
Query

↓

account()

↓

Resolver

↓

Database

↓

Result
```

Resolver Example

```javascript
const resolvers = {

  Query:{

      account(parent,args){

          return database.findAccount(args.id);

      }

  }

}
```

Resolvers are the heart of GraphQL.

---

# Step 5 - Fetch Data

Resolvers may fetch data from:

- SQL Database
- MongoDB
- Salesforce
- REST API
- Another GraphQL API
- CSV
- Files
- External Services

Example

```
GraphQL

↓

Resolver

↓

Salesforce

↓

Account Record
```

Or

```
GraphQL

↓

Resolver

↓

REST API

↓

JSON

↓

Client
```

GraphQL does not care where the data comes from.

---

# Step 6 - Build Response

Once all resolvers complete,

GraphQL combines everything.

Example

Requested

```graphql
query{

 account{

    name

    industry

 }

}
```

Returned

```json
{
   "data":{
      "account":{
          "name":"OpenAI",
          "industry":"Technology"
      }
   }
}
```

Only requested fields appear.

---

# Components of GraphQL

```
Client

↓

Query

↓

Schema

↓

Resolver

↓

Database

↓

JSON Response
```

Every GraphQL application contains these components.

---

# GraphQL Client

The client can be

- Web Application
- Mobile App
- Salesforce LWC
- React
- Angular
- Vue
- Postman
- Apollo Client

Its job is only to request data.

---

# GraphQL Server

The server

- Receives request
- Validates query
- Executes resolvers
- Builds response

Popular servers

- Apollo Server
- Express GraphQL
- Salesforce GraphQL API
- Hasura

---

# Schema

The schema defines

- Objects
- Fields
- Relationships
- Queries
- Mutations
- Subscriptions

Think of it as the contract between client and server.

---

# Resolver

Resolver is simply a function.

Example

```
Query

↓

Resolver

↓

Database
```

Each requested field eventually reaches a resolver.

---

# Database

Could be

```
MySQL

MongoDB

Salesforce

Oracle

REST API

Microservices

Firebase

Redis
```

GraphQL works with all of them.

---

# Client and Server Communication

```
Client

↓

POST /graphql

↓

Server

↓

Response

↓

Client
```

Unlike REST,

there is usually only one endpoint.

```
/graphql
```

---

# Execution Order

Example

```graphql
query{

 account{

    name

    owner{

        email

    }

 }

}
```

Execution

```
account Resolver

↓

owner Resolver

↓

email Resolver
```

Execution happens field by field.

---

# Nested Resolver Execution

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
```

Each level calls another resolver.

---

# Variables

Instead of hardcoding values

```graphql
query{

 account(id:"100"){

    name

 }

}
```

Use variables

```graphql
query GetAccount($id:ID!){

 account(id:$id){

    name

 }

}
```

Variables

```json
{
  "id":"100"
}
```

Advantages

- Reusable
- Cleaner
- More secure

---

# Aliases

Without aliases

```graphql
{
 account(id:"1"){
    name
 }

 account(id:"2"){
    name
 }
}
```

Invalid.

With aliases

```graphql
{
 first:account(id:"1"){
     name
 }

 second:account(id:"2"){
      name
 }
}
```

Response

```json
{
  "data":{
      "first":{
          "name":"Google"
      },
      "second":{
          "name":"Microsoft"
      }
  }
}
```

---

# Fragments

Fragments avoid repeating fields.

Without Fragment

```graphql
user{
 name
 email
}

manager{
 name
 email
}
```

With Fragment

```graphql
fragment UserInfo on User{

 name

 email

}
```

Usage

```graphql
user{

 ...UserInfo

}

manager{

 ...UserInfo

}
```

---

# Directives

GraphQL has directives.

Common ones

```
@include

@skip

@deprecated
```

Example

```graphql
query{

 account{

   name

   phone @include(if:true)

 }

}
```

---

# Error Handling

If one field fails,

GraphQL can still return remaining data.

Example

```json
{
   "data":{
      "account":{
          "name":"Google",
          "industry":null
      }
   },
   "errors":[
      {
         "message":"Industry not found"
      }
   ]
}
```

Partial responses are possible.

---

# Network Flow

```
Client

↓

HTTP POST

↓

/graphql

↓

GraphQL Server

↓

Resolver

↓

Database

↓

JSON Response

↓

Client
```

---

# Complete Example

Query

```graphql
query{

 account(id:"100"){

    name

    industry

    owner{

        name

        email

    }

 }

}
```

Execution

```
Receive Query

↓

Parse

↓

Validate

↓

Run Account Resolver

↓

Fetch Account

↓

Run Owner Resolver

↓

Fetch Owner

↓

Build JSON

↓

Return Response
```

Response

```json
{
  "data":{
      "account":{
          "name":"OpenAI",
          "industry":"Technology",
          "owner":{
              "name":"John",
              "email":"john@test.com"
          }
      }
  }
}
```

---

# Internal Working

```
Client

↓

GraphQL Query

↓

Parser

↓

AST (Abstract Syntax Tree)

↓

Validator

↓

Execution Engine

↓

Resolvers

↓

Database/API

↓

Execution Result

↓

JSON Serializer

↓

HTTP Response
```

The **AST (Abstract Syntax Tree)** is an internal representation of the query. Instead of executing raw text, GraphQL converts the query into this structured tree, validates it against the schema, and then walks through the tree to execute each field.

---

# Request Lifecycle (Detailed)

```
1. Client writes a query.

↓

2. Query is sent to /graphql.

↓

3. Server parses the query.

↓

4. AST is created.

↓

5. Query is validated against the schema.

↓

6. Execution engine starts.

↓

7. Root resolver executes.

↓

8. Child resolvers execute.

↓

9. Data is fetched from one or more sources.

↓

10. Results are combined.

↓

11. Errors (if any) are attached.

↓

12. JSON response is returned.
```

---

# Why GraphQL is Efficient

Compared to REST:

- Single endpoint instead of many endpoints.
- Clients request only the fields they need.
- Reduces over-fetching and under-fetching.
- Supports nested data in one request.
- Strongly typed schema catches many errors before execution.
- Partial responses are possible even when some fields fail.
- Works with multiple data sources through resolvers.

---

# Summary

GraphQL works by following a predictable execution pipeline:

```
Client

↓

Query

↓

Parser

↓

AST

↓

Validator

↓

Execution Engine

↓

Resolvers

↓

Database / APIs

↓

JSON Response

↓

Client
```

## Key Takeaways

- Every request is typically sent to a single `/graphql` endpoint.
- The query is first **parsed** to check syntax.
- The parsed query becomes an **Abstract Syntax Tree (AST)**.
- The AST is **validated** against the GraphQL schema.
- The execution engine invokes **resolvers** for each requested field.
- Resolvers can fetch data from databases, REST APIs, Salesforce, or any external service.
- GraphQL assembles the requested fields into a single JSON response.
- Errors are returned alongside data, allowing partial success.
- Features like variables, aliases, fragments, and directives make queries reusable and efficient.
- The client always receives data in the exact shape it requested.
