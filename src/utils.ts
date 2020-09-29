// ensure that an environment variable is set
export function guardEnv(name: string) {
  if (typeof process.env[name] === 'undefined') {
    throw new Error(`${name} environment variable must be set.`)
  }

  return process.env[name]
}
