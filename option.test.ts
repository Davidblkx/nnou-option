import { assertEquals } from '@std/assert';

import { maybe, none, some } from './option.ts';
import { assertNone, assertSome } from './assert.ts';

Deno.test('.none', async (t) => {
    await t.step('creates a None value', () => {
        const result = none();
        assertNone(result);
    });
});

Deno.test('.some', async (t) => {
    await t.step('creates a Some value', () => {
        const result = some(42);
        assertSome(result);
    });

    await t.step('we can read value', () => {
        const result = some('Hello, World!');
        assertSome(result);
        assertEquals(result.value, 'Hello, World!');
    });
});

Deno.test('.maybe', async (t) => {
    await t.step('when value is null, returns none', () => {
        const result = maybe<number | null>(null);
        assertNone(result);
    });

    await t.step('when value is undefined, returns none', () => {
        const result = maybe<number | undefined>(undefined);
        assertNone(result);
    });

    await t.step('when value is not null or undefined, returns some', () => {
        const result = maybe(42);
        assertSome(result);
    });
});
