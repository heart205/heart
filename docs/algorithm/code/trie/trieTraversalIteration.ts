/**
 * @author heart
 * @description 树的遍历 迭代法
 * @Date 2022-07-20
 */
import { TreeNode } from './trieClass'
const preTraversalIteration = (root: TreeNode | null): number[] => {
  if (root === null) return []
  const result: number[] = []
  /** 利用栈结构保存递归数据 由于要保持结构的顺序是中前后 */
  const stack: TreeNode[] = []
  /** 优先压入头节点 */
  stack.push(root)
  while (stack.length > 0) {
    const [node] = stack.splice(-1, 1)
    if (node) {
      result.push(node.val)
      /** 保持弹出的顺序是中左右 要先压入right */
      node.right && stack.push(node.right)
      node.left && stack.push(node.left)
    }
  }
  return result
}

/**
 * 中序遍历的思路就是先找所有的左边节点的值 经历过的路径都用栈存储 之后在弹出寻找右子树的左子树
 * @param root
 * @returns
 */
const middleOrderTraversal = (root: TreeNode | null): number[] => {
  if (root === null) return []
  const result: number[] = []
  const stacks: TreeNode[] = []
  let tempNode: TreeNode | null = root
  while (tempNode !== null || stacks.length > 0) {
    if (tempNode !== null) {
      stacks.push(tempNode)
      /** 经过的节点全部压入栈中 */
      tempNode = tempNode.left
    } else {
      /** 当到最底层的左节点的时候将数据压入result中 */
      const [node] = stacks.splice(-1, 1)
      result.push(node.val)
      /** 之后遍历右子树的左边节点  */
      tempNode = node.right
    }
  }
  return result
}

// 前后中
/** 后续遍历就是前序遍历压栈方式相反 并且数组反转即可 */
const nextTraversalIteration = (root: TreeNode | null) => {
  if (root === null) return []
  const result: number[] = []
  const stacks: TreeNode[] = []
  stacks.push(root)
  while (stacks.length > 0) {
    const [node] = stacks.splice(-1, 1)
    if (node) {
      result.push(node.val)
      node.left && stacks.push(node.left)
      node.right && stacks.push(node.right)
    }
  }
  return result.reverse()
}

// 迭代排序统一写法
// 使用空指针标记法
const preTraversal = (root: TreeNode | null): number[] => {
  if (root === null) return []
  const stack: (TreeNode | null)[] = []
  const result: number[] = []
  stack.push(root)
  while (stack.length > 0) {
    const node = stack.pop()
    // 利用null来标记当前节点是否需要压入结果集中
    if (!node) {
      result.push(stack.pop()!.val)
    } else {
      // 将元素节点结果集压入栈中
      // 前序遍历
      // 中左右
      if (node.right) stack.push(node.right)
      // 不能压入null进节点 null作为标志符
      if (node.left) stack.push(node.left)
      stack.push(node)
      stack.push(null)
    }
  }
  return result
}
