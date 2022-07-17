import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { duplicateSet } from './helper'
import { getActiveUsers, getTerminatedUsers } from './server'
import { AppStatus, ParentCheckboxState, Status, User, Users } from './types'

export const useUsers = (
  setChechbox: Dispatch<SetStateAction<ParentCheckboxState>>,
  setAppStatus: Dispatch<SetStateAction<AppStatus>>
) => {
  const [{ users, terminated }, setUsers] = useState<Users>({
    users: [],
    terminated: false,
  })

  const toggleTerminated = () => {
    if (terminated) {
      // To active
      const terminatedUserNames: string[] = users
        .filter(user => user.status === Status.terminated)
        .map(user => user.name)

      if (terminatedUserNames.length > 0) {
        setChechbox(current => {
          const nextSelected = duplicateSet(current.selected)

          // Remove terminated from selected
          for (let i = 0; i < terminatedUserNames.length; i++) {
            nextSelected.delete(terminatedUserNames[i])
          }

          const nextMax = current.max - terminatedUserNames.length

          return {
            selected: nextSelected,
            max: nextMax,
            checked:
              nextSelected.size === 0
                ? false
                : nextSelected.size === nextMax
                ? true
                : current.checked,
          }
        })
      }
    }

    setUsers(current => ({
      ...current,
      terminated: !current.terminated,
    }))
  }

  useEffect(() => {
    setAppStatus(AppStatus.loading)

    if (!terminated) {
      getActiveUsers()
        .then(users => {
          setUsers(current => ({
            ...current,
            users,
          }))
        })
        .catch(err => {
          console.log(err)
          setAppStatus(AppStatus.idle)
        })
    } else {
      getTerminatedUsers()
        .then(terminatedUsers => {
          setUsers(current => {
            let newUsers: User[] = []

            const newUsersMap = new Map<string, User>()
            for (let i = 0; i < current.users.length; i++) {
              newUsersMap.set(current.users[i].name, current.users[i])
            }

            // Only add not existing users
            for (let i = 0; i < terminatedUsers.length; i++) {
              if (!newUsersMap.has(terminatedUsers[i].name))
                newUsersMap.set(terminatedUsers[i].name, terminatedUsers[i])
            }

            newUsersMap.forEach((value: User) => {
              newUsers.push(value)
            })

            return {
              ...current,
              users: newUsers,
            }
          })
        })
        .catch(err => {
          console.log(err)
          setAppStatus(AppStatus.idle)
        })
    }

    setAppStatus(AppStatus.idle)
  }, [setAppStatus, terminated])

  return [users, terminated, toggleTerminated] as const
}
