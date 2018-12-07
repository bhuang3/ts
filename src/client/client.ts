import { log } from 'lib';
import { thor } from 'thor';

function sum(a: number, b: number): number {
  return a + b;
}

const globalFunction = () => {
  console.log('this is a global function in client');
}

log(sum(1, 2));

thor();