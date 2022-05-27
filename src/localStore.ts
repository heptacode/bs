import { prependPrefix } from '@/modules/prependPrefix';
import { StateListener, StoreOptions } from '@/types';

export function useLocalStore(storeOptions?: StoreOptions) {
  const listeners: Set<StateListener> = new Set();

  /**
   * Add/Update an item
   *
   * @param key The key of item
   * @param value The value of item
   */
  function set<T = any>(key: string, value: T): void {
    window.localStorage.setItem(
      prependPrefix(key, storeOptions),
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  /**
   * Get an item
   *
   * @param key The key of item
   * @param fallbackValue Default placeholder if value doesn't exists
   */
  function get<T = any>(key: string, fallbackValue?: T): T {
    const value = window.localStorage.getItem(prependPrefix(key, storeOptions));
    if (value === null || value === undefined) {
      return fallbackValue as T;
    } else if (typeof JSON.parse(JSON.stringify(value)) === 'string') {
      return JSON.parse(JSON.stringify(value)) as T;
    }

    return JSON.parse(value) as T;
  }

  /**
   * Add a listener to state change
   *
   * @param listener This will fire on state change
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

  return { set, get, subscribe, unsubscribeAll, clear };
}
