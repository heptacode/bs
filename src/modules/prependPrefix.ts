import { StoreOptions } from '@/types';

export function prependPrefix(key: string | number | symbol, storeOptions?: StoreOptions) {
  if (storeOptions?.prefix) {
    return `${storeOptions?.prefix}:${String(key)}`;
  }
  return String(key);
}
