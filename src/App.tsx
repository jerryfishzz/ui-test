import React, { useEffect, useState } from 'react'
import './App.css'
import ParentCheckbox from './components/ParentCheckbox'
import UserRow from './components/UserRow'
import { getUsers } from './utils/server'
import { AppStatus, ParentCheckboxState, User } from './utils/types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.idle)

  const [checkbox, setChechbox] = useState<ParentCheckboxState>({
    max: 0,
    checked: false,
    selected: 0,
  })

  useEffect(() => {
    setAppStatus(AppStatus.loading)
    getUsers()
      .then(users => {
        // console.log(users)
        setUsers(users)

        setChechbox(current => ({
          ...current,
          max: users.length,
        }))

        setAppStatus(AppStatus.idle)
      })
      .catch(err => {
        console.log(err)
        setAppStatus(AppStatus.idle)
      })
  }, [])

  return (
    <div className="ui text container">
      <h1>UI Test</h1>

      {appStatus === AppStatus.loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            <div id="toggle-terminated" className="ui toggle checkbox">
              <input type="checkbox" />
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

      <div>
        <button
          id="bulk-actions"
          className="ui disabled pointing dropdown button"
        >
          <span>
            <i className="cog icon"></i>
          </span>
          <div className="menu">
            <div className="item">Bulk Action 1</div>
            <div className="item">Bulk Action 2</div>
            <div className="item">Bulk Action 3</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default App
