// ensure that an environment variable is set
export function guardEnv(name: string, value?: string) {
  const valueIsUndefined = typeof value === 'undefined'
  if (valueIsUndefined && typeof process.env[name] === 'undefined') {
    throw new Error(`${name} environment variable must be set.`)
  }

  return valueIsUndefined ? process.env[name] : value
}
