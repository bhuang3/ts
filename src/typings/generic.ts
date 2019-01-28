function gn<T>(val: T): T {
  return val;
};

// we can call it in one of TWO ways.
//
// Here we use type argument inference – that is,
// we want the compiler to set the value of T for us
// automatically based on the type of the argument we pass in.
console.log(gn('string'), gn(123), gn(['s1','s2']), gn([1,2]));
//
// We pass all of the arguments, including the type argument, to the function
console.log(gn<string>('string'), gn<number>(123), gn<string[]>(['s1','s2']), gn<number[]>([1,2]));
// Error
// console.log(gn<string>(123), gn<string>(123));

function gn2<T>(vals: T[]): T[] {
  console.log(vals.length);

  return vals;
};

// this is NOT a generic interface
interface gi {
  <T>(val: T[]): T[];
};

// do NOT need to provide `type` parameter
let gggg: gi;
gggg = gn;
gggg = gn2

// this is a generic interface
interface GI<T> {
  (val: T[]): T[];
}

// Error: generic type 'GI<T>' requires 1 type argument(s)
// let ggg: GI;
//
// MUST provide `type` parameter
let ggg: GI<number>;
ggg = gn;
ggg([1,2,3]);
ggg = gn2;
ggg([1,2,3])


class GS<T> {
  value: T;
  differ: (v1: T, v2: T) => number;

  equal(value: T): boolean {
    return this.differ(this.value, value) === 0;
  }
};

// does NOT have to provide type parameter
let gsgs1 = new GS<number>();

gsgs1.differ = (v1: number, v2: number): number => {
  return v1 - v2;
};


function getProperty<O, K extends keyof O, P>(obj: O, key: K, p?: P) {
  return obj[key];
};