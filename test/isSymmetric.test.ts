var { TreeNode } = require('../docs/algorithm/code/trie/trieClass')
var { isSymmetric } = require('../docs/algorithm/code/isSymmetric')

describe('case', () => {
  it('[1,2,2,null,3,null,3]', () => {
    const left = new TreeNode(2, null, new TreeNode(3))
    const right = new TreeNode(2, null, new TreeNode(3))

    const root = new TreeNode(1, left, right)

    expect(isSymmetric(root)).toBe(false)
  })
})
