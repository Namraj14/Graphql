# Salesforce GraphQL - Lesson 3: WHERE Clause & Basic Operators

## Table of Contents

- Introduction
- SOQL vs GraphQL
- WHERE Clause
- Equality Operator (`eq`)
- Not Equal Operator (`ne`)
- Summary
- Cheat Sheet

---

# Introduction

Filtering records is one of the most common tasks in Salesforce. Just as SOQL uses the `WHERE` clause, Salesforce GraphQL uses the `where` argument.

The biggest difference is that GraphQL represents filters as nested objects instead of SQL expressions.

---

# SOQL vs GraphQL

## SOQL

```sql
SELECT Id, Name
FROM Account
WHERE Industry = 'Technology'
```

## GraphQL

```graphql
query {
  uiapi {
    query {
      Account(
        where: {
          Industry: {
            eq: "Technology"
          }
        }
      ) {
        edges {
          node {
            Id
            Name {
              value
            }
            Industry {
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

# Understanding the WHERE Clause

The GraphQL filter

```graphql
where: {
    Industry: {
        eq: "Technology"
    }
}
```

can be read as:

```
WHERE
   ↓
Industry
   ↓
equals
   ↓
Technology
```

or

```
WHERE Industry = 'Technology'
```

---

# Structure of a WHERE Filter

Every GraphQL filter follows the same structure.

```graphql
where: {

    FieldName: {

        Operator: Value

    }

}
```

Replace the placeholders.

```
FieldName → Industry

Operator → eq

Value → "Technology"
```

Result:

```graphql
where: {
    Industry: {
        eq: "Technology"
    }
}
```

---

# Operator 1 — Equal (`eq`)

The `eq` operator checks whether a field is equal to a given value.

## SOQL

```sql
WHERE Rating = 'Hot'
```

## GraphQL

```graphql
where: {
    Rating: {
        eq: "Hot"
    }
}
```

### Read in English

```
WHERE

↓

Rating

↓

equals

↓

Hot
```

---

## Example

Suppose the Account table contains:

| Name | Rating |
|------|---------|
| Google | Hot |
| Nike | Cold |
| Salesforce | Hot |

GraphQL Filter

```graphql
where: {
    Rating: {
        eq: "Hot"
    }
}
```

Returned Records

```
Google

Salesforce
```

---

# Operator 2 — Not Equal (`ne`)

The `ne` operator returns records whose value is NOT equal to the specified value.

## SOQL

```sql
WHERE Industry != 'Retail'
```

## GraphQL

```graphql
where: {
    Industry: {
        ne: "Retail"
    }
}
```

### Read in English

```
WHERE

↓

Industry

↓

is NOT equal to

↓

Retail
```

---

## Example

Suppose the Account table contains:

| Name | Industry |
|------|-----------|
| Google | Technology |
| Nike | Retail |
| Microsoft | Technology |

GraphQL Filter

```graphql
where: {
    Industry: {
        ne: "Retail"
    }
}
```

Returned Records

```
Google

Microsoft
```

Nike is excluded because its Industry is Retail.

---

# Visual Diagram

```
where
│
└── Field
      │
      └── Operator
              │
              └── Value
```

Example

```
where
│
└── Industry
      │
      └── eq
              │
              └── Technology
```

---

# Summary

Salesforce GraphQL represents filters as nested objects.

Every filter follows the same pattern.

```
where
    ↓
Field
    ↓
Operator
    ↓
Value
```

Once you understand this structure, learning new operators becomes very easy because only the operator changes.

---

# Cheat Sheet

| SOQL | GraphQL |
|------|----------|
| `WHERE` | `where` |
| `=` | `eq` |
| `!=` | `ne` |

## Examples

### Equal

```graphql
where: {
    Rating: {
        eq: "Hot"
    }
}
```

### Not Equal

```graphql
where: {
    Industry: {
        ne: "Retail"
    }
}
```

---

## Key Takeaways

- `where` is equivalent to the SOQL `WHERE` clause.
- `eq` means **equals**.
- `ne` means **not equals**.
- Every GraphQL filter follows the pattern:
  - **Field**
  - **Operator**
  - **Value**
- Once you know the structure, learning additional operators (`gt`, `lt`, `gte`, `lte`, `like`, `in`, etc.) becomes straightforward.
