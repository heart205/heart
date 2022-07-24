/**
 * @author heart
 * @description
 * @Date 2022-07-15
 * @see https://leetcode.cn/problems/validate-binary-search-tree/
 */

/**
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 有效 二叉搜索树定义如下：
 * 节点的左子树只包含 小于 当前节点的数。
 * 节点的右子树只包含 大于 当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 * 意味着要左子树和右子树都要在父节点范围里面
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
function isValidBST(root: TreeNode | null): boolean {
  const loop = (root: TreeNode | null, min: number, max: number): boolean => {
    if (root === null) return true
    // 节点需要在范围内
    if (root.val <= min || root.val >= max) {
      return false
    }
    // 左子树的最大值一定小于当前节点 因此 左子树的最大值会是当前节点
    // 右子树的最小值一定大于当前节点 因此 右子树的最小值会是当前节点
    return loop(root.left, min, root.val) && loop(root.right, root.val, max)
  }

  return loop(root, -Infinity, Infinity)
}

// 中序递归遍历
function isValidBST1(root: TreeNode | null): boolean {
  /** 保存前一个节点 */
  let pre = -Infinity
  const loop = (node: TreeNode | null): boolean => {
    if (node === null) return true

    if (!loop(node.left)) {
      return false
    }

    if (node.val <= pre) {
      return false
    }
    /** 保证当前的节点一定要大于前一个节点 */
    pre = node.val
    return loop(node.right)
  }

  return loop(root)
}

// const left = new TreeNode(1)
// const right = new TreeNode(4, new TreeNode(3), new TreeNode(6))
// const root = new TreeNode(5, left, right)

