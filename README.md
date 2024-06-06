# No Null Or Undefined - Option

Provides a simple `Option` type that can be used to represent a value that may or may not be present. It is similar to the `Option` type in Rust or the `Optional` type in Java. It's main purpose is to avoid `null` or `undefined` values and the need to check for them.

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

## How to use

> see [jsr documentation](https://jsr.io/@nnou/option) for details on how to install

```typescript
import { maybe } from '@nnou/option';

function handleMessage(message?: string | null): void {
    const messageOption = maybe(message);

    if (messageOption.hasValue) {
        console.log(messageOption.value);
    } else {
        console.log('No message');
    }
}
```