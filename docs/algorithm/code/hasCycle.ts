class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function hasCycle(head: ListNode | null): boolean {
  const set = new Set<ListNode>()
  while (head !== null) {
    if (set.has(head)) {
      return true
    }
    set.add(head)
    head = head.next
  }
  return false
}

// 用 O(1)（即，常量）内存解决此问题
// 环形链表的问题都可以使用快慢指针的方式解决
export function hasCyclePoint(head: ListNode | null): boolean {
  if (head === null) return false
  let fast: ListNode | null = head,
    slow: ListNode | null = head
  while (fast !== null && slow !== null) {
    // 如果是环形链表 不存在出现null的情况

    // 快指针每次走两步
    fast = (fast.next && fast.next.next) || null

    // 慢指针每次走一步
    slow = slow.next

    // 如果相遇 则是环形的
    if (slow && fast && slow === fast) {
      return true
    }
  }
  return false
}

// 逐个删除元素完成环形链表的判断
export function hasCycleDelete(headNode: ListNode | null): boolean {
  if (headNode === null) return false
  let temp: ListNode | null = headNode

  let flagNode: ListNode | null = null
  while (temp !== null) {
    if (temp.next === temp) {
      // 形成了闭环 此时是循环数组
      return true
    }
    flagNode = temp.next
    temp.next = temp
    temp = flagNode
  }
  return false
}

// 反转链表
export function hasCycleReserve(head: ListNode | null): boolean {
  if (head === null) return false
  let temp: ListNode | null = head

  let reserveNode: ListNode | null = new ListNode()
  let tempNode = null

  // 反转链表
  // 如果是一个环形的话 则头节点一定是链表的头节点
  while (temp !== null) {
    // 要先保存下一个节点的值
    tempNode = temp.next
    temp.next = reserveNode.next
    reserveNode.next = temp
    temp = tempNode
  }

  reserveNode = reserveNode.next
  // 判断节点两个头指针是否相等
  // head.next !== null 保证了 数组不是单个元素
  if (head && head.next !== null && reserveNode && reserveNode === head) {
    return true
  }
  return false
}
