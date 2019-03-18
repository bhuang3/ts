namespace NS1 {
  const pattern: string = 'pattern';

  export let NSValue = 123;

  export class NSClass {}

  export function NSFunction() {
    console.log('NS Function - ',  pattern);
  }
};

let aNS : NS1.NSClass = { asd: 123 };
NS1.NSFunction();


// Multi-file namespaces
//
// Even though the files are separate, they can each contribute to the same namespace and can be
// consumed as if they were all defined in one place. Because there are dependencies between files.
// We'll add reference tags to the compiler about the relationships between files.


// Aliase
//
// Work with namespaces by using `import xxx = namepsace.a.b.c....`, this syntax simply creates an alias.
//
// NOT be confused with import xxx = require('...'), which is used to import modules

import NSAlias = NS1;
import ValueAlias = NS1.NSValue;
import ClassAlias = NS1.NSClass;
import FunctionAlias = NSAlias.NSFunction;

let bNS : ClassAlias;
FunctionAlias()

// Notice that we do NOT use the require keyword; instead we assign directly from the qualified
// name of the symbol we’re importing.
//
// This is similar to using `var`, but also works on the type and namespace meanings of the imported symbol.
//
// IMPORTANTLY, for VALUES, `import` is a distinct reference from the original symbol
// so changes to an aliased `var` will NOT be reflected in the original variable.

// Error, Cannot assign to 'ValueAlias' because it is not a variable.
// ValueAlias = 123123;
//
var ValueAliasV = NSAlias.NSValue;
ValueAliasV = 3333; // Works

console.log(NSAlias.NSValue); // 123, not modified