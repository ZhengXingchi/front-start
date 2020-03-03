const getElementY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}

const scrollToElem = (elem, duration, offset) => {
  // 初始位置
  const startingY = window.pageYOffset
  const elementY = getElementY(elem)
  // 需要去滚动的距离
  const diff = elementY - startingY + offset
  if (!diff) return
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp
    }
    let time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + percent * diff)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
export {
  scrollToElem
}
