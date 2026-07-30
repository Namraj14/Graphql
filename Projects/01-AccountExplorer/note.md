# Returning Objects in Arrow Functions

When using an arrow function (`=>`) in JavaScript, there are **two ways** to return an object.

---

## Option 1: Use `return`

If you use curly braces `{}` after the arrow (`=>`), JavaScript treats them as the **function body**. Therefore, you **must** use the `return` keyword.

### Example

```javascript
const result = accounts.map(account => {
    return {
        id: account.Id,
        name: account.Name.value
    };
});
```

### Explanation

- `{}` after `=>` represents the function body.
- `return` sends the object back.
- This is useful when your function contains multiple lines of logic.

---

## Option 2: Use an Implicit Return with `()`

If your function only needs to return an object, you can wrap the object in parentheses `()`.

### Example

```javascript
const result = accounts.map(account => ({
    id: account.Id,
    name: account.Name.value
}));
```

### Explanation

- `()` tells JavaScript that the object should be returned immediately.
- No `return` keyword is required.
- This is shorter and is the most common style used with `map()`.

---

## Understanding `id`, `name`, and Other Properties

Consider this GraphQL response:

```javascript
const account = {
    Id: "001",
    Name: {
        value: "Google"
    },
    Industry: {
        value: "Technology"
    }
};
```

Now look at the `map()` function:

```javascript
const result = accounts.map(account => ({
    id: account.Id,
    name: account.Name.value,
    industry: account.Industry.value
}));
```

### What do `id`, `name`, and `industry` mean?

The **left side** (`id`, `name`, `industry`) are **new property names** that you are creating in the new object.

The **right side** (`account.Id`, `account.Name.value`, `account.Industry.value`) are the values taken from the original object.

```javascript
{
    id: account.Id,
    name: account.Name.value,
    industry: account.Industry.value
}
```

becomes

```javascript
{
    id: "001",
    name: "Google",
    industry: "Technology"
}
```

### Left Side vs Right Side

| Left Side | Right Side | Meaning |
|-----------|------------|---------|
| `id` | `account.Id` | Create a new property named `id` and assign it the value of `account.Id`. |
| `name` | `account.Name.value` | Create a new property named `name` and assign it the value of `account.Name.value`. |
| `industry` | `account.Industry.value` | Create a new property named `industry` and assign it the value of `account.Industry.value`. |

You can choose **any property names** on the left.

For example:

```javascript
const result = accounts.map(account => ({
    accountId: account.Id,
    accountName: account.Name.value,
    accountIndustry: account.Industry.value
}));
```

Output:

```javascript
[
    {
        accountId: "001",
        accountName: "Google",
        accountIndustry: "Technology"
    }
]
```

This works because the property names on the left are completely up to you.

---

## Why Do We Do This?

GraphQL responses are often nested.

Original GraphQL object:

```javascript
{
    Id: "001",
    Name: {
        value: "Google"
    },
    Industry: {
        value: "Technology"
    }
}
```

After using `map()`:

```javascript
{
    id: "001",
    name: "Google",
    industry: "Technology"
}
```

The new object is **flatter**, easier to read, and much easier to use in your LWC HTML templates.

Instead of writing:

```javascript
account.Name.value
```

you can simply write:

```javascript
account.name
```

---

## Common Mistake

❌ Incorrect

```javascript
const result = accounts.map(account => {
    id: account.Id,
    name: account.Name.value
});
```

### Why is this wrong?

JavaScript interprets `{}` as the **function body**, not as an object. Since there is no `return` statement, the function returns `undefined`.

---

## Comparison

### Using `return`

```javascript
const result = accounts.map(account => {
    return {
        id: account.Id,
        name: account.Name.value
    };
});
```

### Using Implicit Return

```javascript
const result = accounts.map(account => ({
    id: account.Id,
    name: account.Name.value
}));
```

Both snippets produce the same output.

---

## Rule to Remember

- ✅ If you use **`{}`** after `=>`, use **`return`**.

```javascript
account => {
    return {
        id: account.Id
    };
}
```

- ✅ If you want a one-line return, wrap the object in **`()`**.

```javascript
account => ({
    id: account.Id
})
```

---

## Key Takeaways

- `map()` transforms each element of an array into a new element.
- The property names on the **left side** (`id`, `name`, `industry`) are **new properties that you create**.
- The expressions on the **right side** (`account.Id`, `account.Name.value`) provide the values.
- Use **`return`** when your arrow function has a function body (`{}`).
- Use **`()`** for an implicit return when you only need to return an object.
- The implicit return style is the most common pattern in modern JavaScript and LWC projects.
