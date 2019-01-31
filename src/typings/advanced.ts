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
  a: 123123; // COMMON and SINGLETON type property. -- discriminant
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
  return val.a === 123123; // type guards
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