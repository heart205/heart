/**
 * @author heart
 * @description
 * @Date 2022-07-24
 * @see https://leetcode.cn/problems/distance-between-bus-stops/
 */
export function distanceBetweenBusStops(
  distance: number[],
  start: number,
  destination: number
): number {
  let clockWiseDirection = 0
  let counterclockwise = 0

  let count = start
  while (count !== destination) {
    clockWiseDirection += distance[count]
    count++
    if (count === distance.length) {
      count = 0
    }
  }

  count = destination
  while (count !== start) {
    counterclockwise += distance[count]
    count++
    if (count === distance.length) {
      count = 0
    }
  }
  return Math.min(counterclockwise, clockWiseDirection)
}

