import { ColorClasses, Status, UserRowProps } from '../utils/types'
import ChildCheckbox from './ChildCheckbox'

const createClassName = (status: Status): string => {
  const statusClassName =
    status === Status.active ? ColorClasses.green : ColorClasses.black
  return `ui ${statusClassName} label`
}

export default function UserRow({
  user,
  checkedFromParent,
  setParentCheckbox,
}: UserRowProps) {
  return (
    <tr key={user.name}>
      <td>
        <div className="ui checkbox">
          <ChildCheckbox
            checkedFromParent={checkedFromParent}
            setParentCheckbox={setParentCheckbox}
          />
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
