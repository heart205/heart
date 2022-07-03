interface debounce {
  timer?: number
  (func: any[]): any
}
export const debounce = (func: debounce, timer: number) => {
  func.timer = new Date().getTime()
  return function () {
    const date = new Date().getTime()
    if (date - func.timer! < timer) {
      return
    }
    func.timer = date
    return func.apply(this, arguments)
  }
}
