export const repeatKey = <T>(obj: T, key: keyof T) =>
  Object.fromEntries(
    Object.entries(obj as {})
      .filter(([k]) => k === key)
      .map(([k, v]) => [k, v]),
  );

export const genRandomByMinMax = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(genRandomByMinMax(0, arr.length))];

export const pickRandomObjKey = <T>(obj: T): keyof T => {
  const arr = Object.keys(obj as {});

  return pickRandom(arr) as keyof T;
};

// ? it represent the shape i always use in apps for dynamic category or anything the should be bind to a specific context like an existentialism book must be under philosophy or React must be under JavaScript
export const getValidSubCat = <
  T extends Record<string, Record<string, string>>,
  K extends keyof T,
>(
  obj: T,
  key: K,
): keyof T[K] => {
  const val = obj[key as keyof T];

  const subKey = pickRandomObjKey(val);

  return subKey;
};
