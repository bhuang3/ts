import { ABC, abc, AAA, FFF, VVV } from './modules.export';

// Optional Module Loading
//
// import xxx = require("...") : it's ONLY used in type positions, NEVER in a position that
// would be emitted into the JavaScript
//

declare function require(name: string): any;

let required = true;

// load module on demand
if (required) {
  let abcClass : typeof ABC = require('./modules.export');
  let fffFunction : typeof FFF = require('./modules.export');
  let vvvValue: typeof VVV = require('./modules.export');

  let cc = new abcClass();

  console.log(vvvValue);
  fffFunction();
}