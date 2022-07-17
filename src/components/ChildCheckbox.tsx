import { useEffect, useState } from 'react'
import { duplicateSet } from '../utils/helper'
import { ChildCheckboxState, ChildCheckboxProps } from '../utils/types'

export default function ChildCheckbox({
  user,
  checkedFromParent,
  selected,
  max,
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
    const selectedSize = selected.size
    const isSelected = selected.has(user.name)

    if ((max === selectedSize && isSelected) || selectedSize === 0) {
      console.log(max, selectedSize)
      setCheckbox({
        checked: checkedFromParent,
        fromParent: true,
      })
    }
  }, [checkedFromParent, max, selected, user.name])

  // Upward
  // Update parent selected when checked change is initialized by the component itself
  useEffect(() => {
    if (checkbox.checked) {
      if (checkbox.fromParent === false) {
        setParentCheckbox(current => {
          const nextSelected = duplicateSet(current.selected)
          nextSelected.add(user.name)

          return {
            ...current,
            checked: nextSelected.size === current.max ? true : current.checked,
            selected: nextSelected,
          }
        })
      }
    } else {
      if (checkbox.fromParent === false)
        setParentCheckbox(current => {
          const nextSelected = duplicateSet(current.selected)
          nextSelected.delete(user.name)

          return {
            ...current,
            checked: nextSelected.size === 0 ? false : current.checked,
            selected: nextSelected,
          }
        })
    }
  }, [checkbox.checked, checkbox.fromParent, setParentCheckbox, user.name])

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
