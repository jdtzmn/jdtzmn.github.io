import { Ref, MutableRefObject, RefObject } from 'react'

// ensure that an environment variable is set
export function guardEnv(name: string, value?: string) {
  const valueIsUndefined = typeof value === 'undefined'
  if (valueIsUndefined && typeof process.env[name] === 'undefined') {
    throw new Error(`${name} environment variable must be set.`)
  }

  return valueIsUndefined ? process.env[name] : value
}

/**
 * @description Add https protocol if not part of the url string
 * @export
 * @param {string} url The url string to test
 * @returns {string} The url string prepended with `https:` if needed
 */
export function addHttpsIfNecessary(url: string): string {
  if (
    typeof url === 'string' &&
    !url.includes('https:') &&
    url.slice(0, 2) === '//'
  ) {
    return `https:${url}`
  }

  return url
}

/**
 * Merge a set of React refs into one ref to pass to the component
 *
 * @export
 * @param {...Array<Ref<any>>} refs A set of refs
 * @return {Ref<any>} A new "merged" ref
 */
export function mergeRefs(...refs: Array<Ref<any>>): Ref<any> {
  const filteredRefs = refs.filter(Boolean)

  switch (filteredRefs.length) {
    case 0:
      return null
    case 1:
      return filteredRefs[0]
    default:
  }

  return (inst: any) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst)
      } else if (ref) {
        ;(ref as MutableRefObject<any>).current = inst
      }
    }
  }
}
