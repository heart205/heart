/* _____________ Your Code Here _____________ */

type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer r}${From}${infer rest}`
  ? `${r}${To}${rest}`
  : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils/index'

// 注意infer 推断的问题 infer 推断智能推断头尾的前置或者后置 不能推断字符中间的位置
// 类似正则(?=)

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>
]

type s = 'foosd' extends `foo${infer r}` ? r : false

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/116/answer
  > View solutions: https://tsch.js.org/116/solutions
  > More Challenges: https://tsch.js.org
*/
