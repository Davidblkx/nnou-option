# No Null Or Undefined - Option

This library has the basic types to avoid use `undefined` or `null`.

Is done in TypeScript, is tree-shakable and has no dependencies.

It is split in multiple parts:

- `option.ts` - Has the basic types and three helper functions:
    - `some` - Creates a `Some` type.
    - `none` - Creates a `None` type.
    - `maybe` - Creates a `Some` or `None` type based on the value.
- `assert.ts` - Has helper functions used in testing:
    - `assertSome` - Asserts that the value is a `Some`.
    - `assertNone` - Asserts that the value is a `None`.
    - `assertSomeValue` - Asserts that the value is a `Some` and has the expected value.