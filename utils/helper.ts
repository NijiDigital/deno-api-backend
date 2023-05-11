export type AsPromise = <T>(value: T | Promise<T>) => Promise<T>
export type IsPromise = <T>(value: T | Promise<T>) => value is Promise<T>

export const asPromise: AsPromise = <T>(value: T | Promise<T>): Promise<T> =>
  isPromise(value) ? value : Promise.resolve(value)

export const isPromise: IsPromise = <T>(
  value: T | Promise<T>,
): value is Promise<T> =>
  typeof value === 'object' &&
  typeof (value as Promise<unknown>).then === 'function'

export const parseBoolean = (s: string | undefined): boolean | undefined => {
  if (s === 'true') {
    return true
  }
  if (s === 'false') {
    return false
  }
  return undefined
}
