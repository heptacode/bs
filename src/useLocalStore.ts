import { prependPrefix } from '@/modules/prependPrefix';
import { StateListener, StoreOptions } from '@/types';

export function useLocalStore<T = any>(storeOptions?: StoreOptions<T>) {
  const listeners: Set<StateListener> = new Set();

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
   * @param fallbackValue Default placeholder if value doesn't exists
   */
  function get<KeyType extends keyof T, ValueType = T[KeyType]>(
    key: KeyType,
    fallbackValue?: ValueType
  ): ValueType {
    const value = window.localStorage.getItem(prependPrefix(String(key), storeOptions));
    if (value === null || value === undefined) {
      return fallbackValue as ValueType;
    } else if (typeof JSON.parse(JSON.stringify(value)) === 'string') {
      return JSON.parse(JSON.stringify(value)) as ValueType;
    }

    return JSON.parse(value) as ValueType;
  }

  /**
   * Add a listener to state change
   *
   * @param listener This will fire on state change
   * @returns This will delete your listener
   */
  function subscribe(listener: StateListener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  /**
   * Remove all listeners
   */
  function unsubscribeAll() {
    listeners.clear();
  }

  /**
   * Clear all states
   */
  function clear() {
    window.localStorage.clear();
  }

  function resetDefault() {
    if (storeOptions?.defaultValue) {
      Object.keys(storeOptions.defaultValue).forEach(key => {
        set(key as keyof T, storeOptions[key]);
      });
    }
  }

  resetDefault();

  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.storageArea === localStorage) {
      listeners.forEach((listener: StateListener) =>
        listener(
          event.key!,
          JSON.parse(JSON.stringify(event.newValue)),
          JSON.parse(JSON.stringify(event.oldValue))
        )
      );
    }
  });

  return { set, get, subscribe, unsubscribeAll, resetDefault, clear };
}
