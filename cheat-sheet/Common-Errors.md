# Common GraphQL Errors

This guide lists the most common GraphQL errors, why they occur, and how to fix them.

---

# 1. Syntax Error

Example

```graphql
query {

  account(id:"001" {

    name

  }

}
```

Cause

- Missing parenthesis
- Missing braces
- Invalid syntax

Solution

✔ Check matching `{}`

✔ Check matching `()`

---

# 2. Unknown Field

```
Cannot query field "salary" on type "Account".
```

Cause

Field does not exist.

Solution

✔ Check the schema.

---

# 3. Unknown Type

```
Unknown type "Customer".
```

Cause

The type isn't defined in the schema.

---

# 4. Missing Required Variable

```
Variable "$id" was not provided.
```

Cause

Required variable missing.

Solution

```json
{
  "id":"001XXXXXXXXXXXX"
}
```

---

# 5. Invalid Variable Type

```
Expected type Int.

Found String.
```

Cause

Incorrect variable type.

---

# 6. Authentication Error

```
Unauthorized
```

Cause

- Invalid token
- Missing token
- Expired token

---

# 7. Authorization Error

```
Forbidden
```

Cause

User lacks permission.

---

# 8. Invalid Cursor

```
Invalid cursor.
```

Cause

Cursor has expired or is malformed.

---

# 9. Resolver Error

```
Database connection failed.
```

Cause

Backend service failed.

---

# 10. Null for Non-Null Field

```
Cannot return null for non-nullable field.
```

Cause

A field marked with `!` returned `null`.

Example

```graphql
type User {

  name: String!

}
```

---

# 11. Validation Error

```
Cannot query field "abc".
```

Cause

Query doesn't match the schema.

---

# 12. Maximum Query Depth Exceeded

Cause

The query is too deeply nested.

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

↓

...
```

Solution

Keep queries shallow.

---

# 13. Rate Limit Exceeded

Cause

Too many requests in a short period.

Solution

Retry later or reduce request frequency.

---

# Debugging Checklist

✔ Check query syntax

✔ Validate variables

✔ Verify schema

✔ Confirm authentication

✔ Check permissions

✔ Inspect server logs

✔ Verify field names

✔ Test with GraphQL Playground

---

# Error Response Example

```json
{
  "data": null,
  "errors": [
    {
      "message": "Account not found.",
      "path": [
        "account"
      ],
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

---

# Quick Troubleshooting Table

| Error | Common Cause | Solution |
|--------|--------------|----------|
| Syntax Error | Invalid query syntax | Fix braces, parentheses |
| Unknown Field | Field doesn't exist | Check schema |
| Unknown Type | Invalid type | Verify schema |
| Missing Variable | Variable not supplied | Pass required variable |
| Invalid Type | Wrong variable type | Match schema type |
| Unauthorized | Invalid token | Authenticate |
| Forbidden | Missing permission | Check user access |
| Invalid Cursor | Bad pagination cursor | Request a new cursor |
| Resolver Error | Backend failure | Check logs |
| Null Non-Null Field | Resolver returned null | Fix resolver or schema |
| Validation Error | Invalid query | Validate against schema |
| Query Depth Exceeded | Too much nesting | Simplify query |
| Rate Limit | Too many requests | Retry with backoff |
