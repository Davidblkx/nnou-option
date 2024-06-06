/**
 * @module
 *
 * Exports all the modules in the `nnou/option` library.
 *
 * This module is used to import all the modules in the `nnou/option` library.
 *
 * @example Using this module to safely use a value that may or may not be present.
 *
 * ```ts
 * import { maybe } from '@nnou/option';
 *
 * function logValue(value: number | null | undefined) {
 *    const result = maybe(value);
 *    if (result.hasValue) {
 *      console.log(result.value);
 *    } else {
 *      console.log('No value');
 *    }
 * }
 * ```
 */

export * from './assert.ts';
export * from './option.ts';
export * from './unwrap.ts';
export * from './map.ts';
