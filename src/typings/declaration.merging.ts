// Compiler merges separate declarations declared with the same name into a single definition.


/**
 * A declaration creates entities in at least one of three groups: `namespace`, `type` or `value`
 *  1.  Namepace-creating: create a `namespace` which contains names that are accessed using a dotted notation.
 *  2.  Type-creating: create a `type` that is visible with the `declared type`.
 *  3.  Value-creating: create a `value` that is visible in the output JS files.
 *
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#basic-concepts
**/


/**
 * `Interface`: join the members of both declarations into a single interface with the same name.
 *  1.  Non-function members of the interface should be `unique`, if not, they `must be of the same type`.
 *  2.  Funtion members of the same name are treated as describing an overload of the same function. The functions
 *      declared in the later interface have higher precedence.
**/


/**
 * `Namespace`: namespaces of the same name will merge their members.
 *  1.  To merge `namespace`, `exported interfaces` declared in each namespace are themselves merged.
 *  2.  To merge `namepsace value`,
 *      1.  `exported` members will be added to the `first existing` namespace.
 *      2.  `non-exported` members are only visible in the original namespace. After merging, merged members that
 *          come from other declarations can `NOT` see non-exported members.
 */


