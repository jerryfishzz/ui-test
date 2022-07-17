import ts from 'typescript'
import { User } from './types'

export const duplicateSet = (set: ts.Set<string>) => {
  const setArray: string[] = []
  set.forEach(value => setArray.push(value))

  return new Set<string>(setArray)
}

export const compareUserName = (a: User, b: User) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}
