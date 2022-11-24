import { useLocalStore } from '@/.';

interface LocalStore {
  key1: string;
  key2: boolean;
  test: string;
}

const { set, get, subscribe } = useLocalStore<LocalStore>({
  prefix: 'test',
  defaultValue: { key1: 'default string value', key2: true },
});

set<'key2'>('key2', false);
set<'test'>('test', 'asdf');
get<'test'>('test');
subscribe((key, newState) => console.log(key, newState));
