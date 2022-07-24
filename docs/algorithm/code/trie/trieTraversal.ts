/**
 * @author heart
 * @description 树的基础知识
 * @Date 2022-07-15
 * 前序遍历 中序遍历 后序遍历 递归版本
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
/** 前序遍历 */
const preOrderTraversal = (root: TreeNode | null, saveArray: number[]) => {
  if (root === null) return
  /** 中左右 */
  saveArray.push(root.val)
  root.left && preOrderTraversal(root.left, saveArray)
  root.right && preOrderTraversal(root.right, saveArray)
}

const middleOrderTraversal = (root: TreeNode | null, saveArray: number[]) => {
  if (root === null) return
  /** 左中右 */
  root.left && middleOrderTraversal(root.left, saveArray)
  saveArray.push(root.val)
  root.right && middleOrderTraversal(root.right, saveArray)
}

const nextOrderTraversal = (root: TreeNode | null, saveArray: number[]) => {
  if (root === null) return
  /** 左右中 */
  root.left && nextOrderTraversal(root.left, saveArray)
  root.right && nextOrderTraversal(root.right, saveArray)
  saveArray.push(root.val)
}

export {}
