import { assertEquals } from '@std/assert';

import { maybe, none, some } from './option.ts';
import { flatten, map, mapOr } from './map.ts';

Deno.test('.map', async (t) => {
    await t.step('maps a Some value', () => {
        const option = some(42);
        const mapped = map(option, (value) => value * 2);
        assertEquals(mapped, some(84));
    });

    await t.step('maps a None value', () => {
        const option = none();
        const mapped = map<number, number>(option, (value) => value * 2);
        assertEquals(mapped, none());
    });

    await t.step('maps a Some value to a None value', () => {
        const option = some(42);
        const mapped = map(option, () => none());
        assertEquals(mapped, none());
    });

    await t.step('maps a Some value to a Some value', () => {
        const option = some(42);
        const mapped = map(option, (value) => maybe(value * 2));
        assertEquals(mapped, some(84));
    });
});

Deno.test('.mapOr', async (t) => {
    await t.step('maps a Some value', () => {
        const option = some(42);
        const mapped = mapOr(option, (value) => value * 2, () => 0);
        assertEquals(mapped, 84);
    });

    await t.step('maps a None value', () => {
        const option = maybe<number>();
        const mapped = mapOr(option, (value) => value * 2, () => 0);
        assertEquals(mapped, 0);
    });
});

Deno.test('.flatten', async (t) => {
    await t.step('flattens a Some value', () => {
        const option = some(some(42));
        const flattened = flatten(option);
        assertEquals(flattened, some(42));
    });

    await t.step('flattens a None value', () => {
        const option = none();
        const flattened = flatten(option);
        assertEquals(flattened, none());
    });
});
