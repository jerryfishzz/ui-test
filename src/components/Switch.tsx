import { SwitchProps } from '../utils/types'

export default function Switch({ checked, handleChange, label }: SwitchProps) {
  return (
    <div>
      <div id="toggle-terminated" className="ui toggle checkbox">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <label>{label}</label>
      </div>
    </div>
  )
}
