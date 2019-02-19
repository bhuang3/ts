// Intersection Types: combines multiple types into one. This allows you to add together existing types to get a
// single type that will have ALL members.
interface III1 {
  a: string;
};
class III2 {
  //
  // If it's private, iiii would have error:
  // Property 'b' is private in type 'III2' but not in type '{ a: string; b: string; }'
  //
  // private b: string;

  b: string
};

let iiii: III1 & III2 = {
  a: '1',
  b: '2',
};


// Union Types: a value that can be on either of types, BUT we can ONLY access members that are common to all
// types in the union.
interface UUUU1 {
  a: string;
};
class UUUU2 {
  a: string;
  private b: string;
  c: string;
};

let uuuuu: UUUU1 | UUUU2 = {
  a: '123123',
  b: '',
};
function uuuuuf(val: UUUU1 | UUUU2) {
  console.log(val.a);
  // console.log(val.b); // Error, b is member of UUUU2 only.

  if ((<UUUU2>val).c || (val as UUUU2).c) {
    // Type Assertion
    console.log((val as UUUU2).c); // Still need type assertion
    console.log((<UUUU2>val).c); // Still need type assertion
  }

  // if (val is UUUU2) { // Error, since type predicate could only be used as return type of function.
  //
  if (is2(val)) {
    // Under type guard, once we perform the check, we could know the type
    console.log(val.c); // We already know the type, don't need to perform type assertion
  } else {
    // It not only knows that in `if`, but also knows that in `else`
    console.log(val.a);
  }

  // Typescript recognizes `typeof` as Type Guard as well
  if (typeof val === 'number') {
    console.log(val / 1);
  }

  // Typescript recognizes `instanceof` as Type Guard as well
  if (val instanceof UUUU2) {
    console.log(val.c);
  }
}

// Type Guard: A type guard is some expression that performs a RUNTIME check that guarantees the type in some scope
// It returns a `type predicate`: `val is UUUU2`
function is2(val: UUUU1 | UUUU2): val is UUUU2 {
  return (val as UUUU2).c !== undefined;
}


// Nullable types: `null` and `undefined` are assignable to anything.
//
// --strictNullChecks:
//  1. when you declare a variable, it doesn't automatically include `null` or `undefined`;
//  2. optional function parameter or object property automatically add `| undefined` rather than `| undefined | null`
//
let nullundefined1: string;

// Error, because of `--strictNullChecks` flag
// nullundefined1 = null;
// nullundefined1 = undefined;

function nullundefinedfff(a?: string) {}

// Error, because of `--strictNullChecks` flag
// nullundefinedfff(null);
nullundefinedfff(undefined);


// Type Alias: it doesn't actually create a new type - it creates a new name to refer to that type.
// It can also be generic
type TTT1 = string;
type TTT2 = III1 | III2;
type TTT3 = {
  a: string;
  b: string;
};
type TTT4<T> = {
  a: T;
};
type TTT5<T> = {
  b: TTT4<T>;
};
type TTT6<T> = T & {
  c: TTT4<T>;
};

type LinkedNodeLN1<T> = T & {
  next: LinkedNodeLN1<T>;
};

// Type alias cannot be extended or implemented from.
// Error
// class dkfjgkg extends TTT4 {}


// Singleton Types: enum member types as well as numeric/string literal types.
// `singleton types` and `literal types` are interchangebly.
enum STEEE1 {
  A, B, C,
}

interface ST1 {
  a: STEEE1.A; // enum member types
  b: 1; // numeric literal types
  c: 'asdasd'; // string literal types
}
let st1: ST1 = {
  a: 11,
  // b: 2, // Error
  b: 1,
  // c: '', // Error
  c: 'asdasd',
}


// Discriminated Unions: combine `singleton types`, `union types`, `type guards` and `type aliases`.
// It's useful in functional programming.
// Three ingredients:
// 1. Types that have a COMMON and SINGLETON type property. -- discriminant (or tag)
// 2. Alias that takes the union of these types. -- union, alias
// 3. Type guards on COMMON and SINGLETON type property -- type guards

interface DU1 {
  a: 'a1'; // COMMON and SINGLETON type property. -- discriminant
  b: number;
};
class DU2 {
  a: STEEE1.A; // COMMON and SINGLETON type property. -- discriminant
  c: number;
};
interface DU3 {
  a: '123123'; // COMMON and SINGLETON type property. -- discriminant
  d: number;
}

type DU123Alias = DU1 | DU2 | DU3; // the union of these types. -- union, alias

function isDU1(val: DU123Alias): val is DU1 {
  return val.a === 'a1'; // type guards
};

