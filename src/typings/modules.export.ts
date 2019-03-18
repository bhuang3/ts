// In Typescript, just as in ECMAScript 2015, any file containing import or export is considered a module
//
// A file without any mport or export declarations is treated as a script whose contents
// are available in the gloabl scope

//////////////////////////////////////////////////////////////////////////////////////////////////////
export class ABC {

};

export function FFF() {
  console.log('export FFF from `modules.export.ts`');
}

export let VVV : number = 123;

class AAA {

};

// A re-export does not import it locally, or introduce a local variable
export { ABC as abc };

// equivalent to `export class AAA { ... }`
export { AAA }; 
//
// Import
//
// import { ABC, abc, AAA } from './modules.export';
//
//////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Default export: classes and functions declarations can be authored directly as default exports. Default
// export class and function declaration names are optional.
//
// export default class CSD {}
// export default function abc () {}
// export default class {}
// export default function () {}

// Error !
//
// export default let a = 123;
// export default const a = 123;
// export default a = 123;

// Works !
//
// let a = 123;
// export default a;
//
//////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////
//
// `export =` and `import = require()`
//
// The `export = ` specifies a SINGLE object that is exported from the module. It can be a class, interface
// namespace, function or enum.
//

class KDHFG {}

// Error, An export assignment cannot be used in a module with other exported elements
//
// export = KDHFG;
//

// Has to be imported by: import djf = require('./module');
//
//////////////////////////////////////////////////////////////////////////////////////////////////////


