import { FlattenedState, InputTypes, NestedObject } from "../../types";

export const flatten = (item: Object | any[] | InputTypes, keyString: string = ""): FlattenedState => {
  let result: FlattenedState = {};

  if (Array.isArray(item)) {
    item.forEach((val, index) => {
      const newKey = `${keyString}${keyString === "" ? "" : "."}${index.toString()}`;
      result = { ...result, ...flatten(val, newKey) };
    });
  }

  else if (typeof item === "object") { // 2
    let key: keyof Object;
    for (key in item) {
      const newKey = `${keyString}${keyString === "" ? "" : "."}${key}`;
      result = { ...result, ...flatten(item[key], newKey) };
    };
  }

  else result = { [keyString]: item }

  return result;
};

const embed = (
  result: NestedObject | any[] | undefined | InputTypes,
  substrings: string[],
  value: InputTypes
): NestedObject | any[] | InputTypes => {
  const stringKey = substrings.shift();

  if (stringKey === undefined) return value;

  const position = parseInt(stringKey, 10);

  const isObject = isNaN(position);

  if (result === undefined) result = isObject ? {} : [];

  if (isObject) {
    (result as NestedObject)[stringKey] = embed((result as NestedObject)[stringKey], substrings, value);
    return result;
  }
  else {
    (result as any[])[position] = embed((result as any[])[position], substrings, value);
    return result;
  };
};

export const unflatten = (state: FlattenedState): NestedObject => {
  let result: NestedObject | any[] | undefined | InputTypes = undefined;
  
  let key: keyof FlattenedState;
  for (key in state) {
    const value = state[key];

    const substrings = key.split(".");

    result = embed(result, substrings, value);
  };

  return result as NestedObject;
};