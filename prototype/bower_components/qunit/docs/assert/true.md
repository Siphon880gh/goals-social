---
layout: default
title: assert.true()
excerpt: A strict boolean true comparison.
categories:
  - assert
version_added: "2.11"
---

`true( actual [, message ] )`

A strict comparison that passes if the first argument is boolean `true`.

| name               | description                          |
|--------------------|--------------------------------------|
| `actual`           | Expression being tested              |
| `message` (string) | A short description of the assertion |

### Description

`true()` requires just one argument. If the argument evaluates to true, the assertion passes; otherwise, it fails.

This method is similar to the `assertTrue()` method found in xUnit-style frameworks.

[`false()`](./false.md) can be used to explicitly test for a false value.

### Examples

```js
QUnit.test( "example", assert => {
  // success
  assert.true( true, "boolean true" );

  // failure
  assert.true( "foo", "non-empty string" );
  assert.true( "", "empty string" );
  assert.true( 0, "number zero" );
  assert.true( false, "boolean false" );
  assert.true( NaN, "NaN value" );
  assert.true( null, "null value" );
  assert.true( undefined, "undefined value" );
});
```

