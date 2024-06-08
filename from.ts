import { type AsyncOption, maybe, none, type Option } from './option.ts';

/**
 * Resolve a promise and return a new `Option` instance.
 *
 * @example Resolving a promise.
 *
 * ```ts
 * const result: Promise<number> = Promise.resolve(42);
 * const option: Option<number> = await fromPromise(result);
 *
 * if (option.hasValue) {
 *   console.log(option.value); // 42
 * } else {
 *   console.log('No value');
 * }
 * ```
 *
 * @param promise - The promise to resolve.
 * @param catchError - Whether to catch errors or not. If `true`, the function will return `None` if the promise rejects. If `false`, the function will throw the error.
 * @returns
 */
export async function fromPromise<T>(
    promise: Promise<T>,
    catchError: boolean = true,
): AsyncOption<T> {
    try {
        const value = await promise;
        return maybe(value);
    } catch (error) {
        if (catchError) {
            return none();
        }

        throw error;
    }
}

/**
 * Convert a result in format { ok: boolean, value: T } to an option.
 *
 * @example Converting a result to an option.
 *
 * ```ts
 * const result = { ok: true, value: 42 };
 * const option: Option<number> = fromResult(result);
 *
 * if (option.hasValue) {
 *   console.log(option.value); // 42
 * } else {
 *   console.log('No value');
 * }
 * ```
 *
 * @param result - The result to convert.
 * @returns Some if the result is ok, None otherwise.
 */
export function fromResult<T>(
    result: { ok: false } | { ok: true; value: T },
): Option<T> {
    return result.ok ? maybe(result.value) : none();
}

/**
 * Convert an async result in format { ok: boolean, value: T } to an option.
 *
 * @example Converting a result to an option.
 *
 * ```ts
 * const result = Promise.resolve({ ok: true, value: 42 });
 * const option: Option<number> = await fromAsyncResult(result);
 *
 * if (option.hasValue) {
 *   console.log(option.value); // 42
 * } else {
 *   console.log('No value');
 * }
 * ```
 *
 * @param result - The async result to convert.
 * @param catchError - Whether to catch errors or not. If `true`, the function will return `None` if the promise rejects. If `false`, the function will throw the error.
 * @returns Some if the result is ok, None otherwise.
 */
export async function fromAsyncResult<T>(
    result: Promise<{ ok: false } | { ok: true; value: T }>,
    catchError: boolean = true,
): AsyncOption<T> {
    try {
        const value = await result;
        return fromResult(value);
    } catch (error) {
        if (catchError) {
            return none();
        }

        throw error;
    }
}
