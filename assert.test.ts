import { assertNone, assertSome, assertSomeValue, isOption } from './assert.ts';

import { assertEquals, assertThrows } from '@std/assert';

Deno.test('.assertSome', async (t) => {
    await t.step('throws when is None', () => {
        assertThrows(() => {
            assertSome({ hasValue: false });
        });
    });

    await t.step('does not throw when is Some', () => {
        assertSome({ hasValue: true, value: 42 });
    });
});

Deno.test('.assertNone', async (t) => {
    await t.step('throws when is Some', () => {
        assertThrows(() => {
            assertNone({ hasValue: true, value: 42 });
        });
    });

    await t.step('does not throw when is None', () => {
        assertNone({ hasValue: false });
    });
});

Deno.test('.assertSomeValue', async (t) => {
    await t.step('throws when is None', () => {
        assertThrows(() => {
            assertSomeValue({ hasValue: false }, 42);
        });
    });

    await t.step('throws when value is not equal', () => {
        assertThrows(() => {
            assertSomeValue({ hasValue: true, value: 42 }, 0);
        });
    });

    await t.step('does not throw when value is equal', () => {
        assertSomeValue({ hasValue: true, value: 42 }, 42);
    });
});

Deno.test('.isOption', async (t) => {
    await t.step('returns false when is not an Option', () => {
        const result: unknown = 42;
        const isOptionResult = isOption(result);
        assertEquals(isOptionResult, false);
    });

    await t.step('returns true when is a Some', () => {
        const result: unknown = { hasValue: true, value: 42 };
        const isOptionResult = isOption(result);
        assertEquals(isOptionResult, true);
    });

    await t.step('returns true when is a None', () => {
        const result: unknown = { hasValue: false };
        const isOptionResult = isOption(result);
        assertEquals(isOptionResult, true);
    });
});
