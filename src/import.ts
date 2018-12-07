
// When exporting a module using export =, TypeScript-specific import module = require("module") must be used to import the module
import aaa = require('./export');

console.log(aaa);