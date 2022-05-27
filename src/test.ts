import { useLocalStore } from './localStore';

const localStore = useLocalStore({ prefix: '1' });

const unsubscribe = localStore.subscribe(console.log);
localStore.set<boolean>('', true);
localStore.get<string>('');
localStore.subscribe((key, newState, oldState) => console.log(key, newState, oldState));
