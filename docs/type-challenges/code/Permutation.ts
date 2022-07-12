/* _____________ Your Code Here _____________ */


// Exclude 会出现never的情况
// 利用条件类型分发 可以做到
type Permutation<T, U = T> =[U] extends [never] ? [] : U extends T ? [U, ...Permutation<Exclude<T, U>>] : []

type s = Permutation<'A' | 'B' | 'C'>


// ! 数组进行条件类型分发的案例
type d = ['B','C'] | ['C','B']
type a = ['A', ...d]
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils/index'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/
