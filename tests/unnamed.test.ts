import { useLocalStore } from '@/useLocalStore';

describe('Unnamed Test', () => {
  it('Unnamed Test', () => {
    const localStore = useLocalStore<{ key1: string; key2: boolean }>({
      prefix: '1',
      defaultValue: { key1: 'default string value', key2: true },
    });

    localStore.set('key1', 'change string value');
    localStore.get('key2', false);
    const unsubscribe = localStore.subscribe((key, newState, oldState) =>
      console.log(key, newState, oldState)
    );
  });
});
