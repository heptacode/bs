import { prependPrefix } from '@/modules/prependPrefix';
import { StateListener, StoreOptions } from '@/types';

export function useSessionStore(storeOptions?: StoreOptions) {
  const listeners: Set<StateListener> = new Set();

  function set<T = any>(key: string, value: T): void {
    window.sessionStorage.setItem(
      prependPrefix(key, storeOptions),
      typeof value === 'string' ? String(value) : JSON.stringify(value)
    );
  }

  function get<T = any>(key: string, fallbackValue?: T): T {
    const value = window.sessionStorage.getItem(prependPrefix(key, storeOptions));
    if (value === null || value === undefined) {
      return fallbackValue as T;
    } else if (typeof JSON.parse(JSON.stringify(value)) === 'string') {
      return JSON.parse(JSON.stringify(value)) as T;
    }

    return JSON.parse(value) as T;
  }

  function subscribe(listener: StateListener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function unsubscribeAll() {
    listeners.clear();
  }

  function clear() {
    window.sessionStorage.clear();
  }

  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.storageArea === sessionStorage) {
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
