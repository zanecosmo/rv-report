// TYPES
interface Category {
  categoryName: string,
  rows: Row[],
  notes: string
};

interface Row {
  lineItem: string,
  pass: boolean,
  fail: boolean,
  notes: string
};

type Form = Category[];

interface Report {
  id: string,
  customerId: string,
  date: Date,
  form: Form
};

type InputTypes = string | boolean | Date;
const isInputType = (any: any): any is InputTypes =>  {
  return (typeof any === "string" || typeof any === "boolean" || any instanceof Date) ? true : false;
};

interface FlattenedState {
  [key: string]: InputTypes
};

interface NestedObject { [key: string]: any }

// TEST DATA
const testReport: Report = {
  id: "",
  customerId: "",
  date: new Date(),
  form: [
    {
      categoryName: "electrical",
      rows: [
        {
          lineItem: "plugs",
          pass: false,
          fail: false,
          notes: ""
        },
        {
          lineItem: "wires",
          pass: false,
          fail: false,
          notes: ""
        }
      ],
      notes: ""
    },
    {
      categoryName: "hvac",
      rows: [
        {
          lineItem: "vents",
          pass: false,
          fail: false,
          notes: ""
        },
        {
          lineItem: "duct-tape",
          pass: false,
          fail: false,
          notes: ""
        }
      ],
      notes: ""
    }
  ]
};

// FUNCTIONS
const flatten = (item: Object | any[] | InputTypes, keyString: string = ""): FlattenedState => {
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

const unflatten = (state: FlattenedState) => {
  let result: NestedObject | any[] | undefined | InputTypes = undefined;
  
  let key: keyof FlattenedState;
  for (key in state) {
    const value = state[key];

    const substrings = key.split(".");

    result = embed(result, substrings, value);
  };

  return result;
};

// console.log(flatten(testReport.form));

// TESTS
// const nested1 = [1, 2, 3, 4];
// const nested2 = [1, 2, {a: 1, b: 2}];
// const nested3 = {a: [{a: 1}, {a: 1}], b: 4};

// console.log(nested1);
// console.log(nested2);
// console.log(nested3);

// const flattened1 = flatten(nested1);
// const flattened2 = flatten(nested2);
// const flattened3 = flatten(nested3);

// console.log(flattened1); //   =>   { [0]: 1, [1]: 2, [2]: 3, [3]: 4 }
// console.log(flattened2); //   =>   { [0]: 1, [1]: 2, [2.a]: 1, [2.b]: 2 }
// console.log(flattened3); //   =>   { [a.0.a]: 1, [a.1.a]: 1, [b]: 4 }

// const unflattened1 = unflatten(flattened1);
// const unflattened2 = unflatten(flattened2);
// const unflattened3 = unflatten(flattened3);

// console.log(unflattened1);
// console.log(unflattened2);
// console.log(unflattened3);