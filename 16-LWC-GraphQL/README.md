# 16 - GraphQL in Lightning Web Components (LWC)

# Table of Contents

1. Introduction
2. Why Use GraphQL in LWC?
3. Prerequisites
4. GraphQL Wire Adapter
5. Project Structure
6. Creating a GraphQL Query
7. Using Variables
8. Displaying Data
9. Loading State
10. Error Handling
11. Refreshing Data
12. Performance Benefits
13. Limitations
14. Best Practices
15. Example 1 - Account List
16. Example 2 - Account Details
17. Summary

---

# Introduction

Salesforce introduced the **GraphQL Wire Adapter** so Lightning Web Components can retrieve Salesforce data using GraphQL instead of multiple UI API wire adapters.

Instead of writing multiple wire adapters,

```
getRecord()

↓

getRelatedListRecords()

↓

getObjectInfo()
```

you can retrieve everything with **one GraphQL query**.

---

# Why Use GraphQL in LWC?

Suppose an Account page needs

- Account Name
- Industry
- Phone
- Owner Name
- Owner Email

Traditional UI API

```
Wire Adapter 1

↓

Wire Adapter 2

↓

Wire Adapter 3
```

GraphQL

```
One Wire Adapter

↓

One Query

↓

All Required Data
```

Benefits

- Fewer server requests
- Smaller responses
- Better performance
- Cleaner code
- Easier maintenance

---

# Prerequisites

Before using GraphQL in LWC, you should know:

- Lightning Web Components
- JavaScript
- Salesforce Objects
- UI API
- Basic GraphQL

---

# GraphQL Wire Adapter

The GraphQL Wire Adapter is provided by the `lightning/graphql` module.

Import it as follows:

```javascript
import { gql, graphql } from 'lightning/graphql';
```

- `gql` defines the GraphQL query.
- `graphql` executes the query using the wire service.

---

# Project Structure

```
16-LWC-GraphQL/

├── README.md

├── lwc-example-1/

│   ├── accountList.html
│   ├── accountList.js
│   ├── accountList.js-meta.xml

├── lwc-example-2/

│   ├── accountDetails.html
│   ├── accountDetails.js
│   ├── accountDetails.js-meta.xml
```

---

# Creating a GraphQL Query

GraphQL queries are defined using the `gql` template literal.

```javascript
const ACCOUNT_QUERY = gql`

query GetAccounts {

    uiapi {

        query {

            Account(first:5) {

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

`;
```

---

# Using Variables

Variables make queries reusable.

Example

```javascript
const ACCOUNT_QUERY = gql`

query GetAccount($id: ID!) {

    uiapi {

        query {

            Account(

                where: {

                    Id: {

                        eq: $id

                    }

                }

            ) {

                edges {

                    node {

                        Name {

                            value

                        }

                    }

                }

            }

        }

    }

}

`;
```

Variables

```javascript
variables = {

    id: '001XXXXXXXXXXXX'

};
```

---

# Displaying Data

Typical data flow

```
GraphQL

↓

Wire Adapter

↓

JavaScript

↓

HTML Template
```

Example

```html
<template>

    <template if:true={accounts}>

        <template for:each={accounts} for:item="acc">

            <p key={acc.Id}>{acc.Name.value}</p>

        </template>

    </template>

</template>
```

---

# Loading State

Always show loading feedback.

```html
<template>

    <template if:true={isLoading}>

        Loading...

    </template>

</template>
```

Good UX improves user satisfaction.

---

# Error Handling

GraphQL errors should be handled gracefully.

```javascript
if(data){

    // display data

}

if(errors){

    // display error

}
```

Never assume the request always succeeds.

---

# Refreshing Data

When records change,

refresh the GraphQL query.

```
Record Updated

↓

Refresh Wire

↓

Execute Query Again

↓

Updated UI
```

---

# Performance Benefits

GraphQL reduces unnecessary requests.

Traditional

```
3 Wire Adapters

↓

3 Requests
```

GraphQL

```
1 Wire Adapter

↓

1 Request
```

Advantages

- Faster page load
- Smaller payloads
- Reduced server calls

---

# Limitations

Current GraphQL support in LWC has some limitations.

Examples

- Only supported GraphQL operations
- Depends on UI API
- Some Salesforce objects may not be available
- Requires supported API versions

Always review Salesforce release notes for updates.

---

# Best Practices

✔ Request only required fields

✔ Use variables

✔ Handle loading state

✔ Handle errors

✔ Keep queries small

✔ Reuse GraphQL queries

✔ Use pagination

✔ Cache when appropriate

✔ Don't over-nest relationships

---

# Example 1 - Account List

The first example demonstrates

- GraphQL wire adapter
- Listing Accounts
- Displaying Names
- Looping using `for:each`

---

# Example 2 - Account Details

The second example demonstrates

- Variables
- Filtering by Account Id
- Relationship query
- Displaying Account Owner

---

# Summary

GraphQL simplifies data access in Lightning Web Components by replacing multiple UI API requests with a single GraphQL query.

Execution Flow

```
LWC

↓

GraphQL Wire Adapter

↓

Salesforce GraphQL API

↓

UI API

↓

Database

↓

Response

↓

LWC UI
```

## Key Takeaways

- LWC uses the `lightning/graphql` module.
- Queries are defined using `gql`.
- The `graphql` wire adapter retrieves data.
- Variables make queries reusable.
- Always handle loading and errors.
- Request only the fields you need.
- GraphQL improves LWC performance by reducing server requests.
- GraphQL integrates seamlessly with the Salesforce UI API.
