import React, { useState } from 'react'
import './App.css'
import ParentCheckbox from './components/ParentCheckbox'
import SelectedDropdown from './components/SelectedDropdown'
import Switch from './components/Switch'
import UserRow from './components/UserRow'
import { useUsers } from './utils/customHooks'

import { AppStatus, ParentCheckboxState, User } from './utils/types'

const compareFunc = (a: User, b: User) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

function App() {
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.idle)

  const [checkbox, setChechbox] = useState<ParentCheckboxState>({
    max: 0,
    checked: false,
    selected: new Set<string>(),
  })

  // Server requests
  const [users, terminated, toggleTerminated] = useUsers(
    setChechbox,
    setAppStatus
  )

  return (
    <div className="ui text container">
      <h1>UI Test</h1>

      {appStatus === AppStatus.loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Switch
            checked={terminated}
            handleChange={toggleTerminated}
            label="Show Terminated Employees"
          />

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
