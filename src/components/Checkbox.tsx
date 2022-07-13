import { useEffect, useRef } from 'react'
import { CheckboxProps } from '../utils/types'

export default function Checkbox({
  selected,
  length,
  checked,
  setChecked,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    setChecked(prev => !prev)
  }

  useEffect(() => {
    // The conditon here can avoid the loop bug
    // when both selected and length are 0.
    if (!selected) {
      setChecked(false)
      if (inputRef.current) inputRef.current.indeterminate = false
    } else if (selected > 0 && selected < length) {
      if (inputRef.current) inputRef.current.indeterminate = true
    } else if (selected === length) {
      // This condition should be only for when length is not 0
      setChecked(true)
      if (inputRef.current) inputRef.current.indeterminate = false
    }
  }, [length, selected, setChecked])

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
