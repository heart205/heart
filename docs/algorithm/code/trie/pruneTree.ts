/**
 * @author heart
 * @description
 * @Date 2022-07-24
 * @see https://leetcode.cn/problems/binary-tree-pruning/
 */
import { TreeNode } from './trieClass'

function pruneTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null
  // 后续遍历 true要删除
  const traverser = (node: TreeNode | null): boolean => {
    if (node === null) {
      return false
    }
    // 后续遍历 左右中
    if (traverser(node.left)) {
      node.left = null
    }
    if (traverser(node.right)) {
      node.right = null
    }
    if (node.val === 0 && node.left === null && node.right === null) {
      // 删除当前节点
      return true
    }
    return false
  }
  return traverser(root) ? null : root
}
