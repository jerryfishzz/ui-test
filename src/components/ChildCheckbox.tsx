import { useEffect, useState } from 'react'
import ts from 'typescript'
import { ChildCheckboxState, ChildCheckboxProps } from '../utils/types'

const getNextSelected = (currentSelected: ts.Set<string>) => {
  const nextSelected: string[] = []
  currentSelected.forEach(value => nextSelected.push(value))

  return new Set<string>(nextSelected)
}

export default function ChildCheckbox({
  user,
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
          const nextSelected = getNextSelected(current.selected)
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
          const nextSelected = getNextSelected(current.selected)
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
