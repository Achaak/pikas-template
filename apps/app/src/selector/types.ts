export type CheckSelectKeys<T, U> = {
  [K in keyof T]: K extends keyof U ? T[K] : never;
};
