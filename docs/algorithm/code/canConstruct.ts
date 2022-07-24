/**
 * @author heart
 * @description
 * @Date 2022-07-18
 */

export function canConstruct(ransomNote: string, magazine: string): boolean {
  // 用于存储26个字符
  const stringArray: number[] = new Array(26).fill(0)

  for (let i = 0; i < magazine.length; i++) {
    const index = magazine.charCodeAt(i) - 97
    stringArray[index]++
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const index = ransomNote.charCodeAt(i) - 97
    stringArray[index]--
    if (stringArray[index] < 0) {
      return false
    }
  }
  return true
}
