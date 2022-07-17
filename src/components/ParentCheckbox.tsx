import { useEffect, useRef } from 'react'
import { ParentCheckboxProps } from '../utils/types'

export default function ParentCheckbox({
  users,
  parentCheckbox,
  setParentCheckbox,
}: ParentCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { max, checked, selected } = parentCheckbox

  const handleChange = () => {
    const userNames: string[] = []
    for (let i = 0; i < users.length; i++) {
      userNames.push(users[i].name)
    }

    setParentCheckbox(current => ({
      ...current,
      checked: !current.checked,
      selected:
        !current.checked === true
          ? new Set<string>(userNames)
          : new Set<string>(),
    }))
  }

  // Set indeterminate
  useEffect(() => {
    if (selected.size > 0 && selected.size < max) {
      if (inputRef.current) inputRef.current.indeterminate = true
    } else {
      if (inputRef.current) inputRef.current.indeterminate = false
    }
  }, [max, selected.size])

  // Set max when user counts change
  useEffect(() => {
    setParentCheckbox(current => ({
      ...current,
      max: users.length,
    }))
  }, [setParentCheckbox, users.length])

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
