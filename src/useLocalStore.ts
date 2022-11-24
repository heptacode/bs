import { parseString } from '@/modules/parseString';
import { prependPrefix } from '@/modules/prependPrefix';
import { StateListener, StoreOptions } from '@/types';

export function useLocalStore<T = any>(storeOptions?: StoreOptions<T>) {
  const listeners: Set<StateListener<T>> = new Set();

  /**
   * Add/Update an item
   *
   * @param key The key of item
   * @param value The value of item
   */
  function set<KeyType extends keyof T, ValueType = T[KeyType]>(
    key: KeyType,
    value: ValueType
  ): void {
    window.localStorage.setItem(
      prependPrefix(String(key), storeOptions),
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  /**
   * Get an item
   *
   * @param key The key of item
   * @param fallbackValue (Optional) Default placeholder if value doesn't exists
   * @returns Requested value from key or fallback value if unavailable
   */
  function get<KeyType extends keyof T, ValueType = T[KeyType]>(
    key: KeyType,
    fallbackValue?: ValueType
  ): ValueType {
    const value = window.localStorage.getItem(prependPrefix(key, storeOptions));
    return parseString(value, fallbackValue);
  }

  /**
   * Add a listener to state change
   *
   * @param listener This will fire on state change
   * @returns A function to delete the listener
   *
   * @example
   * ```ts
   * const unsubscribe = localStore.subscribe((key, newState, oldState) =>
   *   console.log(key, newState, oldState)
   * );
   * ```
   */
  function subscribe(listener: StateListener<T>): () => boolean {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  /**
   * Remove all listeners
   */
  function unsubscribeAll(): void {
    listeners.clear();
  }

  /**
   * Clear all states
   */
  function clear(): void {
    window.localStorage.clear();
  }

  /**
   * Initializer
   *
   * @description Set default values to store
   */
  function init(): void {
    if (storeOptions?.defaultValue) {
      Object.keys(storeOptions.defaultValue).forEach(key => {
        set(key as keyof T, storeOptions[key]);
      });
    }
  }

  init();

  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.storageArea === localStorage) {
      listeners.forEach((listener: StateListener) =>
        listener(event.key!, parseString(event.newValue), parseString(event.oldValue))
      );
    }
  });

  return { set, get, subscribe, unsubscribeAll, init, clear };
}
