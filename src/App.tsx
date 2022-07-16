import React, { useEffect, useState } from 'react'
import './App.css'
import ParentCheckbox from './components/ParentCheckbox'
import UserRow from './components/UserRow'
import { getUsers } from './utils/server'
import { AppStatus, User } from './utils/types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.idle)

  const [selected, setSelected] = useState<number>(0)
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    setAppStatus(AppStatus.loading)
    getUsers()
      .then(users => {
        // console.log(users)
        setUsers(users)

        // When initial value of checked is true, enable this line
        // setSelected(users.length)

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
                      selected={selected}
                      length={users.length}
                      checked={checked}
                      setChecked={setChecked}
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
                    checkedFromAbove={checked}
                    setSelected={setSelected}
                    length={users.length}
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
