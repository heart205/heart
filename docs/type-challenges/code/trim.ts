/* _____________ Your Code Here _____________ */

type space = ' ' | '\t' | '\n'

type Trim<S extends string> = S extends `${space}${infer r}`
  ? Trim<r>
  : S extends `${infer t}${space}`
  ? Trim<t>
  : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils/index'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
