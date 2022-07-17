import React, { useEffect, useState } from 'react'
import './App.css'
import ParentCheckbox from './components/ParentCheckbox'
import SelectedDropdown from './components/SelectedDropdown'
import UserRow from './components/UserRow'
import { duplicateSet } from './utils/helper'
import { getActiveUsers, getTerminatedUsers } from './utils/server'
import { AppStatus, ParentCheckboxState, Status, User } from './utils/types'

const compareFunc = (a: User, b: User) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.idle)

  const [terminated, setTerminated] = useState<boolean>(false)

  const [checkbox, setChechbox] = useState<ParentCheckboxState>({
    max: 0,
    checked: false,
    selected: new Set<string>(),
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

    setTerminated(current => !current)
  }

  useEffect(() => {
    setAppStatus(AppStatus.loading)

    if (!terminated) {
      getActiveUsers()
        .then(users => {
          setUsers(users)
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
            for (let i = 0; i < current.length; i++) {
              newUsersMap.set(current[i].name, current[i])
            }

            // Only add not existing users
            for (let i = 0; i < terminatedUsers.length; i++) {
              if (!newUsersMap.has(terminatedUsers[i].name))
                newUsersMap.set(terminatedUsers[i].name, terminatedUsers[i])
            }

            newUsersMap.forEach((value: User) => {
              newUsers.push(value)
            })

            return newUsers
          })
        })
        .catch(err => {
          console.log(err)
          setAppStatus(AppStatus.idle)
        })
    }

    setAppStatus(AppStatus.idle)
  }, [terminated])

  return (
    <div className="ui text container">
      <h1>UI Test</h1>

      {appStatus === AppStatus.loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            <div id="toggle-terminated" className="ui toggle checkbox">
              <input
                type="checkbox"
                checked={terminated}
                onChange={toggleTerminated}
              />
              <label>Show Terminated Employees</label>
            </div>
          </div>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="ui very basic table">
              <thead>
                <tr>
                  <th className="collapsing center aligned">
                    <ParentCheckbox
                      users={users}
                      parentCheckbox={checkbox}
                      setParentCheckbox={setChechbox}
                    />
                  </th>
                  <th>Name</th>
                  <th>Department</th>
                  <th className="right aligned">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.sort(compareFunc).map(user => (
                  <UserRow
                    key={user.name}
                    user={user}
                    checkedFromParent={checkbox.checked}
                    selected={checkbox.selected}
                    max={checkbox.max}
                    setParentCheckbox={setChechbox}
                  />
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      <SelectedDropdown
        text={
          checkbox.selected.size > 0
            ? ` ${checkbox.selected.size} selected`
            : ' '
        }
        selected={checkbox.selected.size}
      />
    </div>
  )
}

export default App
