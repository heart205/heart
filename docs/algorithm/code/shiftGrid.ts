/**
 * @author heart
 * @description 二维网格迁移
 * @Date 2022-07-20
 * @see: https://leetcode.cn/problems/shift-2d-grid/submissions/
 */
function shiftGrid(grid: number[][], k: number): number[][] {
  const total = grid.length * grid[0].length
  const result: Array<number[]> = Array.from({ length: grid.length }).map(
    () => []
  )
  /** 分别记录坐标点的x y值 */
  let row = 0,
    col = 0,
    count = k % total,
    tempCount = count
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      row = i
      col = j
      tempCount = count
      /** 当前的索引值 */
      while (tempCount > 0) {
        col++
        if (col >= grid[i].length) {
          col = 0
          row === grid.length - 1 ? (row = 0) : row++
        }
        tempCount--
      }
      result[row][col] = grid[i][j]
    }
  }
  return result
}

