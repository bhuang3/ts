import { now } from './date';

export const log = (message: any) => {
  console.log(`[DEBUG][${now()}] ${message}`);
}