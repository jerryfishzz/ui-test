import React, { useEffect, useState } from 'react'
import './App.css'
import { getUsers } from './utils/server'
import { AppStatus, User, Status, ColorClasses } from './utils/types'

const createClassName = (status: Status): string => {
  const statusClassName =
    status === Status.active ? ColorClasses.green : ColorClasses.black
  return `ui ${statusClassName} label`
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.idle)

  useEffect(() => {
    setAppStatus(AppStatus.loading)
    getUsers()
      .then(users => {
        console.log(users)
        setUsers(users)
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
                    <div className="ui checkbox">
                      <input type="checkbox" />
                      <label></label>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Department</th>
                  <th className="right aligned">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.name}>
                    <td>
                      <div className="ui checkbox">
                        <input type="checkbox" />
                        <label></label>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.department}</td>
                    <td className="right aligned">
                      <span className={createClassName(user.status)}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
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
