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

interface SubRandomObject extends RandomObject {
  dlfjgjhj: string;
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

// Defines a function interface
interface RandomFunction {
  (a: number, b: number): boolean;
};

// Defines an interface with a property whose type is function
interface RandomFunction2 {
  // They're equivalent
  fghh: (a: number, b: number) => boolean;
  dfkf(a: number, b: number): boolean;
};

let rf: RandomFunction = (n1: number, n2: number) => {
  return n1 > n2;
};

let rf2: RandomFunction2 = {
  fghh: rf,
  dfkf: rf,
};

interface MixedInterface {
  (a: number, b: number): boolean;
  djfg: number;
  fun: () => string;
};

let mi: MixedInterface = <MixedInterface>((n1: number, n2: number) => {
  return n1 > n2;
});

mi.djfg = 123;
mi.fun = () => { return '123123123'; }

let mi2: MixedInterface = <MixedInterface>({});

interface IndexError {
  /*
  * There are two types of supported index signatures: string and number. It is possible to
  * support both types of indexers, but the type returned from a numeric indexer must be a
  * subtype of the type returned from the string indexer.
  */
  [y : string]: RandomObject;

  // error, must be subtype of `RandomObject`
  // [x : number]: TS;

  // error, the type of 'name' is not a subtype of the indexer
  // name: string;

  name: SubRandomObject;
}

// Class will be transpiled to JS code, but interface won't
class RandomClass {
  private fggg: string;

  // Readonly properties must be initialized at their declaration or in the constructor.
  readonly rrrrr: string;

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

// Type assertions have two forms. They are equivalent.
let len1 = (<string>s1).length;
// Only as-style assertions are allowed while using with JSX.
let len2 = (s1 as string).length;


interface InterfaceWithNew {
  // constructor signature in interfaces are not implementable in classes.
  // It's ONLY for defining a 'new'-able function with specified typed arguments.
  // https://stackoverflow.com/questions/13407036/how-does-typescript-interfaces-with-construct-signatures-work
  new (id: string, name: string);
};

// A class has two types: the type of the static side and the type of the instance side.
// class ObjectImplementsInterface implements InterfaceWithNew {
//   constructor(id: string, name: string) {

//   }
// }

// When an interface type extends a class type it inherits the members of the class but not their implementations.
// RandomClass contains private members
interface InterfaceExtendClass extends RandomClass {}

/*
 * Interfaces inherit even the PRIVATE and PROTECTED members of a base class. That interface
 * type can only be implemented by that class or a subclass of it.
 */
// Error
// class ImplementExtendClass implements InterfaceExtendClass {}
class ExtendRandomClass extends RandomClass implements InterfaceExtendClass {}

class Cons {
  // id: string;
  // private name: string;

  // constructor(id: string, name: string) {
  //   this.id = id;
  //   this.name = name;
  // }
  // 
  // They're both equivalent.
  //
  constructor(readonly id: string, private name: string) {
    
  }

  getName() {
    return this.name;
  }
}

let ccccc: Cons = new Cons('this is for id', 'this is for name');
ccccc.id === 'this is id';
ccccc.getName() === 'this is for name';

function op(a: string, b: string = 'B') {
  console.log(`${a} ${b}`);
};

op('A'); // `A B`
op('A', undefined) // `A B`
op('A', null) // `A null`
// Error
// op('A', 'B', 'C')

// You could provide an explicit this parameter.
// `This` parameters are fake parameters that MUST be FIRST in the parameter list of a function.

interface ofkgjhType {
  str: string;
  num: number;
};

let ofkgjh = {
  str: 'string',
  num: 123,
  withoutThis: function() {
    return () => {
      // type of `this` is any
      console.log(this.str, this.num);
    };
  },
  withThis: function(this: ofkgjhType, param: any) {
    return () => {
      console.log(this.str, this.num, param);
    };
  },
};

let FF_ofkgjh = ofkgjh.withThis('kfkfk');
FF_ofkgjh(); // 'string', 123, 'kfkfk'