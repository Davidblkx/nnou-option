# No Null Or Undefined - Option

Provides a simple `Option` type that can be used to represent a value that may or may not be present. It is similar to the `Option` type in Rust or the `Optional` type in Java. It's main purpose is to avoid `null` or `undefined` values and the need to check for them.

Is done in TypeScript, is tree-shakable and has no dependencies.

## Quick start

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

## Core Methods

### `some(value: NonNullable<T>): Some<T>`

Creates an `Option` with a value.

```typescript
import { some, Option } from '@nnou/option';

const option = some(42); // Some<number>
const option: Option<number> = some(42);
```

### `none(): None`

Creates an `Option` without a value.

```typescript
import { none, Option } from '@nnou/option';

const option = none(); // None
const option: Option<string> = none();
```

### `maybe(value?: T): Option<T>`

Creates an `Option` with a value if it is not `null` or `undefined`.

```typescript
import { maybe } from '@nnou/option';

const option = maybe(42); // Option<number>
const option = maybe<null | number>(null); // Option<number>
const option = maybe<string>(); // Option<string>
```

## Assert Methods

### `isOption<T>(value: T): value is Option<T>`

Checks if a value is an `Option`.

```typescript
import { isOption } from '@nnou/option';

const value: unknown = ...;

if (isOption(value)) {
    // value is an Option
}
```

### `assertNone<T>(value: Option<T>): asserts value is None`

Checks if an `Option` is `None`.

```typescript
import { assertNone, none, some } from '@nnou/option';

const option = none();

assertNone(option); // OK

const option = some(42);

assertNone(option); // Error
```

### `assertSome<T>(value: Option<T>): asserts value is Some<T>`

Checks if an `Option` is `Some`.

```typescript
import { assertSome, none, some } from '@nnou/option';

const option = some(42);

assertSome(option); // OK

const option = none();

assertSome(option); // Error
```

### `assertSomeValue<T>(option: Option<T>, value: NonNullable<T>): asserts option is Some<T>`

Checks if an `Option` is `Some` with a specific value.

```typescript
import { assertSomeValue, none, some } from '@nnou/option';

const option = some(42);

assertSomeValue(option, 42); // OK

const option = some(42);

assertSomeValue(option, 43); // Error

const option = none();

assertSomeValue(option, 42); // Error
```

## Unwrap Methods

### `unwrap<T>(option: Option<T>, or: (() => NonNullable<T>) | NonNullable<T>): T`

Unwraps an `Option` and returns the value if it is `Some` or a default value if it is `None`.

```typescript
import { unwrap, none, some } from '@nnou/option';

const option = some(42);

const value = unwrap(option, 0); // 42

const option = none();

const value = unwrap(option, 0); // 0
const value = unwrap(option, () => 0); // 0
```

## Map Methods

### `map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U>`

Maps an `Option` to another `Option`.

```typescript
import { map, none, some } from '@nnou/option';

const option = some(42);

const mappedOption = map(option, value => value.toString()); // Option<string>

const option = none();

const mappedOption = map(option, value => value.toString()); // Option<string>
```

### `mapOr<T, U>(option: Option<T>, defaultValue: U, fn: (value: T) => U): U`

Maps an `Option` to a value.

```typescript
import { mapOr, none, some } from '@nnou/option';

const option = some(42);

const value = mapOr(option, (v) => v, () => 10); // '42'

const option = none();

const value = mapOr(option, (v) => v, () => 10); // 10
```

### `flatten<T>(option: Option<Option<T>>): Option<T>`
Flattens an `Option` of an `Option`.

```typescript
import { flatten, none, some } from '@nnou/option';

const option = some(some(42));

const flattenedOption = flatten(option); // Some<number>

const option = none();

const flattenedOption = flatten(option); // None
```

## From Methods

### `fromPromise<T>(promise: Promise<T>, catchError = true): Promise<Option<T>>`

Creates an `Option` from a `Promise`.

```typescript
import { fromPromise } from '@nnou/option';

const promise = Promise.resolve(42);

const option = await fromPromise(promise); // Option<number>

const promise = Promise.reject();

const option = await fromPromise(promise); // None

const promise = Promise.reject();

const option = await fromPromise(promise, false); // Error
```

### `fromResult<T>(result: { ok: false } | { ok: true; value: T }): Option<T>`

Creates an `Option` from a `Result`.

```typescript
import { fromResult } from '@nnou/option';

const result = { ok: true, value: 42 };

const option = fromResult(result); // Option<number>

const result = { ok: false };

const option = fromResult(result); // None
```

### `fromAsyncResult<T>(result: Promise<{ ok: false } | { ok: true; value: T }>, catchError = true): Promise<Option<T>>`

Creates an `Option` from a `Promise` of a `Result`.

```typescript
import { fromAsyncResult } from '@nnou/option';

const result = Promise.resolve({ ok: true, value: 42 });

const option = await fromAsyncResult(result); // Option<number>

const result = Promise.resolve({ ok: false });

const option = await fromAsyncResult(result); // None

const result = Promise.reject();

const option = await fromAsyncResult(result); // None

const result = Promise.reject();

const option = await fromAsyncResult(result, false); // Error
```
