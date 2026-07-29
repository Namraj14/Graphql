# GraphQL vs REST

| Feature | GraphQL | REST |
|----------|----------|------|
| Endpoint | Single | Multiple |
| Data Fetching | Client chooses | Server decides |
| Over-fetching | No | Yes |
| Under-fetching | No | Possible |
| Versioning | Usually unnecessary | Common |
| Relationships | Built-in | Multiple requests |
| Request Type | Query Language | HTTP Resources |
| Schema | Strongly Typed | Optional |
| Documentation | Introspection | External Docs |

---

# Example

REST

```
GET /accounts

GET /accounts/001

GET /contacts

GET /opportunities
```

Multiple requests

---

GraphQL

```graphql
query {

  account(id: "001") {

    name

    contacts {
      firstName
    }

    opportunities {
      name
    }

  }

}
```

One request

---

# REST Flow

```
Client

↓

GET /Account

↓

Server

↓

Account
```

Need Contacts?

```
↓

GET /Contact

↓

Server

↓

Contacts
```

---

# GraphQL Flow

```
Client

↓

Single Query

↓

GraphQL

↓

Database

↓

Everything Returned
```

---

# Advantages of GraphQL

- Single endpoint
- Flexible responses
- Strong schema
- Nested relationships
- Smaller payloads
- Great for mobile apps
- Introspection support

---

# Advantages of REST

- Simple
- Easy to cache
- Mature ecosystem
- Widely adopted
- Excellent for CRUD APIs

---

# When to Use GraphQL

✔ Mobile applications

✔ Dashboards

✔ Complex relationships

✔ Multiple data sources

✔ Modern SPAs

---

# When to Use REST

✔ Simple CRUD

✔ Public APIs

✔ File downloads

✔ Legacy integrations

✔ Stateless services

---

# Summary

REST is resource-based.

GraphQL is query-based.

REST exposes multiple endpoints.

GraphQL exposes one endpoint.
