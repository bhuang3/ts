/**
 * TypeScript 2.3 and later support type-checking and reporting errors in `.js` files with `--checkJs`
 *
 *  1.  You can skip checking some `FILES` by adding a `// @ts-nocheck` comment to them.
 *  2.  You can choose to check `ONLY` a few .js `FILES` by adding a `// @ts-check` comment to
 *      them without setting `--checkJs`.
 *  3.  You can ignore errors on specific `LINES` by adding `// @ts-ignore` on the preceding line.
**/


/**
 * `MUST have // @ts-check on the top in order to enable following features`
**/ 

// @ts-check


/**
 * JSDoc types are used for type information
 */

/** @type {number} */
let a;

a = 123;

// Error, since a is number.
//
// a = 'kskdkf'


/**
 * Properties are `inferred from assignments` in `class bodies`.
 *  1.  The type of a property is the type given `in the constructor`, unless it's not defined there, or the type in the
 *      constructor is undefined or null;
 *  2.  If not defined in constructor, the type is the `union` of the types of all the right-hand values.
 *  3.  Properties defined in the constructor are `always` assumed to exist, whereas ones defined just in methods, getters, or
 *      setters are considered optional.
 *  4.  JSDoc types could be added in constructor, then you `DONT` even have to give a value if it will be initialized later.
 *  5.  `Constructor functions are equivalent to classes`.
**/

class C {
  constructor() {

    /** @type {number} */
    this.a;
    /** @type {string | number} */
    this.b;

    // Error, either assign a value or add a JSDoc type
    // this.c;
  }
 
  method1() {
    this.d = 123;

    // Error, a is number
    // this.a = '';
  }
  method2() {
    this.d = "123123";
    this.b = 'mcmcmvm';
    this.b = 123;

    // Error, b is union
    // this.b = {};
  }
}


