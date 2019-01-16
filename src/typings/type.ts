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
  // Tuple type: the order does matter
  jdjdjf: [ number, string, boolean ];
  // Can only assign undefined or null to
  mvng: void;
  // both undefined and null actually have their own types named `undefined` and `null` respectively
  pld: undefined;
  jdbqq: null;
  // lowercase one represents all `non-primitive` types
  smallO: object;
  // uppercase one describes functionality that is common to all javascript objects
  // for example: { toString(): string; hasOwnProperty(v: string): boolean; }
  bigO: Object;
  // It describes an object that has NO members on its own
  literalO: {};
}

let rc = new RandomClass();

rc.sjdjf = '1asdasd';
rc.dmvvjf = 1823;
// rc.jdjdjf = [ true, 123, '' ];
rc.jdjdjf = [ 1, '', true ];
// rc.mvng = 123;
rc.mvng = null;
rc.mvng = undefined;

rc.smallO = new Date();
// rc.smallO = '';
// rc.smallO = 123;
// rc.smallO = false;
rc.smallO.hasOwnProperty('asdasd');

rc.bigO = new Date();
rc.bigO = '';
rc.bigO = 123;
rc.bigO = false;
rc.bigO.hasOwnProperty('123123');

rc.literalO = {}
rc.literalO = new Date();
rc.literalO = 123;
rc.literalO.toString();
rc.literalO.hasOwnProperty('');

enum Color {
  RED, BLUE, YELLOW,
};

let c1: Color = 123;
let c2: Color = Color.RED;

/*
 * 1. The `never` type is a subtype of, and assignable to, every type.
 * 2. NO type is a subtype of, or assignable to, never (except never itself).
 * 3. Even `any` is NOT assignable to never.
 */
let nf1 = function(): never {
  throw 'this function never returns value';
};
let nfohoek: never;
let ojgjr: number = nfohoek;


// Type assertions are a way to tell the compiler “trust me, I know what I’m doing.”
// It has no runtime impact, and is used purely by the compiler
let s1: Object = 'asdasd';

// Type assertions have two forms. They are equivalent
let len1 = (<string>s1).length;
// Only as-style assertions are allowed while using with JSX
let len2 = (s1 as string).length;

