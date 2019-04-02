/**
 * Multiple decorators:
 *  1.  The expressions for each decorator are `evaluated` `top-to-bottom`.
 *  2.  The results are then `called as functions` from `bottom-to-top`.
**/


/**
 * Decorator Evaluation:
 *  1.  `Parameter Decorator`(followed by `method`, `accessor`) or `Property Decorator`, applied for each `instance` member
 *  2.  `Parameter Decorator`(followed by `method`, `accessor`) or `Property Decorator`, applied for each `static` member
 *  3.  `Parameter Decorator` applied for the `constructor`
 *  4.  `Class Decorator` applied for the `class`
**/


/**
 * Class Decorator:
 *  1.  It's declared before class declaration and `applied to constructor` of the class.
 *  2.  It can be used to `observe`, `modify` or `replace a class definition`.
 *  3.  It's can `NOT` be used in a declaration file.
 *  4.  It will be called `as a function at runtime`, with the constructor of the decorated class as its only argument.
 *  5.  If it returns a value, it will replace the class definition with the provided constructor function.
**/


/**
 * Method Decorator
 *  1.  It's declared before method declaration and `applied to Property Descriptor` for the method.
 *  2.  It can be used to `observe`, `modify` or `replace a method definition`.
 *  3.  It's can `NOT` be used in a declaration file.
 *  4.  It will be called `as a function at runtime`, with
 *        1.  Either constructor of claas for static member, or prototype of class for instance member.
 *        2.  The `name` of member.
 *        3.  The `Property Descriptor` for the member. (`undefined` is target is less than ES5).
 *  5.  If it returns a vlue, it will be used as `Property Descriptor` for the method.
 *      (return value is ignored if target is less than ES5)
**/


/**
 * Accessor Decorator
 *  1.  It's declared before accessor declaration and `applied to Property Descriptor` for the accessor.
 *  2.  It can be used to `observe`, `modify` or `replace an accessor definition`.
 *  3.  It can `NOT` be used in a declaration file.
 *  4.  It can `NOT` decorate both `get` and `set` accessors for a single memeber. It `must` be applied to
 *      the first accessor specified in document order. This is because decorators apply to one `Property Descriptor`,
 *      which combines both the `get` and `set` accessor, not each declaration separately.
 *  5.  It will be called `as a function at runtime`, with
 *        1.  Either constructor of claas for static member, or prototype of class for instance member.
 *        2.  The `name` of member.
 *        3.  The `Property Descriptor` for the member. (`undefined` is target is less than ES5).
 *  6.  If it returns a vlue, it will be used as `Property Descriptor` for the method.
 *      (return value is ignored if target is less than ES5)
**/


/**
 * Property Decorator
 *  1.  It's declared before a property declaration.
 *  2.  It can `NOT` be used in a declaration file.
 *  3.  It will be called `as a function at runtime`, with
 *        1.  Either constructor of claas for static member, or prototype of class for instance member.
 *        2.  The `name` of member
 *  4.  It can `ONLY` be used to `observe` that a property of a specific name has been declared for a class.
 *
 *  https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators
**/


/**
 * Parameter Decorator
 *  1.  It's declared before a parameter declaration.
 *  2.  It's applied to the function for a class constructor or method declaration.
 *  3.  It can `NOT` be used in a declaration file.
 *  4.  It will be `called as function` at runtime, with
 *        1.  Either constructor of claas for static member, or prototype of class for instance member.
 *        2.  The `name` of the member.
 *        3.  The `ordinal index` of the parameter in the function's parameter list.
 *  5.  It can `ONLY` be used to `observe` that a parameter has been declared on a method.
**/