type LooseAutocomplete<T extends string> = T | Omit<string, T>;

interface SelfReference<T> {
  [key: string]: SelfReference<T>[] & T;
}
