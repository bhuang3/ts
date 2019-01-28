// Type compatibility in TypeScript is based on structual subtyping.
// It's based solely on their members, which is in contrast with typing of other languages.

// Rules for Typescript's structural type system:
//
// 1. Primitive & Object types: x is compatible with y, if y has at least the same members as x.
//
interface KSJFJG {
  name: string;
};

let KSJFJGx: KSJFJG;
let KSJFJGy = { name: 'dkkfkg', age: 1111 };
// Rule <1>
KSJFJGx = KSJFJGy;

// 2. Functions: x is assignable to y, each parameter in x must have a
// corresponding parameter in y with a compatible type.

// 3. When comparing functions for compatibility, optional and required parameters ARE interchangeable.
//
// 3.1. Extra optional parameters of the source type are NOT an error.
// 3.2. Optional parameters of the target type without corresponding parameters in the source type are NOT an error.
// 3.3. When a function has a rest parameter, it is treated as if it were an infinite series of optional parameters.
//
let fkfkgkF1 = function(a: number, b: string): number {
  return 0;
};
let fkfkgkF2 = function(a: number): number {
  return 0;
};
let fkfkgkF3 = function(b: number): boolean {
  return false;
};
let fkfkgkF4 = function(b: string): number {
  return 0;
};

// Ignoring extra function parameters is acutally quite common, for example, Array.forEach(...).
fkfkgkF1 = fkfkgkF2; // OK

// fkfkgkF1 = fkfkgkF3 // Error, return type is not compatible.
//
// fkfkgkF2 = fkfkgkF3 // Error, return type is not compatible.
// fkfkgkF2 = fkfkgkF4 // Error, parameter type is not compatible.


// When a function has overloads, each overload in the source type MUST be matched by a
// compatible signature on the target type
let kdjfjgTarget = {
  a: 'a',
  toString: function () {
      return this.a;
  },
};
let kdjfjgSource1 = {
  a: 'bb',
  b: 'bbb',
  toString: function () {
      return this.a + ' - ' + this.b;
  },
}
let kdjfjgSource2 = {
  a: 'cc',
  b: 'ccc',
  toString: function (c: string) {
      return this.a + ' - ' + this.b;
  },
}

kdjfjgTarget = kdjfjgSource1;
console.log(kdjfjgTarget.toString()); // bb - bbb

// Error, overloaded functions are not compatible
//
// kdjfjgTarget = kdjfjgSource2;
// kdjfjgSource1 = kdjfjgSource2
kdjfjgSource2 = kdjfjgSource1;


// Enums
// 1. enums are compatible with numbers.
// 2. numbers are compatible with enums.
// 3. enum values from different enum types are considered incompatible.
enum dlfkgkE1 {
  A, B, C,
};
enum dlfkgkE2 {
  A, B, C,
};
enum dlfkgkE3 {
  A, B, C = 'adasd',
};

let dlfkgke = dlfkgkE1.A;
// dlfkgke = dlfkgkE2.A; // Error
dlfkgke = 12222;

let fkgjhj = 123123;
fkgjhj = dlfkgkE2.C;

let kgjhjhk = dlfkgkE3.C;
kgjhjhk = 234;

let jfjgkk = 123;
// jfjgkk = dlfkgkE3.C; // Error


// Class, when comparing two objects of a class type
//
// 1. Only members of the instance are compared.
// 2. Static members and constructors do not affect compatibility.
//
class dkfjgjhkC1 {
  dkfkh: string;
  static kfkglh: number= 123123;
  constructor(a: string, c: number) {}
};
class dkfjgjhkC2 {
  dkfkh: string;
  constructor(b: string) {}
};

let dkfkgkc1: dkfjgjhkC1;
let dkfkgkc2: dkfjgjhkC2;

dkfkgkc1 = dkfkgkc2;

/*
 * Private and protected members in a class affect their compatibility.
 *
 * When an instance of a class is checked for compatibility
 *
 * 1. if the target type contains a private member, then the source type must also contain a private member
 *    that originated from the same class.
 *
 * 2. Likewise, the same applies for an instance with a protected member.
 *
 * This allows a class to be assignment compatible with its super class, but not with
 * classes from a different inheritance hierarchy which otherwise have the same shape.
 */
class JFKGHSuper {
  private a: number;
}

class JFKGHOther {
  private a: number;
}

class JFKGHChild1 extends JFKGHSuper {
}

class JFKGHChild2 extends JFKGHSuper {
}

let ccccsuper: JFKGHSuper;
let ccccother: JFKGHOther;
let ccccchild1: JFKGHChild1;
let ccccchild2: JFKGHChild2;

// ccccother = ccccsuper; // Error
// ccccother = ccccchild1; // Error
// ccccother = ccccchild2; // Error

ccccsuper = ccccchild1;
ccccsuper = ccccchild2;
ccccchild1 = ccccchild2;

