import { Dispatch, SetStateAction } from 'react'

// States

export enum Status {
  active = 'Active',
  terminated = 'Terminated',
}

export enum Department {
  sales = 'Sales',
  marketing = 'Marketing',
  humanResources = 'Human Resources',
  support = 'Support',
  product = 'Product',
  accounting = 'Accounting',
}

export interface User {
  name: string
  department: Department
  status: Status
}

export enum AppStatus {
  loading,
  idle,
}

export interface Checkbox {
  max: number
  checked: boolean
  selected: number
}

/*****************************************************/

// Component props

export interface ParentCheckboxProps {
  parentCheckbox: Checkbox
  setParentCheckbox: Dispatch<SetStateAction<Checkbox>>
}

export interface UserRowProps {
  user: User
  checkedFromAbove: boolean
  length: number
  setSelected?: Dispatch<SetStateAction<number>>
}

/*****************************************************/

// Misc

export enum ColorClasses {
  green = 'green',
  black = 'black',
}
