import { assertNone, assertSomeValue } from './assert.ts';
import { assertRejects } from '@std/assert';

import { fromAsyncResult, fromPromise, fromResult } from './from.ts';

Deno.test('.fromPromise', async (t) => {
    await t.step('converts a promise to an option', async () => {
        const promise = Promise.resolve(42);
        const option = await fromPromise(promise);

        assertSomeValue(option, 42);
    });

    await t.step('converts a promise to an option with error handling', async () => {
        const promise = Promise.reject(new Error());
        const option = await fromPromise(promise);

        assertNone(option);
    });

    await t.step('converts a promise to an option with error handling disabled', async () => {
        const promise = Promise.reject(new Error());
        await assertRejects(() => fromPromise(promise, false));
    });
});

Deno.test('.fromResult', async (t) => {
    await t.step('converts a result to an option', () => {
        const result = { ok: true, value: 42 };
        const option = fromResult(result);

        assertSomeValue(option, 42);
    });

    await t.step('converts a result to an option', () => {
        const result = { ok: false, error: 'My error' } as const;
        const option = fromResult(result);

        assertNone(option);
    });
});

Deno.test('.fromAsyncResult', async (t) => {
    await t.step('converts an async result to an option', async () => {
        const result = Promise.resolve({ ok: true, value: 42 });
        const option = await fromAsyncResult(result);

        assertSomeValue(option, 42);
    });

    await t.step('converts an async result to an option with error handling', async () => {
        const result = Promise.resolve({ ok: false, error: 'My error' } as const);
        const option = await fromAsyncResult(result);

        assertNone(option);
    });

    await t.step('converts an async result to an option with error handling disabled', async () => {
        const result = Promise.reject(new Error());
        await assertRejects(() => fromAsyncResult(result, false));
    });
});
