export const delay = (waitTime: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), waitTime)
  })
}
