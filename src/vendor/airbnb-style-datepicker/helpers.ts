/* eslint-disable */

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = (func: () => void, wait?: number, immediate?: boolean) => {
  var timeout: any = undefined;
  return function(this: any) {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args as any)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args as any)
  }
}

export const copyObject = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}

export const findAncestor = (element: HTMLElement | null, selector: string) => {
  if (!element) {
    return null
  }
  if (typeof element.closest === 'function') {
    return element.closest(selector) || null
  }
  while (element) {
    if (element.matches(selector)) {
      return element
    }
    element = element.parentElement
  }
  return null
}

export const randomString = (length: number) => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
