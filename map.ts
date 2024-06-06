/**
 * @module map
 *
 * Helper function to map an Option<T> value to another value.
 */

import { maybe, none, type Option } from './option.ts';
import { isOption } from './assert.ts';

/**
 * Maps an Option<T> value to another Option<Z> value. If the Option<T> is empty, a None
 *
 * @example using map
 * ```ts
 * import { Option, map, maybe } from '@nnou/option';
 *
 * const option: Option<number> = maybe(42);
 * const mapped = map(option, (value) => maybe(value * 2)); // mapped is Some(84)
 * ```
 *
 * @param option - The Option<T> to map.
 * @param fn - The function to call to map the value.
 */
export function map<T, Z>(option: Option<T>, fn: (value: T) => Option<Z>): Option<Z>;
/**
 * Maps an Option<T> value to another value. If the Option<T> is empty, a None
 *
 * @example using map
 * ```ts
 * import { Option, map, maybe } from '@nnou/option';
 *
 * const option: Option<number> = maybe(42);
 * const mapped = map(option, (value) => value * 2); // mapped is 84
 * ```
 *
 * @param option - The Option<T> to map.
 * @param fn - The function to call to map the value.
 */
export function map<T, Z>(
    option: Option<T>,
    fn: (value: T) => NonNullable<Z>,
): Option<Z>;
export function map(
    option: Option<unknown>,
    fn: (value: unknown) => NonNullable<unknown> | Option<unknown>,
): Option<unknown> {
    if (!option.hasValue) {
        return none();
    }

    const v = fn(option.value);
    return isOption(v) ? v : maybe(v);
}

/**
 * Maps an Option<T> value to another value. If the Option<T> is empty, a None
 *
 * @example using mapOr
 * ```ts
 * import { Option, mapOr, maybe } from '@nnou/option';
 *
 * const option: Option<number> = maybe(42);
 * const mapped = mapOr(option, (value) => value * 2, () => 0); // mapped is 84
 * ```
 *
 * @param option - The Option<T> to map.
 * @param some - The function to call to map the value.
 * @param none - The function to call if the Option<T> is empty.
 */
export function mapOr<T, Z>(
    option: Option<T>,
    some: (value: T) => NonNullable<Z>,
    none: () => NonNullable<Z>,
): Z {
    return option.hasValue ? some(option.value) : none();
}

/**
 * Flattens an Option<Option<T>> to an Option<T>.
 *
 * @example using flatten
 * ```ts
 * import { Option, flatten, maybe } from '@nnou/option';
 *
 * const option: Option<Option<number>> = maybe(maybe(42));
 * const flattened = flatten(option); // flattened is Some(42)
 * ```
 *
 * @param option - The Option<Option<T>> to flatten.
 * @returns Flattened Option<T>.
 */
export function flatten<T>(option: Option<Option<T>>): Option<T> {
    return option.hasValue ? option.value : none();
}
