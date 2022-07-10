/**
 * @author heart
 * @description 合并两个有序链表
 * @see https://leetcode.cn/problems/merge-two-sorted-lists/
 * @Date 2022-07-09
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let result: ListNode | null = null
  if (list1 === null && list2 === null) return result

  result = new ListNode()

  let head: ListNode | null = result
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      head.next = list1
      list1 = list1.next
    } else {
      head.next = list2
      list2 = list2.next
    }
    head = head.next
  }

  while (list1 !== null) {
    head.next = list1
    list1 = list1.next
    head = head.next
  }

  while (list2 !== null) {
    head.next = list2
    list2 = list2.next
    head = head.next
  }
  return result.next
}

// 算法优化代码:

function mergeTwoLists2(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (list1 === null || list2 === null) {
    return list1 === null ? list2 : list1
  }

  const result = new ListNode()
  let head: ListNode | null = result

  // 有序插入链表
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      head.next = list1
      list1 = list1.next
    } else {
      head.next = list2
      list2 = list2.next
    }
    head = head.next
  }

  // 将最后剩余的链表添加至尾部
  head.next = list1 === null ? list2 : list1

  return result.next
}

// 递归版本
function mergeTwoLists3(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (list1 === null || list2 === null) {
    return list1 === null ? list2 : list1
  }
  // 定义头节点
  const node = list1.val <= list2.val ? list1 : list2
  //  mergeTwoLists3(node.next, list1.val <= list2.val ? list2 : list1) 求node的下一个节点
  node.next = mergeTwoLists3(node.next, list1.val <= list2.val ? list2 : list1)
  return node
}