function isDU2(val: DU123Alias): val is DU2 {
  return val.a === STEEE1.A; // type guards
};

function isDU3(val: DU123Alias): val is DU3 {
  return val.a === '123123'; // type guards
};

function JFKGLGJ1(val: DU123Alias): number {
  if (isDU1(val)) {
    return val.b; // type of val is DU1
  } else if (isDU2(val)) {
    return val.c; // type of val is DU2
  } else if (isDU3(val)) { // NOTE: if (isDU3(val)) is NOT necessary.
    return val.d; // type of val is DU3
  } else {
    return val; // type of val is `never`
  }
}

function JFKGLGJ2(val: DU123Alias): number {
  switch (val.a) {
    case 'a1':
      return val.b;
    case STEEE1.A:
      return val.c;
    case '123123':
      return val.d;
    default:
      return val; // type of val is `never`
  }
}


// Polymorphic `this` types: it represents a type that is the subtype of the containing class or interface.
class THISSUPER {
  public superTHIS(): this {
    return this;
  }

  public super(): THISSUPER {
    return this;
  }
};
class THISCHILD extends THISSUPER {
  public childTHIS(): this {
    return this;
  }

  public child(): THISCHILD {
    return this;
  }
};

// Since it's polymorphic `this` type, so you can extend it and the new class CAN use OLD methods with NO changes.
let this1: THISCHILD = new THISCHILD();
// you can use new method after use old method
this1.childTHIS().superTHIS().superTHIS().childTHIS(); // and so on ... ...

let this2: THISCHILD = new THISCHILD();

this2.child().super();
this2.childTHIS().super();

// Error, can NOT use new method after using old method.
//
// this2.super().child();
// this2.super().childTHIS();


// Index Types
// 1. index type query operator: `keyof T` (is UNION of known).
// It will automatically reflect the changes if we add another property.
//
interface IT11 {
  adasd: string;
  dkfjg: number;
};
class IT12 {
  ghh: string;
  pqoe: number;
};

let it1: keyof IT11; // interchangeable with `"adasd" | "dkfjg"`
let it2: keyof IT12; // interchagneable with `"ghh" | "pqoe"`

// 2. indexed access operator: `T[K]`
function IUYT<T, K extends keyof T>(obj: T, prop: K): T[K] {
  return obj[prop];
}


// Mapped Types: create new types based on old types
interface MTT {
  dlfjg: number;
};
interface MTTT {
  dkfjjg: string;
  fkghh: number;
  gllh: MTT;
};
interface MTT1 {
  dklg: string;
  fkgjh: number;
  pkp: MTTT;
};

// create readonly version for `MTT1`
type ReadonlyMTTT<T> = {
  readonly [P in keyof T]: ReadonlyMTTT<T[P]>; // nested
};

type OptionalMTTT<T> = {
  [P in keyof T]?: OptionalMTTT<T[P]>; // nested
};

let mtttReadonly: ReadonlyMTTT<MTT1> = {
  dklg: '',
  fkgjh: 123,
  pkp: {
    dkfjjg: '44',
    fkghh: 1,
    gllh: {
      dlfjg: 123,
    }
  },
};

//
// Error for all below cases, since it's readonly
//
// mtttReadonly.dklg = '123';
// mtttReadonly.fkgjh = 333;
// mtttReadonly.pkp = {};
// mtttReadonly.pkp.dkfjjg = '';
// mtttReadonly.pkp.fkghh = 12312;
// mtttReadonly.pkp.gllh.dlfjg = 12312;

// each property is optional.
let mtttOptional: OptionalMTTT<MTT1> = {
  // dklg: '',
  fkgjh: 123,
  pkp: {
    dkfjjg: '44',
    // fkghh: 1,
  },
};

// Conditional Types: select one of two possible types based on a condition expressed as a type relationship test
//
// T extends U ? X : Y
//
// A conditional type is either resolved to X or Y, or deferred because the
// condition depends on one ore more type variables.
//

// Immediately resolved
type CTT11<T> = T extends string ? string : number;

let ct1: CTT11<string>; // ct1 is `string`
let ct2: CTT11<{}>; // ct2 is `number`

// Deferred
declare function fffD<T>(x: T): T extends string ? string : boolean;

function FDDF<U>(x: U) {
  let a = fffD(x);

  // Error, since x is not determined yet.
  // let bsss: string = a;
  // let bbbb: boolean = a;
  let bsbs: string | boolean = a;
}


// Distributive Conditional Types: automatically distributed over union types during instantiation
//
// T extends U ? X : Y with the type argument A | B | C for T is resolved as
//
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
//
