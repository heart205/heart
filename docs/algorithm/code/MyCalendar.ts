// 前缀和
class MyCalendar {
  constructor(private array: Array<[number, number]> = []) {}

  // 直接
  book(start: number, end: number): boolean {
    if (this.array.length === 0) {
      this.array.push([start, end])
      return true
    }

    // 当前的start不能在任何区间中 当前的end不能在任何的头部中
    // [s1, e1) [s2,e2) 没有交集的话 则一定有 s1 >= e2 || s2 >=e1
    for (let i = 0; i < this.array.length; i++) {
      if (start >= this.array[i][1] || this.array[i][1] >= end) {
        continue
      }
      // 产生交集
      return false
    }

    this.array.push([start, end])

    return true
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
