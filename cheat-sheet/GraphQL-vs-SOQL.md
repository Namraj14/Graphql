# GraphQL vs SOQL

Although both retrieve Salesforce data, they serve different purposes.

| Feature | GraphQL | SOQL |
|----------|----------|------|
| Language Type | API Query Language | Salesforce Query Language |
| Used By | Clients | Apex, APIs |
| Endpoint | GraphQL API | REST, SOAP, Apex |
| Relationships | Nested | Dot notation & subqueries |
| Schema | Strongly Typed | Salesforce Objects |
| Response | JSON | sObjects / JSON |
| Mutations | Supported | Not Supported |

---

# SOQL Example

```sql
SELECT Id,
       Name,
       Industry
FROM Account
WHERE Industry = 'Technology'
ORDER BY Name
LIMIT 10
```

---

# GraphQL Equivalent

```graphql
query {

  accounts(

    where: {
      industry: {
        eq: "Technology"
      }
    }

    orderBy: {
      name: ASC
    }

    first: 10

  ) {

    edges {

      node {

        id

        name

        industry

      }

    }

  }

}
```

---

# Relationships

SOQL

```sql
SELECT Name,
       Owner.Name
FROM Account
```

GraphQL

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

---

# Child Relationships

SOQL

```sql
SELECT Name,

(

SELECT FirstName

FROM Contacts

)

FROM Account
```

GraphQL

```graphql
query {

  account(id: "001") {

    name

    contacts {

      firstName

    }

  }

}
```

---

# Similarities

- Retrieve Salesforce data
- Support filtering
- Support sorting
- Support relationships
- Support pagination
- Respect Salesforce security

---

# Differences

SOQL

- SQL-like syntax
- Salesforce-specific
- Used in Apex
- Cannot update data

GraphQL

- Query language
- API-based
- Strong schema
- Supports mutations
- Client chooses fields

---

# When to Use SOQL

✔ Apex

✔ Batch Apex

✔ Triggers

✔ Flows with Apex

✔ Internal Salesforce logic

---

# When to Use GraphQL

✔ Lightning Web Components

✔ Mobile Apps

✔ React

✔ Angular

✔ External Integrations

✔ Modern UI Development

---

# Summary

SOQL retrieves Salesforce data inside the Salesforce platform.

GraphQL retrieves Salesforce data through a flexible API while allowing clients to request exactly the fields they need.
