interface debounce {
  (func: any[]): any
}
export const debounce = (func: debounce, timer: number) => {
  let time
  return function () {
    clearTimeout(time)
    time = setTimeout(() => {
      func.apply(this, arguments)
    }, timer)
  }
}

interface throttle {
  (func: any[]): any
}
export const throttle = (func: throttle, timer: number) => {
  let time = 0
  return function () {
    let date = Date.now()
    if (date - time < timer) {
      return
    }
    time = date
    return func.apply(this, arguments)
  }
}
