import { Dropdown, Transition } from 'semantic-ui-react'
import { SelectedDropdownProps } from '../utils/types'

const trigger = (text: string) => (
  <span>
    <i className="cog icon"></i>
    {text}
  </span>
)

const options = [
  { key: '1', text: 'Bulk Action 1' },
  { key: '2', text: 'Bulk Action 2' },
  { key: '3', text: 'Bulk Action 3' },
]

export default function SelectedDropdown({
  text,
  selected,
}: SelectedDropdownProps) {
  return (
    <Transition visible={selected !== 0}>
      <Dropdown
        trigger={trigger(text)}
        pointing
        icon={null}
        button
        disabled={selected === 0}
      >
        <Dropdown.Menu>
          {options.map(option => (
            <Dropdown.Item {...option} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Transition>
  )
}
