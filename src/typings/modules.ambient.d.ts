// Ambient Modules
/**
 * We could define each module in its own .d.ts file with export declarations, but it's
 * more convenient to write them as one larger .d.ts file.
 * 
 * To do so, we use the `module` keyword and the quoted name of the module which will be available
 * to a later import.
 **/

// Error: 'export' modifier cannot be applied to ambient modules and
// module augmentations since they are always visible.
//
//export declare module 'bo' {
declare module 'bo' {
  interface PP {}

  export interface AA {}

  export const aa = 123;

  export function BB(a: number, b: string): AA;

  // Error, Initializers are not allowed in ambient contexts
  //
  // export let BB = 123;

  // Error, An implementation cannot be declared in ambient contexts
  // 
  // export function FF() {}
}