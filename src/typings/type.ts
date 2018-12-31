type TS = string;

interface RandomObject {
  // should only be modifiable when an object is first created
  readonly asdasd: {
    a: number;
  };
  readonly fjfjg: Array<number>;
  mdmdmf: ReadonlyArray<number>;
  readonly jshdf: ReadonlyArray<number>;

  skdjkfjkf: number;
};

let ro: RandomObject = {
  asdasd: {
    a: 1,
  },
  fjfjg: [1, 2, 3, 4, 5],
  mdmdmf: [1, 2, 3],
  jshdf: [0, 9, 1],
  skdjkfjkf: 123,
};

// CAN change value
ro.asdasd.a = 123;

// BUT can NOT assign
// ro.asdasd = { a: 123 };

// CAN change item's value
ro.fjfjg[1] = 23;

// CAN re-assign array
ro.mdmdmf = [];
// can NOT change item's value
// ro.mdmdmf[0] = 123;

// can NOT re-assign
// ro.jshdf = [];
// can NOT change item's value
// ro.jshdf[1] = 222;

// can NOT re-assign
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

// Class will be transpiled to JS code, but interface won't
class RandomClass {
  sjdjf: string;
  dmvvjf: number;
}

let rc = new RandomClass();

rc.sjdjf = '1asdasd';
rc.dmvvjf = 1823;