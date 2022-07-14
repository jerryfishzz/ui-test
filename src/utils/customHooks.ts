import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const getIncrementSelected =
  (length: number) =>
  (selected: number): number =>
    selected + 1 > length ? length : selected + 1
const decrementSelected = (selected: number): number => {
  if (!selected) return selected
  return selected - 1
}

export const useCheckbox = (
  length: number,
  checkedFromAbove: boolean,
  setSelected?: Dispatch<SetStateAction<number>>
) => {
  const [checked, setChecked] = useState<boolean>(checkedFromAbove)

  const handleChange = () => {
    setChecked(prev => !prev)
  }

  // Synced with parent checkbox state
  useEffect(() => {
    setChecked(checkedFromAbove)
  }, [checkedFromAbove])

  // Manipulate the indeterminate state of parent checkbox
  useEffect(() => {
    const incrementSelected = getIncrementSelected(length)

    if (checked) {
      if (setSelected !== undefined) setSelected(incrementSelected)
    } else {
      if (setSelected !== undefined) setSelected(decrementSelected)
    }
  }, [checked, length, setSelected])

  return [checked, setChecked, handleChange] as const
}
