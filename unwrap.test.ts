import { assertEquals } from '@std/assert';

import { none, some } from './option.ts';
import { unwrap } from './unwrap.ts';

Deno.test('.unwrap', async (t) => {
    await t.step('unwraps a Some value', () => {
        const option = some(42);
        const value = unwrap(option, 0);
        assertEquals(value, 42);

        const value2 = unwrap(option, () => 0);
        assertEquals(value2, 42);
    });

    await t.step('unwraps a None value', () => {
        const option = none();
        const value = unwrap(option, 0);
        assertEquals(value, 0);

        const value2 = unwrap<number>(option, () => 0);
        assertEquals(value2, 0);
    });
});
