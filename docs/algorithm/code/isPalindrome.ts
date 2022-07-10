/**
 * @author heart
 * @description 回文链表
 * @Date 2022-07-10
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function isPalindromeArray(array: number[]): boolean {
  const length = array.length - 1
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[length - i]) {
      return false
    }
  }
  return true
}
export function isPalindrome(head: ListNode | null): boolean {
  const countArray: Array<number> = []
  while (head !== null) {
    countArray.push(head.val)
    head = head.next
  }
  // 判断是否是回文
  return isPalindromeArray(countArray)
}

// 使用栈的方式解决
export function isPalindromeStack(head: ListNode | null): boolean {
  let count = 0,
    tempCount = 0,
    tempNode = head
  const array: Array<ListNode> = []
  while (tempNode !== null) {
    count++
    tempNode = tempNode.next
  }
  tempNode = head
  // 将后一段的值压入栈内存中
  while (tempNode !== null) {
    if (tempCount < count / 2) {
      tempCount++
      tempNode = tempNode.next
      continue
    }
    array.unshift(tempNode)
    tempNode = tempNode.next
  }
  // 比较栈的值
  tempNode = head
  for (let i = 0; i < array.length && tempNode !== null; i++) {
    if (array[i].val !== tempNode.val) {
      return false
    }
    tempNode = tempNode.next
  }
  return true
}

// 用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题
export function isPalindrome2(head: ListNode | null): boolean {
  // 定义两个变量
  if (head === null) return false
  let suffixNode: ListNode | null = new ListNode(),
    tempNode: ListNode | null = suffixNode,
    count: number = 0,
    tempCount: number = 0,
    headNode: ListNode | null = head

  // 先获取个数
  while (headNode !== null) {
    count++
    headNode = headNode.next
  }
  headNode = head
  // 反转后一半的链表节点

  while (headNode !== null) {
    if (tempCount < count / 2) {
      tempCount++
      headNode = headNode.next
      continue
    }

    // 将后半部分的链表进行反转
    // 存储下一位的节点防止丢失
    tempNode = headNode.next
    headNode.next = suffixNode.next
    // 更新头节点
    suffixNode.next = headNode
    // 恢复下一个节点位置
    headNode = tempNode
  }

  headNode = head

  // 此时suffixNode 表示的是后一半的节点
  suffixNode = suffixNode.next

  // 反转链表完成后 开始比较前一半和后一半的结果
  while (suffixNode !== null && headNode !== null) {
    if (suffixNode.val !== headNode.val) {
      return false
    }
    suffixNode = suffixNode.next
    headNode = headNode.next
  }
  return true
}

// 递归的方式打印
export function isPalindromeDeep(head: ListNode | null): boolean {
  let temp: ListNode | null = head
  const deep = (headNode: ListNode | null): boolean => {
    if (headNode === null) {
      // 表明已经到了尾部节点了
      return true
    }

    // 从尾部节点开始比较
    const bool = deep(headNode.next) && headNode.val === temp?.val
    // 尾部节点比较完成后 temp = temp.next
    temp = temp && temp.next
    return bool
  }
  return deep(temp)
}
