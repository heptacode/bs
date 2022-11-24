export function parseString<T>(value: string | null, fallbackValue?: T): T {
  if (value === null || value === undefined) {
    return fallbackValue as T;
  } else if (value === 'true' || value === 'false') {
    return !!(value === 'true') as unknown as T;
  } else if (typeof JSON.parse(JSON.stringify(value)) === 'string') {
    return JSON.parse(JSON.stringify(value)) as T;
  }
  return JSON.parse(value) as T;
}
