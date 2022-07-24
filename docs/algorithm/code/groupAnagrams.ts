/**
 * @author heart
 * @description
 * @Date 2022-07-18
 * @see https://leetcode.cn/problems/group-anagrams/
 */
export function groupAnagrams(strs: string[]): string[][] {
  // 存放一个一维的数组 key用于表示多少个长度
  const map = new Map<number[], string[]>()

  const getCharFromArray = (str: string): number[] => {
    const arr: number[] = new Array(26).fill(0)
    for (let j = 0; j < str.length; j++) {
      const index = str.charCodeAt(j) - 97
      arr[index]++
    }
    return arr
  }

  const hasContainer = (totalArray: number[], array: number[]): boolean => {
    for (let i = 0; i < array.length; i++) {
      if (totalArray[i] - array[i] < 0 || totalArray[i] - array[i] > 0) {
        return false
      }
    }
    return true
  }

  const hasAnagrams = (
    map: Map<number[], string[]>,
    arr: number[],
    strs: string
  ) => {
    // 遍历map 是否存在一样的索引值
    for (const [key] of map) {
      if (hasContainer(key, arr)) {
        const fakeArray = map.get(key)!
        fakeArray.push(strs)
        map.set(key, fakeArray)
        return
      }
    }
    map.set(arr, [strs])
  }

  for (let i = 0; i < strs.length; i++) {
    const arr = getCharFromArray(strs[i])
    if (map.size === 0) {
      map.set(arr, [strs[i]])
    } else {
      hasAnagrams(map, arr, strs[i])
    }
  }

  const result: Array<string[]> = []
  for (const [, value] of map) {
    result.push(value)
  }
  return result
}

// 排序 由于互为字母异位词的两个字符串包含的字母相同，因此对两个字符串分别进行排序之后得到的字符串一定是相同的，
// 故可以将排序之后的字符串作为哈希表的键
export function groupAnagramsCaseTwo(strs: string[]): string[][] {
  const map = new Map<string, string[]>()
  let data: string, tempMap: string[] | undefined
  for (let i = 0; i < strs.length; i++) {
    // 对每个字符串进行排序 之后 作为key值
    data = strs[i]
      .split('')
      .sort((a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0))
      .join('')
    if (map.has(data)) {
      tempMap = map.get(data)!
      tempMap.push(strs[i])
      map.set(data, tempMap)
    } else {
      map.set(data, [strs[i]])
    }
  }
  const result: Array<string[]> = []
  for (const [, value] of map) {
    result.push(value)
  }
  return result
}