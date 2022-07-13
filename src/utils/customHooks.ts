import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const incrementSelected = (selected: number): number => selected + 1
const decrementSelected = (selected: number): number => {
  if (!selected) return selected
  return selected - 1
}

export const useCheckbox = (
  checkedFromAbove: boolean,
  setSelected?: Dispatch<SetStateAction<number>>
) => {
  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = () => {
    setChecked(prev => !prev)
  }

  // Synced with section checkbox state
  useEffect(() => {
    setChecked(checkedFromAbove)
  }, [checkedFromAbove])

  // Manipulate the indeterminate state of section and product checkboxes
  useEffect(() => {
    if (checked) {
      if (setSelected !== undefined) setSelected(incrementSelected)
    } else {
      if (setSelected !== undefined) setSelected(decrementSelected)
    }
  }, [checked, setSelected])

  return [checked, setChecked, handleChange] as const
}
