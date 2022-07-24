/**
 * @author heart
 * @description
 * @Date 2022-07-16
 */
import { TreeNode } from './trie/trieClass'

// 迭代版本
export function isSymmetric(root: TreeNode | null): boolean {
  // 使用前序遍历和后续遍历如果值不一样 则直接return
  // 保存前序遍历的节点值
  if (!root) return true
  // 前序遍历的节点值加入到preTraversalList
  let node: TreeNode | null = null
  let rightNode: TreeNode | null = null
  const stack: (TreeNode | null)[] = []
  const rightStack: (TreeNode | null)[] = []
  stack.push(root)
  rightStack.push(root)
  // 二叉树的前序遍历
  while (stack.length > 0 && rightStack.length > 0) {
    // 每次弹出最后一个
    ;[node] = stack.splice(-1)
    ;[rightNode] = rightStack.splice(-1)
    if (node === null && rightNode === null) {
      continue
    }
    if (node === null || rightNode === null) {
      return false
    }
    if (node.val !== rightNode.val) {
      return false
    }
    stack.push(node.right)
    stack.push(node.left)
    rightStack.push(rightNode.left)
    rightStack.push(rightNode.right)
  }
  return stack.length === 0 && rightStack.length === 0
}

// 递归版本
export function isSymmetric2(root: TreeNode | null): boolean {
  const compareIsSymmetric = (
    nodeLeft: TreeNode | null,
    nodeRight: TreeNode | null
  ): boolean => {
    if (nodeLeft === null && nodeRight === null) return true
    if (nodeLeft === null || nodeRight === null) return false
    return (
      nodeLeft.val === nodeRight.val &&
      compareIsSymmetric(nodeLeft.left, nodeRight.right) &&
      compareIsSymmetric(nodeLeft.right, nodeRight.left)
    )
  }

  return compareIsSymmetric(root, root)
}
