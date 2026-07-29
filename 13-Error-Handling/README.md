# 13 - GraphQL Error Handling

# Table of Contents

1. Introduction
2. What is Error Handling?
3. Why Error Handling is Important
4. GraphQL Error Response Structure
5. Types of GraphQL Errors
6. Syntax Errors
7. Validation Errors
8. Execution Errors
9. Resolver Errors
10. Authentication Errors
11. Authorization Errors
12. Business Logic Errors
13. Partial Success Responses
14. Error Path
15. Error Locations
16. Error Extensions
17. Custom Errors
18. Error Handling Best Practices
19. Real-World Salesforce Example
20. Summary

---

# Introduction

Errors are a normal part of every application.

A GraphQL server may receive:

- Invalid queries
- Missing fields
- Incorrect arguments
- Unauthorized requests
- Database failures
- Business rule violations

Instead of crashing, GraphQL returns structured error information.

---

# What is Error Handling?

Error handling is the process of identifying, reporting, and responding to problems during GraphQL query execution.

GraphQL provides a standard format for returning errors.

Unlike REST, GraphQL often returns:

- Partial data
- Error details

in the same response.

---

# Why Error Handling is Important

Imagine a query requesting an Account and its Contacts.

```
Account

↓

Contacts
```

If the Contacts resolver fails,

GraphQL can still return the Account while reporting the Contacts error.

Without GraphQL

```
Entire request fails
```

With GraphQL

```
Successful Data

+

Error Information
```

This provides a better user experience.

---

# GraphQL Error Response Structure

A typical GraphQL response contains:

```json
{
    "data": {},
    "errors": []
}
```

Example

```json
{
    "data": {
        "account": null
    },
    "errors": [
        {
            "message": "Account not found."
        }
    ]
}
```

The response may include:

- data
- errors
- extensions (optional)

---

# Types of GraphQL Errors

Common GraphQL errors

```
GraphQL Errors

├── Syntax Errors

├── Validation Errors

├── Execution Errors

├── Resolver Errors

├── Authentication Errors

├── Authorization Errors

└── Business Logic Errors
```

---

# Syntax Errors

Syntax errors occur before query execution.

Example

Incorrect

```graphql
query {

    account(

        id:"001"

    {

        name

    }

}
```

Missing closing parenthesis.

Response

```json
{
    "errors":[
        {
            "message":"Syntax Error"
        }
    ]
}
```

The query never executes.

---

# Validation Errors

Validation happens after parsing.

GraphQL checks:

- Field exists
- Type exists
- Required arguments
- Correct return type

Example

```graphql
query {

    account {

        invalidField

    }

}
```

Response

```json
{
    "errors":[
        {
            "message":"Cannot query field 'invalidField'."
        }
    ]
}
```

---

# Execution Errors

Execution errors occur while resolvers are running.

Example

```
Database unavailable

↓

Resolver fails

↓

Execution Error
```

Response

```json
{
    "errors":[
        {
            "message":"Database connection failed."
        }
    ]
}
```

---

# Resolver Errors

Resolvers contain business logic.

Example

```javascript
function accountResolver(id){

    throw new Error("Account not found.");

}
```

Response

```json
{
    "errors":[
        {
            "message":"Account not found."
        }
    ]
}
```

---

# Authentication Errors

Authentication verifies user identity.

Example

```
No Token

↓

Authentication Failed
```

Response

```json
{
    "errors":[
        {
            "message":"Authentication required."
        }
    ]
}
```

Common causes

- Missing JWT
- Expired Token
- Invalid API Key

---

# Authorization Errors

Authorization determines what a user is allowed to access.

Example

```
User Logged In

↓

Attempts Admin Action

↓

Permission Denied
```

Response

```json
{
    "errors":[
        {
            "message":"Access denied."
        }
    ]
}
```

---

# Business Logic Errors

Business rules may reject valid GraphQL requests.

Example

```
Order Quantity

↓

-5

↓

Invalid Business Rule
```

Response

```json
{
    "errors":[
        {
            "message":"Quantity must be greater than zero."
        }
    ]
}
```

---

# Partial Success Responses

One of GraphQL's biggest advantages.

Example Query

```graphql
query {

    account(id:"001") {

        name

        contacts {

            email

        }

    }

}
```

Suppose

- Account loads successfully
- Contacts fail

Response

```json
{
    "data":{

        "account":{

            "name":"OpenAI",

            "contacts":null

        }

    },

    "errors":[

        {

            "message":"Unable to load contacts."

        }

    ]

}
```

Notice that useful data is still returned.

---

# Error Path

The path identifies where the error occurred.

Example

```json
{
    "errors":[
        {
            "path":[
                "account",
                "contacts"
            ]
        }
    ]
}
```

Meaning

```
Account

↓

Contacts

↓

Error
```

---

# Error Locations

Locations show where the error exists in the GraphQL query.

Example

```json
{
    "errors":[
        {
            "locations":[
                {
                    "line":7,
                    "column":15
                }
            ]
        }
    ]
}
```

This helps developers debug queries quickly.

---

# Error Extensions

The `extensions` object provides additional metadata.

Example

```json
{
    "errors":[
        {
            "message":"Access denied",

            "extensions":{

                "code":"FORBIDDEN"

            }

        }
    ]
}
```

Common extension values

- code
- timestamp
- requestId
- errorType

---

# Custom Errors

Applications often create custom error codes.

Example

```json
{
    "errors":[
        {
            "message":"Order already shipped.",

            "extensions":{

                "code":"ORDER_LOCKED"

            }

        }
    ]
}
```

Custom errors make client-side handling easier.

---

# Internal Error Handling Flow

```
Client

↓

GraphQL Query

↓

Parser

↓

Validation

↓

Resolver

↓

Database

↓

Success or Error

↓

GraphQL Response
```

Errors can occur at any stage.

---

# Real-World Salesforce Example

Query

```graphql
query {

    account(id:"001XXXXXXXXXXXX") {

        id

        name

        owner {

            email

        }

    }

}
```

Suppose

- Account exists
- User lacks permission to view Owner

Response

```json
{
    "data":{

        "account":{

            "id":"001XXXXXXXXXXXX",

            "name":"Acme Corporation",

            "owner":null

        }

    },

    "errors":[

        {

            "message":"Insufficient access to Owner.",

            "path":[

                "account",

                "owner"

            ],

            "extensions":{

                "code":"FORBIDDEN"

            }

        }

    ]

}
```

The Account is still returned.

Only the restricted field fails.

---

# Best Practices

✔ Return meaningful error messages

✔ Avoid exposing sensitive server information

✔ Use standard error codes

✔ Include extensions for debugging

✔ Validate inputs before execution

✔ Handle resolver exceptions gracefully

✔ Log server-side errors

✔ Support partial success responses

✔ Use authentication and authorization consistently

---

# Summary

GraphQL provides a standardized and flexible approach to handling errors.

Execution Flow

```
Client

↓

Query

↓

Parser

↓

Validation

↓

Execution

↓

Success or Error

↓

GraphQL Response
```

## Key Takeaways

- GraphQL returns errors in a standard format.
- Responses may contain both `data` and `errors`.
- Syntax errors occur before execution.
- Validation errors prevent invalid queries from running.
- Resolver errors occur during execution.
- Authentication verifies identity.
- Authorization checks permissions.
- Business logic errors enforce application rules.
- The `path` field identifies where an error occurred.
- The `locations` field identifies the query position of an error.
- The `extensions` object provides additional metadata.
- Partial success responses are one of GraphQL's key advantages.
