export const localStore = ({ ns }: { ns: string }) => {
  const storeKeyPrefix = `${ns}:`
  const getStoreKey = (key: string) => `${storeKeyPrefix}${key}`
  const generateId = () => {
    const idKey = `ids:${ns}`
    const existingIdString = localStorage.getItem(idKey)
    const id = (existingIdString ? Number(existingIdString) : 0) + 1
    const newIdString = `${id}`
    localStorage.setItem(idKey, newIdString)
    return newIdString
  }
  const getItem = <T>(key: string): T | undefined => {
    const storeKey = getStoreKey(key)
    const valueString = localStorage.getItem(storeKey) || undefined
    return valueString ? JSON.parse(valueString) as T : undefined
  }
  const getItems = <T>(): T[] => {
    const keyIndexes = [...Array(localStorage.length).keys()]
    return keyIndexes.reduce((items, index) => {
      const key = localStorage.key(index)
      const value = key && key.startsWith(storeKeyPrefix) &&
          getItem<T>(key.substring(storeKeyPrefix.length)) || undefined
      return value ? [...items, value] : items
    }, [] as T[])
  }
  const setItem = <T>(key: string, value: T) => {
    const valueString = JSON.stringify(value)
    const storeKey = getStoreKey(key)
    localStorage.setItem(storeKey, valueString)
  }
  const removeItem = (key: string) => {
    const item = getItem(key)
    if (!item) {
      return false
    }
    const storeKey = getStoreKey(key)
    localStorage.removeItem(storeKey)
    return true
  }
  const removeItems = () => {
    const indexes = [...Array(localStorage.length).keys()]
    const storeKeysToRemove = indexes.reduce((acc, index) => {
      const storeKey = localStorage.key(index)
      return storeKey && storeKey.startsWith(storeKeyPrefix)
        ? [...acc, storeKey]
        : acc
    }, [] as string[])
    storeKeysToRemove.forEach((storeKey) => {
      localStorage.removeItem(storeKey)
    })
  }
  return {
    generateId,
    getItem,
    getItems,
    setItem,
    removeItem,
    removeItems,
  }
}
