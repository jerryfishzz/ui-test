import { ChildCheckboxProps, ColorClasses, Status } from '../utils/types'
import ChildCheckbox from './ChildCheckbox'

const createClassName = (status: Status): string => {
  const statusClassName =
    status === Status.active ? ColorClasses.green : ColorClasses.black
  return `ui ${statusClassName} label`
}

export default function UserRow({
  user,
  checkedFromParent,
  selected,
  max,
  setParentCheckbox,
}: ChildCheckboxProps) {
  return (
    <tr key={user.name}>
      <td>
        <div className="ui checkbox">
          <ChildCheckbox
            user={user}
            checkedFromParent={checkedFromParent}
            selected={selected}
            max={max}
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
