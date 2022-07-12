/**
 * @author heart
 * @description 二叉树的最大深度
 * @Date 2022-07-11
 */

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

export function maxDepth(root: TreeNode | null): number {
  // 暴力搜索
  const dfs = (node: TreeNode | null): number => {
    if (node === null) {
      return 0
    }
    return Math.max(dfs(node.left), dfs(node.right)) + 1
  }
  return dfs(root)
}
