import { useEffect, useState } from 'react'
import { ChildCheckboxState, ChildCheckboxProps } from '../utils/types'

export default function ChildCheckbox({
  checkedFromParent,
  setParentCheckbox,
}: ChildCheckboxProps) {
  const [checkbox, setCheckbox] = useState<ChildCheckboxState>({
    checked: false,
    fromParent: true,
  })

  const handleChange = () => {
    setCheckbox(current => ({
      checked: !current.checked,
      fromParent: false,
    }))
  }

  // Downward
  // Sync parent checkbox
  useEffect(() => {
    setCheckbox({
      checked: checkedFromParent,
      fromParent: true,
    })
  }, [checkedFromParent])

  // Upward
  // Update parent selected when checked change is initialized by the component itself
  useEffect(() => {
    if (checkbox.checked) {
      if (checkbox.fromParent === false) {
        setParentCheckbox(current => {
          const nextSelected = current.selected + 1

          return {
            ...current,
            checked: nextSelected >= current.max ? true : current.checked,
            selected: nextSelected >= current.max ? current.max : nextSelected,
          }
        })
      }
    } else {
      if (checkbox.fromParent === false)
        setParentCheckbox(current => {
          const nextSelected = current.selected - 1

          return {
            ...current,
            checked: nextSelected <= 0 ? false : current.checked,
            selected: nextSelected <= 0 ? 0 : nextSelected,
          }
        })
    }
  }, [checkbox.checked, checkbox.fromParent, setParentCheckbox])

  return (
    <>
      <input
        type="checkbox"
        checked={checkbox.checked}
        onChange={handleChange}
      />
      <label></label>
    </>
  )
}
