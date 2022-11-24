/**
 * State Listener
 *
 * @param key The key of item
 * @param newState New value of item
 * @param oldState Old value of item
 */
export type StateListener<T = any> = (key: string | null, newState: T, oldState?: T) => void;

/**
 * StoreOptions
 *
 * @member prefix The prefix of store item
 */
export interface StoreOptions<T = any> {
  prefix?: string;
  defaultValue?: Partial<T>;
}
