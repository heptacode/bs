import { StoreOptions } from '@/types';

export function prependPrefix(key: string, storeOptions?: StoreOptions) {
  if (storeOptions?.prefix) {
    return `${storeOptions?.prefix}:${key}`;
  }
  return key;
}
