import { Dispatch, SetStateAction } from 'react'
import ts from 'typescript'

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
  selected: ts.Set<string>
}

export interface ChildCheckboxState {
  checked: boolean
  fromParent: boolean
}

/*****************************************************/

// Component props

export interface ParentCheckboxProps {
  users: User[]
  parentCheckbox: ParentCheckboxState
  setParentCheckbox: Dispatch<SetStateAction<ParentCheckboxState>>
}

export interface ChildCheckboxProps {
  user: User
  checkedFromParent: boolean
  selected: ts.Set<string>
  max: number
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
