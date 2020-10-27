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
  if (!url.includes('https:') && url.slice(0, 2) === '//') return `https:${url}`
  return url
}
