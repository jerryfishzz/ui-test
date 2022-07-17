import React, { useEffect, useState } from 'react'
import './App.css'
import ParentCheckbox from './components/ParentCheckbox'
import SelectedDropdown from './components/SelectedDropdown'
import UserRow from './components/UserRow'
import { getActiveUsers, getTerminatedUsers } from './utils/server'
import { AppStatus, ParentCheckboxState, User } from './utils/types'

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
    console.log('checked')
    setTerminated(current => !current)
  }

  useEffect(() => {
    setAppStatus(AppStatus.loading)

    if (!terminated) {
      getActiveUsers()
        .then(users => {
          // console.log(users)
          setUsers(users)

          setChechbox(current => ({
            ...current,
            max: users.length,
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

  // Set max when user counts change
  useEffect(() => {
    setChechbox(current => ({
      ...current,
      max: users.length,
    }))
  }, [users.length])

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
                {users.map(user => (
                  <UserRow
                    key={user.name}
                    user={user}
                    checkedFromParent={checkbox.checked}
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
