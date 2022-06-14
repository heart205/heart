---
title: 'string algorithm'
---

## 字符串模式匹配

- [890. 查找和替换模式](https://leetcode.cn/problems/find-and-replace-pattern/)

  利用 hashMap 实现字符串的双向映射，完成模式匹配。

  > 模式匹配模版:

```ts
function findAndReplacePattern(words: string[], pattern: string): string[] {
  const result: string[] = []
  for (let i = 0; i < words.length; i++) {
    if (words[i].length !== pattern.length) continue
    if (match(words[i], pattern) && match(pattern, words[i])) {
      result.push(words[i])
    }
  }
  return result
}

// 需要words和pattern调换 才能比较字符串格式是否一样
function match(words: string, pattern: string): boolean {
  // 遍历words 判断映射是否都存在
  const map = new Map<string, string>()
  for (let i = 0; i < words.length; i++) {
    const x = words.charAt(i)
    const y = pattern.charAt(i)
    // 不存在添加映射
    if (!map.has(x)) {
      map.set(x, y)
    } else if (map.get(x) != y) {
      return false
    }
  }
  return true
}
```
