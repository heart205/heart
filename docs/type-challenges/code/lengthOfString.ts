/* _____________ Your Code Here _____________ */

type LengthOfString<
  S extends string,
  arr extends string[] = []
> = S extends `${infer r}${infer rest}`
  ? LengthOfString<rest, [...arr, r]>
  : arr['length']

type s = LengthOfString<''>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils/index'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
