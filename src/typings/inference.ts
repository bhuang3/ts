let a = 123;
// `a` is already a number
// a = '';


// Best common type
// 1. It considers EACH candidate type, and picks the type that is COMPATIBLE with ALL other candidates.
let aa2 = [ 1, 2, 3, null ];


class Animal {
  isAnimal: boolean = true;

  // private myName() {};
  // protected myNickName() {};
  public toString() {};
};
class Cat extends Animal {};
class Dog extends Animal {};
class Snake extends Animal {};
class NotAnimal {
  // isAnimal: boolean = true;
  asd: string;

  // private myName() {};
  // protected myNickName() {};
  public toString() {};
}

// 2. They share a common structure, but no one type is the super type of all candidate types.
//
// the resulting inference is the union type: (Cat | Dog | Snake | NotAnimal)[], when no common type is found.
let aa3 = [ new Cat(), new Dog(), new Snake(), new NotAnimal() ];
//
// or instead explicitly provide the type.
let aa4: Animal[] = [
  new Cat(), new Dog(), new Snake(),
  //
  // Error, BUT!!! If
  //
  // 1. `NotAminal` contains all PUBLIC members of `Animal`
  // 2. `Animal` does NOT have any private or protected members.
  //
  // it will works!!!
  //
  // new NotAnimal(),
];


// Contextual Type
// It occurs when the type of an expression is implied by its location
window.onmousedown = function(event) {
  // type of `event` is `MouseEvent`
  //
  // TypeScript type checker used the type of the Window.onmousedown function to infer
  // the type of the function expression on the right hand side of the assignment
  //
  // Error, since `MouseEvent` type does not contain `click`
  // event.click;
}

// If this function expression were not in a contextually typed position,
// the `event` parameter would have type `any`, and no error would have been issued.
let onmousedownF1 = function(event) {
  // type of `event` is any
  event.click;
};

function onmousedownF2(event) {
  // type of `event` is any
  event.click;
}

window.onmousedown = onmousedownF1;
window.onmousedown = onmousedownF2;

// If the function with an explicit type, it will override the contextual type.
window.onmousedown = function(event: any) {
  event.click;
}