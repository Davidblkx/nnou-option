/**
 * Represents a value that is present.
 */
export type Some<T> = {
    hasValue: true;
    value: NonNullable<T>;
};

/**
 * Represents a value that is not be present.
 */
export type None = {
    hasValue: false;
};

/**
 * Represents a value that may or may not be present. It is used to avoid `null` or `undefined` values.
 *
 * @example Using `Option` to represent a value that may not be present.
 *
 * ```ts
 * const result: Option<number> = maybe(42);
 *
 * if (result.hasValue) {
 *    console.log(result.value); // 42
 * } else {
 *    console.log('No value');
 * }
 * ```
 */
export type Option<T> = Some<NonNullable<T>> | None;

/**
 * Creates a new `Some` instance.
 *
 * @example Creating a new `Some` instance.
 *
 * ```ts
 * const result: Option<number> = some(42);
 *
 * if (result.hasValue) {
 *   console.log(result.value); // 42
 * } else {
 *  console.log('No value');
 * }
 * ```
 *
 * @param value The value to wrap.
 * @returns A new `Some` instance.
 */
export function some<T>(value: NonNullable<T>): Some<NonNullable<T>> {
    return {
        hasValue: true,
        value,
    };
}

/**
 * Creates a new `None` instance.
 *
 * @example Creating a new `None` instance.
 *
 * ```ts
 * const result: Option<number> = none();
 *
 * if (result.hasValue) {
 *   console.log(result.value);
 * } else {
 *  console.log('No value');
 * }
 * ```
 *
 * @returns A new `None` instance.
 */
export function none(): None {
    return { hasValue: false };
}

/**
 * Creates a new `Option` instance.
 *
 * @example Creating a new `Option` instance.
 *
 * ```ts
 * const result: Option<number> = maybe(42);
 *
 * if (result.hasValue) {
 *   console.log(result.value); // 42
 * } else {
 *  console.log('No value');
 * }
 * ```
 *
 * @param value The value to wrap.
 * @returns A new `Option` instance.
 */
export function maybe<T>(value?: T): Option<NonNullable<T>> {
    if (typeof value === 'undefined' || value === null) {
        return none();
    }

    return some(value);
}
