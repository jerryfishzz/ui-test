import React, { useEffect, useState } from 'react'
import './App.css'
import { getUsers } from './utils/server'
import { User } from './utils/types'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers()
      .then(users => {
        console.log(users)
        setUsers(users)
      })
  })

  return (
    <div className="ui text container">
      <h1>UI Test</h1>

      <div>
        <div id="toggle-terminated" className="ui toggle checkbox">
          <input type="checkbox" />
          <label>Show Terminated Employees</label>
        </div>
      </div>

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
          <tr>
            <td>
              <div className="ui checkbox">
                <input type="checkbox" />
                <label></label>
              </div>
            </td>
            <td>Alex</td>
            <td>Sales</td>
            <td className="right aligned">
              <span className="ui green label">Active</span>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ui checkbox">
                <input type="checkbox" />
                <label></label>
              </div>
            </td>
            <td>Brian</td>
            <td>Marketing</td>
            <td className="right aligned">
              <span className="ui green label">Active</span>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ui checkbox">
                <input type="checkbox" />
                <label></label>
              </div>
            </td>
            <td>Caroline</td>
            <td>Human Resources</td>
            <td className="right aligned">
              <span className="ui black label">Terminated</span>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ui checkbox">
                <input type="checkbox" />
                <label></label>
              </div>
            </td>
            <td>Diana</td>
            <td>Support</td>
            <td className="right aligned">
              <span className="ui green label">Active</span>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ui checkbox">
                <input type="checkbox" />
                <label></label>
              </div>
            </td>
            <td>Ernest</td>
            <td>Product</td>
            <td className="right aligned">
              <span className="ui green label">Active</span>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ui checkbox">
                <input type="checkbox" />
                <label></label>
              </div>
            </td>
            <td>Fred</td>
            <td>Accounting</td>
            <td className="right aligned">
              <span className="ui black label">Terminated</span>
            </td>
          </tr>
        </tbody>
      </table>

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
