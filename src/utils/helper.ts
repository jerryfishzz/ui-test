import ts from 'typescript'

export const duplicateSet = (set: ts.Set<string>) => {
  const setArray: string[] = []
  set.forEach(value => setArray.push(value))

  return new Set<string>(setArray)
}
