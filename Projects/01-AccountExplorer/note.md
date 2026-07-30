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

## Which One Should You Use?

- Use **`return`** when your function has multiple statements or additional logic.
- Use **implicit return (`()`)** for short, clean transformations, especially with methods like `map()`, `filter()`, and `reduce()`.

The implicit return syntax is the style you'll most commonly see in modern JavaScript and LWC codebases.
