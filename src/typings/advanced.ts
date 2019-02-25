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

type KdlfjtkT = {
  [key: string]: string;
  [key: number]: string;
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

type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed01<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;
//
// Error, since if T is array, `T[string]` is not allowed.
//
// type Boxed02<T> = T extends any[] ? BoxedArray<T[string]> : BoxedValue<T>;

type Boxed11<T> = T extends any ? BoxedArray<T[string]> : BoxedValue<T>;
type Boxed12<T> = T extends any ? BoxedArray<T[number]> : BoxedValue<T>;
type Boxed13<T> = T extends { [key: string]: string } ? BoxedArray<T[string]> : BoxedValue<T>;
type Boxed14<T> = T extends { [key: number]: string } ? BoxedArray<T[number]> : BoxedValue<T>;
//
// Error, since T is Object using number as the type for key
//
// type Boxed15<T> = T extends { [key: number]: string } ? BoxedArray<T[string]> : BoxedValue<T>;

let fdd: Boxed01<number[]>;


// Distributive Conditional Types: automatically distributed over union types during instantiation
//
// T extends U ? X : Y with the type argument A | B | C for T is resolved as
//
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
//

// The distributive property of conditional types can conveniently be used to filter union type
type Diff<U, T> = U extends T ? never : U;

// The type is 'b' | 'd', it filters out 'a' and 'c'
let djfhgDiff: Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'e'>;

type __NonNullable__<T> = T extends null | undefined ? T : T;

function _djfhgk_fun_<T>(prop1: T, prop2: __NonNullable__<T>) {
  prop1 = prop2;
  console.log(prop1, prop2);
  // prop2 = prop1; // Error, could not assign
}

_djfhgk_fun_(123, 123);
_djfhgk_fun_('', '');
_djfhgk_fun_(null, null); // still could pass null
_djfhgk_fun_(undefined, undefined); // still could pass undefined


// Conditional types are particularly useful when combined with mapped types
//
// Don't forget `[keyof T]`
//
type __FunctionPropertyNames__<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

interface fkfjgkg {
  dkfjgk(): void;
  gkhjh: string;
  fkgjh: number;
  fjgj(prop: string): boolean;
};

let __fff: __FunctionPropertyNames__<fkfjgkg>;

__fff = 'dkfjgk';
__fff = 'fjgj';
// __fff = 'fkgjh' // Error


// Similar to union and intersection types, conditional types are NOT permitted to
// reference themselves recursively, since they're NOT generic type
//
// Error
// type __BoArray02<T> = T extends any[] ? __BoArray02<T> : T;
//

// Generic types can reference them recursively
type __BoArray01<T> = { array: __BoArray01<T>[] };
interface __BoType {
  name: string;
}

let _bo: __BoArray01<__BoType> = {
  array: [ { array: [ { array: [ ] } ] } ],
}


// WITHIN the `extends` clause of a conditional type, it's possible to have `infer` declaration
//
// get function's return type
type __ReturnType01<T> = T extends (...args: any[]) => infer R ? R : T;

function __fffff01(a: string, b: number): boolean { return false };
function __fffff02(a: string, b: number): string { return 'selkkfjg' };

// boolean
let __jfghgj01: __ReturnType01<typeof __fffff01>;
// string
let __jfghgj02: __ReturnType01<typeof __fffff02>;

// Error, MUST have `infer`
// type __ReturnType<T> = T extends (...args: any[]) => R ? R : T;

// The following two cases are different from each other;
//
// It makes it through to the Javascript, and it will use the Javascript `typeof` operator at runtime
// and produce a string, eg. 'boolean' | 'string' | 'number' | 'function' | 'object' | 'undefined' | ...
//
// The type of `__typeof__fffff0101` is 'boolean' | 'string' | 'number' | 'function' | 'object' | 'undefined' | ...
// But since `__fffff01` is a function, the eventual value assigned to it would be 'function'
//
let __typeof__fffff0101 = typeof __fffff01;

//
// It will be erased after being compiled, and it's using the Typescript type query operator
//
// __typeof__fffff0102 is `(a: number, b: number) => boolean`
type __typeof__fffff0102 = typeof __fffff01; // or used in type parameter position: __ReturnType01<typeof __fffff02>


//
// Covariance vs Contravariance: https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance
//
// Covariance: C is subtype of S ---> ( (arg: T) => C ) is subtype of ( (arg: T) => S )
//
// Contravariance: C is subtype of S ---> ( (arg: S) => T ) is subtype of ( (arg: C) => T )

// Produce UNION type since they are at COVARIANCE positions. **(ONLY realated to POSITION)**
type __ReturnType02<T> = T extends { a: infer U, b: infer U } ? U : never;

// the type is `string`
let kfjg01: __ReturnType02<{ a: string; b: string}>;
// UNION: the type is `string | number`
let kfjg02: __ReturnType02<{ a: string; b: number }>;


// Produce INTERSECTION type since they are at CONTRAVARIANCE positions.
type __ReturnType03<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : T;

// the type is `string`
let kfjg03: __ReturnType03<{ a: (ax: string) => void; b: (bx: string) => void }>;
// INTERSECTION: the type is `string & number`
let kfjg04: __ReturnType03<{ a: (ax: string) => void; b: (bx: number) => void }>;


// It is NOT possible to use `infer` declarations in constraint clauses for regular type parameters.
//
// Error, 'infer' declarations are ONLY permitted in the 'extends' clause of a conditional type.
//
// type __ReturnType04<T extends { a: infer U }> = U;
