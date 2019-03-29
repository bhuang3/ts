/**
 * A relative import is resolved relative to the importing file and [CANNOT] resolve
 * to an ambient module declaration
**/

/**
 * A non-relative import, which [CAN] be resolve to ambient module declaration, is resolved:
 *  1.  relative to `baseUrl`, OR
 *  2.  through path mapping
**/

/**
 * Module Resolution Strategies
 *
 *  1.  `Node`
 *  2.  `Classic`: default is not specified: `--module AMD | System | ES2015`
 *
 * Classic:
 *
 *  1.  Relative import will result in lookups: `*.ts` or `*.d.ts`
 *  2.  Non-relative import will walk up the directory tree starting with the directory containing
 *      the importing file
 *
 * Node:
 *  It attempts to mimic the Node.js module resolution mechanism at runtime.
 *
 *  1.  `Node.js` Relative import 
 *    1.  If `*.js` `FILE` exists
 *    2.  If `*` `FOLDER` contains `package.json` that specifies a `main` property.
 *    3.  If `*` `FOLDER` contains `index.js`
 *
 *  2.  `Node.js` Non-relative import
 *    Lookup `node_modules` `FOLDER` in each location during walking up the directory
 *    tree starting with directory containing the import file until one worked.
 *
 *    1.  If `node_modules/*.js` `FILE` exists
 *    2.  If `node_modules/*` `FOLDER` contains `package.json` that specifies a `main` property
 *    3.  If `node_modules/X` `FOLDER` contains `index.js`
 *
 *  TypeScript overlays the TypeScript source file extensions (`.ts`, `.tsx`, `.d.ts`) over the Node's
 *
 *  1.  `TypeScript` Relative import
 *    1.  If `*.ts` `FILE` exists
 *    2.  If `*.tsx` `FILE` exists
 *    3.  If `*.d.ts` `FILE` exists
 *    4.  If `*` `FOLDER` contains `package.json` that specifies a `main` property
 *    5.  If `*` `FOLDER` contains `index.ts`
 *    6.  If `*` `FOLDER` contains `index.tsx`
 *    7.  If `*` `FOLDER` contains `index.d.ts`
 *
 *  2.  `TypeScript` Non-relative import
 *    Similar walk up process to Node's
 *
 *    1.  If `node_modules/*.ts` `FILE` exists
 *    2.  If `node_modules/*.tsx` `FILE` exists
 *    3.  If `node_modules/*.d.ts` `FILE` exists
 *    4.  If `node_modules/*` `FOLDER` contains `package.json` that specifies a `main` property
 *    5.  If `node_modules/@types/*.d.ts` `FILE` exists ???
 *    6.  If `node_modules/*` `FOLDER` contains `index.ts`
 *    7.  If `node_modules/*` `FOLDER` contains `index.tsx`
 *    8.  If `node_modules/*` `FOLDER` contains `index.d.ts`
**/

/**
 * Path Mapping: it uses `paths` property, which will be resolved relative to `baseUrl`, in `tsconfig.json` file
 *
 * "paths": {
 *    "*": [ "*", "generated/*" ]
 * }
 *
 * This tells the compiler for any module import that matches the pattern `*` (all values), to look in two locations
 * one by one until one worked:
 *
 *  1.  `"*"` meaning the same name unchanged: `<module>` => `<baseUrl>/<module>`
 *  2.  `"generated/*"` meaning module name with an appended prefix: `<module>` => `<baseUrl>/generated/<module>`
 *
**/

/**
 * Virtual Directories with `rootDirs`:
 *
 * Project sources from multiple directories at compile time are all combined to generate a single output
 * directory. This can be viewed as a set of source direcotries create a `virtual` directory.
 *
 * Using `rootDirs` to info the compiler of the roots making up this `virtual` directory. Thus the compiler can
 * resolve `relative` modules imports within these `virtual` directories `as if` were merged together in one directory
 *
 * `rootDirs` specify a list of roots whose contents are expected to merge at run-time.
 * 
 * "rootDirs": [
 *    "folder-1", "folder-2", ...
 * ]
 *
 * Every time the compiler sees a `relative` module import in a subfolder of one of the rootDirs, it will attempt to look
 * for this import in each of the entries of rootDirs.
 *
 * The flexibility of rootDirs is `NOT limited to specifying a list of physical directories` that are logically
 * merged. The supplied array may include any kind of directory names, `regardless of whether they exist or not`
 * 
 * https://www.typescriptlang.org/docs/handbook/module-resolution.html#virtual-directories-with-rootdirs
**/


/**
 * Why does a module in the exclude list still get picked up by the compiler?
 *
 * `tsconfig.json` turns a folder into a project. Without specifying any `exclude` or `files` properties, all
 * files in the `folder containing the tsconfig.json` and `all its sub-directories` are included in compilation.
 *
 * If you want to exclude some of the files, use `exclude`
 * If you would rather specify all the files instead of letting the compiler look them up, use `files`
 *
 * It does `NOT` embed `module resolution`. If the compiler identified a file `as a target of a module import`, it will
 * be included in the `compilation` regardless if it was excluded in the previous steps (which is module resolution).
**/

// compiler ? module resolution ? bundle