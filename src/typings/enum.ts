function getEnum<T>(val: T): T{
  return val;
};

enum EEE {
  A,
  B = 123,
  C = getEnum(111),
  //
  // Error, since `C` is not constant-initialized, so `D` needs an initializer.
  // Enums without initializers need to be first
  // D,
};

// In a string enum, each member HAS to be constant-initialized with a string literal,
// or with another string ENUM MEMBER
enum SSS {
  A = '123',
  B = '321',
  C = A,
  D = B,
  E = D,
};

enum MMM {
  B = 1,
  C = '123',
  // Error, `D` HAS to have a initializer since auto-increment has been implicitly disabled.
  //
  // D,
  //
  // Error, Computed values are not permitted in an enum with string valued members
  //
  // F = getEnum(123),
  // G = 1 + 2,
  //
};

function enumF(obj: { D: any }) {
  console.log(obj.D);
};

// Enums are REAL objects that EXIST at runtime.
// Works, since SSS has a property named `D`
enumF(SSS);
//
// Error, since MMM does NOT have `D`
// enumF(MMM);

// Reverse mappings
let SSSB = SSS.B;
SSS[SSSB] === 'B'


// Const Enums
//
// it can avoid paying the cost of extra generated code and additional indirection
// when accessing enum values.
//
// Const enum members are inlined at use site
const enum CCCC {
  A,
  B,
  // Error: In 'const' enum declarations member initializer must be CONSTANT EXPRESSION
  //
  // C = getEnum(123),
  D = 1 + 2,
}