import { useEffect, useRef } from 'react'
import { ParentCheckboxProps } from '../utils/types'

export default function ParentCheckbox({
  parentCheckbox,
  setParentCheckbox,
}: ParentCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { max, checked, selected } = parentCheckbox

  const handleChange = () => {
    setParentCheckbox(current => ({
      ...current,
      checked: !current.checked,
      selected: !current.checked === true ? current.max : 0,
    }))
  }

  useEffect(() => {
    if (selected > 0 && selected < max) {
      if (inputRef.current) inputRef.current.indeterminate = true
    } else {
      if (inputRef.current) inputRef.current.indeterminate = false
    }
  }, [max, selected])

  return (
    <div className="ui checkbox">
      <input
        type="checkbox"
        checked={checked}
        ref={inputRef}
        onChange={handleChange}
      />
      <label></label>
    </div>
  )
}
