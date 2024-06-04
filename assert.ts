import type { None, Option, Some } from './option.ts';

/**
 * Assert that the given `Option` instance is a `Some` instance.
 * If the given `Option` instance is a `None` instance, an error is thrown.
 *
 * @example Asserting that an `Option` instance is a `Some` instance.
 *
 * ```ts
 * const result: Option<number> = maybe(42);
 *
 * assertSome(result);
 * console.log(result.value); // 42
 * ```
 *
 * @param option The `Option` instance to assert.
 */
export function assertSome<T>(option: Option<T>): asserts option is Some<T> {
    if (!option.hasValue) {
        throw new Error('Expected a value to be present');
    }
}

/**
 * Assert that the given `Option` instance is a `None` instance.
 * If the given `Option` instance is a `Some` instance, an error is thrown.
 *
 * @example Asserting that an `Option` instance is a `None` instance.
 *
 * ```ts
 * const result: Option<number> = maybe();
 *
 * assertNone(result);
 * console.log('No value');
 * ```
 *
 * @param option The `Option` instance to assert.
 */
export function assertNone<T>(option: Option<T>): asserts option is None {
    if (option.hasValue) {
        throw new Error('Expected no value to be present');
    }
}

/**
 * Assert that the given `Option` instance is a `Some` instance and that the value is equal to the given value.
 * If the given `Option` instance is a `None` instance, an error is thrown.
 * If the value of the `Some` instance is not equal to the given value, an error is thrown.
 *
 * @example Asserting that an `Option` instance is a `Some` instance and that the value is equal to the given value.
 *
 * ```ts
 * const result: Option<number> = maybe(42);
 *
 * assertSomeValue(result, 42);
 * console.log(result.value); // 42
 * ```
 *
 * @param option The `Option` instance to assert.
 * @param value The value to compare the `Some` value to.
 */
export function assertSomeValue<T>(option: Option<T>, value: NonNullable<T>): void {
    assertSome(option);
    option.value === value;
}
