/**
 * @author heart
 * @description 追加参数
 * @see https://github.com/type-challenges/type-challenges/blob/main/questions/00191-medium-append-argument/README.zh-CN.md
 * @Date 2022-07-09
 */

/* _____________ 你的代码 _____________ */

type AppendArgument<Fn, A> = Fn extends (...args: infer r) => infer t
  ? (...arg: [...r, A]) => t
  : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../utils/index'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [Expect<Equal<Case1, Result1>>, Expect<Equal<Case2, Result2>>]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/191/answer/zh-CN
  > 查看解答：https://tsch.js.org/191/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
