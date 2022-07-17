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

export interface ParentCheckboxState {
  max: number
  checked: boolean
  selected: number
}

export interface ChildCheckboxState {
  checked: boolean
  fromParent: boolean
}

/*****************************************************/

// Component props

export interface ParentCheckboxProps {
  parentCheckbox: ParentCheckboxState
  setParentCheckbox: Dispatch<SetStateAction<ParentCheckboxState>>
}

export interface ChildCheckboxProps {
  checkedFromParent: boolean
  setParentCheckbox: Dispatch<SetStateAction<ParentCheckboxState>>
}

export interface UserRowProps {
  user: User
  checkedFromParent: boolean
  setParentCheckbox: Dispatch<SetStateAction<ParentCheckboxState>>
}

export interface SelectedDropdownProps {
  text: string
  selected: number
}

/*****************************************************/

// Misc

export enum ColorClasses {
  green = 'green',
  black = 'black',
}
