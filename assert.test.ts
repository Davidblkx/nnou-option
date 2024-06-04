import { assertNone, assertSome } from './assert.ts';

import { assertThrows } from '@std/assert';

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
