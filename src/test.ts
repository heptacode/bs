import { useLocalStore } from './localStore';

const localStore = useLocalStore<{ key1: string; key2: boolean }>({
  prefix: '1',
  defaultValue: { key1: 'default string value', key2: true },
});

const unsubscribe = localStore.subscribe(console.log);
localStore.set('key1', 'change string value');
localStore.get('key2', false);
localStore.subscribe((key, newState, oldState) => console.log(key, newState, oldState));
