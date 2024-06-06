/**
 * @module unwrap
 *
 * Helper function to unwrap an Option<T> value,
 */

import type { Option } from './option.ts';

/**
 * Unwraps an Option<T> value, returning the contained value or a default.
 *
 * @example using unwrap
 * ```ts
 * import { Option, unwrap } from '@nnou/option';
 *
 * const option: Option<number> = { hasValue: true, value: 42 };
 * const value = unwrap(option, 0); // value is 42
 * ```
 *
 * @param option - The Option<T> to unwrap.
 * @param or - The default value to return if the Option<T> is empty.
 * @returns The contained value or a default.
 */
export function unwrap<T>(option: Option<T>, or: NonNullable<T>): T;
/**
 * Unwraps an Option<T> value, returning the contained value or the result of a function.
 *
 * @example using unwrap
 * ```ts
 * import { Option, unwrap } from '@nnou/option';
 *
 * const option: Option<number> = { hasValue: true, value: 42 };
 * const value = unwrap(option, () => 0); // value is 42
 * ```
 *
 * @param option - The Option<T> to unwrap.
 * @param or - The function to call to get the default value if the Option<T> is empty.
 * @returns The contained value or the result of the function.
 */
export function unwrap<T>(option: Option<T>, or: () => NonNullable<T>): T;
export function unwrap<T>(option: Option<T>, or: (() => NonNullable<T>) | NonNullable<T>): T {
    if (option.hasValue) {
        return option.value;
    }

    return or instanceof Function ? or() : or;
}
