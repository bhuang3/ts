type TS = string;

interface RandomObject {
  // should only be modifiable when an object is first created
  readonly asdasd: {
    a: number;
  };
  readonly fjfjg: Array<number>;

  skdjkfjkf: number;
};

let ro: RandomObject = {
  asdasd: {
    a: 1,
  },
  fjfjg: [1, 2, 3, 4, 5],
  skdjkfjkf: 123,
};

// CAN change value
ro.asdasd.a = 123;

// BUT CANNOT assign
// ro.asdasd = { a: 123 };

// CAN change value
ro.fjfjg[1] = 23;

// BUT CANNOT assign
// ro.fjfjg = [1, 2, 3];

interface RandomFunction {
  (a: number, b: number): boolean;
};

let rf: RandomFunction = (n1: number, n2: number) => {
  return n1 > n2;
}

interface IndexError {
  /*
  * There are two types of supported index signatures: string and number. It is possible to
  * support both types of indexers, but the type returned from a numeric indexer must be a
  * subtype of the type returned from the string indexer.
  */
  // [x : number]: TS; // error, must be subtype of `RandomObject`
  [y : string]: RandomObject;
}