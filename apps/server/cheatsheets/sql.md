# Common SQL Error Codes and Messages Cheat Sheet

This is a quick reference for common SQL errors (focused on PostgreSQL, but many apply to others too). Useful for debugging raw queries, ORM mishaps (like Prisma), or just deciphering cryptic server logs.

---

## 📛 Syntax & Structure Errors

### **42601 – Syntax Error**

> **Message:** `syntax error at or near "..."`

**Cause:**

- Missed a comma, parenthesis, or operator
- Used a keyword in the wrong place
- Accidentally left a dangling comma

**Fix:**

- Triple-check the line mentioned in the error
- Run the query in `psql` or your DB GUI for clearer pinpointing

---

## 🔢 Argument / Parameter Issues

### **22023 – Invalid Parameter Value**

> **Message:** `argument list must have even number of elements`  
> **Context:** Often in `json_build_object(...)`

**Cause:**

- `json_build_object()` expects pairs: `'key1', value1, 'key2', value2, ...`
- You probably passed an odd number of arguments

**Fix:**

- Ensure you're passing alternating keys and values
- In dynamic code, check for extra commas or trailing pairs

---

## 🚫 Constraint Violations

### **23505 – Unique Violation**

> **Message:** `duplicate key value violates unique constraint`

**Cause:**

- You're trying to insert/update a row with a value that already exists for a `UNIQUE` column/index

**Fix:**

- Ensure the value is truly unique
- Use `ON CONFLICT DO NOTHING / DO UPDATE` if intentional

---

### **23503 – Foreign Key Violation**

> **Message:** `insert or update on table ... violates foreign key constraint`

**Cause:**

- You're referencing a related row that doesn't exist in the parent table

**Fix:**

- Ensure the referenced ID exists
- Check the table/column you're pointing to

---

## 🔍 Type & Coercion Issues

### **42804 – Datatype Mismatch**

> **Message:** `column "x" is of type integer but expression is of type text`

**Cause:**

- Wrong type in your `INSERT`, `UPDATE`, or `WHERE`

**Fix:**

- Cast values: `'42'::int` or `CAST('42' AS INTEGER)`
- Make sure you're not mixing `text` with `int`, etc.

---

### **22P02 – Invalid Text Representation**

> **Message:** `invalid input syntax for type ...`

**Cause:**

- Tried to insert a string like `'abc'` into an `int`, `uuid`, or `date` field

**Fix:**

- Validate inputs before sending to SQL
- Use parameterized queries to avoid bad casts

---

## 🛠️ Query Execution

### **42P01 – Undefined Table**

> **Message:** `relation "x" does not exist`

**Cause:**

- Table name typo
- Table doesn’t exist in current schema or is missing quotes

**Fix:**

- Use correct casing: PostgreSQL is case-sensitive if quoted
- Double-check schema context

---

### **42703 – Undefined Column**

> **Message:** `column "x" does not exist`

**Cause:**

- Typo or wrong alias usage
- The column isn't selected or doesn’t exist in the context

**Fix:**

- Check table aliases
- Ensure you're not referencing an alias before its definition

---

## 💥 Other Annoying Ones

### **57014 – Query Canceled**

> **Message:** `canceling statement due to statement timeout`

**Cause:**

- Query took too long and hit timeout

**Fix:**

- Index your columns
- Avoid `SELECT *` with joins on large datasets
- Optimize with pagination, filtering

---

## ✅ Bonus: Debugging Tips

- Use `EXPLAIN ANALYZE` to profile queries
- Wrap raw SQL in `()` when nesting subqueries
- Alias EVERYTHING (`SELECT x FROM y` → `SELECT x AS "x" FROM y AS y`)
- Parameterize values; never interpolate raw user inputs

---

> Keep this cheat sheet handy when you dive into raw SQL — and may your joins always be `INNER` unless absolutely necessary 😉
