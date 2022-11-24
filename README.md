# BS

## Installation

```bash
yarn add @heptacode/bs # or npm i @heptacode/bs
```

## Quick Start

```tsx
import { useLocalStore } from '@heptacode/bs';

interface LocalStore {
  key1: string;
  key2: boolean;
}

const { set, get } = useLocalStore<LocalStore>();

set<'key1'>('key1', 'string');
set<'key2'>('key2', false);
```

## Examples

```tsx
const localStore = useLocalStore<LocalStore>();

localStore.set<'key1'>('key1', 'string');
localStore.set<'key2'>('key2', false);
```

```tsx
const { set, get, subscribe } = useLocalStore<LocalStore>({
  prefix: 'test',
  defaultValue: { key1: 'default string value', key2: true },
});

set<'key1'>('key1', 'string');
set<'key2'>('key2', false);
const unsubscribe = subscribe((key, newState, oldState) => console.log(key, newState, oldState));
```
