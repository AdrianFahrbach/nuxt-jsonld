import { computed } from 'vue';
import type { JsonLD, JsonLDFunc } from '../types';
import { useHead } from '@unhead/vue';
import { Thing } from 'schema-dts';

const isFunc = <T extends Thing = Thing>(json: JsonLD<T> | JsonLDFunc<T>): json is JsonLDFunc<T> =>
  typeof json === 'function';

export const useJsonld = <T extends Thing = Thing>(json: JsonLD<T> | JsonLDFunc<T>) => {
  if (!json) {
    return;
  }

  const jsonComputed = computed(() => (isFunc(json) ? json() : json));
  useHead(() => {
    if (!jsonComputed.value) {
      return {};
    }
    return {
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonComputed.value, null, ''),
        },
      ],
    };
  });
};
