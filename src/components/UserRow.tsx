import { ColorClasses, Status, UserRowProps } from '../utils/types'

const createClassName = (status: Status): string => {
  const statusClassName =
    status === Status.active ? ColorClasses.green : ColorClasses.black
  return `ui ${statusClassName} label`
}

export default function UserRow({ user }: UserRowProps) {
  return (
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
        <span className={createClassName(user.status)}>{user.status}</span>
      </td>
    </tr>
  )
}
