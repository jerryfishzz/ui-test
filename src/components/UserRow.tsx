import { useCheckbox } from '../utils/customHooks'
import { ColorClasses, Status, UserRowProps } from '../utils/types'

const createClassName = (status: Status): string => {
  const statusClassName =
    status === Status.active ? ColorClasses.green : ColorClasses.black
  return `ui ${statusClassName} label`
}

export default function UserRow({
  user,
  checkedFromAbove,
  setSelected,
}: UserRowProps) {
  const [checked, , handleChange] = useCheckbox(checkedFromAbove, setSelected)

  return (
    <tr key={user.name}>
      <td>
        <div className="ui checkbox">
          <input type="checkbox" checked={checked} onChange={handleChange} />
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
