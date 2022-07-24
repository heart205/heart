/**
 * @author heart
 * @description 二叉树的层次遍历
 * @Date 2022-07-23
 * @see https://leetcode.cn/problems/binary-tree-level-order-traversal/
 */
import { TreeNode } from './trie/trieClass'

function levelOrder(root: TreeNode | null): number[][] {
  const result: Array<number[]> = []
  if (!root) return result
  // 队列 用于广度搜索
  const stack: Array<TreeNode> = []
  // 用于记录每一层的个数
  let node = 0
  // 用于表示第几层
  let count = 0
  stack.push(root)
  while (stack.length > 0) {
    // 获取当前层的个数
    node = stack.length
    // 一次性处理完层级 数组不存在 优先添加数组
    if (!result[count]) {
      result[count] = []
    }
    for (let i = 0; i < node; i++) {
      const data = stack.shift()
      result[count].push(data!.val)
      if (data && data.left) stack.push(data.left)
      if (data && data.right) stack.push(data.right)
    }
    count++
  }
  return result
}
