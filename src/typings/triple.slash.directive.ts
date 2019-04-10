/**
 * Triple-Slash Directives: used as compiler directives. They are `ONLY` valid `at the top` of their containing file.
 *
 * It instructs the compiler to include additional files in the compilation process.
**/


/**
 * `/// <reference path="... ..." />` It serves as a `declaration of dependency` between `files`.
 * 
 * Preprocessing input files: compiler performs a `preprocessing` pass on input files to resolve all triple-slash
 * reference directives. During this process, `additional files are added to the compilation`.
 *
 * A triple-slash reference path is resolved `relative to the containing file`.
 *
 * The process
 *  1.  starts with a set of root files: specified on the command-line or in the `files` of `tsconfig.json`.
 *  2.  root files are preprocessed in the same order they are specified.
 *  3.  `all` triple-slash references are processed before a file is added to the list.
**/


/**
 * `/// <reference type="... ..." />` it `declares a dependency` on a `package`.
 *
 * It's similar to the process of resolving module names in an import statement. An easy way to think of
 * triple-slash-reference-types directives are as an `import for declaration packages`.
 *
 * For example, including `/// <reference type="node" />` in a `declaration file` declares that this file
 * uses names declared in `@types/node/index.d.ts`, and thus this packages needs to be included in the compilation
 * along with the declaration file.
 * 
 * `Use these directives ONLY when you're authoring a d.ts file`
**/


/**
 * `/// <reference lib="... ..." />` it allows a file to explicitly include an `existing built-in lib` file.
 *
 * Built-in lib files are referenced in the same fashion as the `lib` in `tsconfig.json`.
 *
 * These directives are recommended for declaration files those relay on built-in types, e.g. DOM APIs or built-in JS
 * constructors like Symbol or Iterable.
**/


/**
 * `/// <reference no-default-lib="true" />` it makes a file as a `default library`. You will see this comment at the
 * top of `lib.d.ts` and its different variants.
 *
 * This directive instructs the compiler to `NOT` include the default library (i.e. lib.d.ts)
**/


/**
 * `/// <amd-module name="... ... " />` it allows passing an optional module name to the compiler.
 * 
 * By default AMD modules are generated `anonymous`. This can lead to problems when other tools are used to process
 * the resulting modules.
 * 
 * https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-amd-module-
**/

