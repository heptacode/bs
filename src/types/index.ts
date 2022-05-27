/**
 * State Listener
 *
 * @param key The key of item
 * @param newState New value of item
 * @param oldState Old value of item
 */
export type StateListener = (key: string, newState: State, oldState: State) => void;

/**
 * State
 */
export type State = { [key: string]: any };

/**
 * StoreOptions
 *
 * @member prefix The prefix of store item
 */
export interface StoreOptions {
  prefix?: string;
}
