import { Dispatch, SetStateAction } from 'react'

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

export enum ColorClasses {
  green = 'green',
  black = 'black',
}

export interface CheckboxProps {
  selected: number
  length: number
  checked: boolean
  setChecked: Dispatch<SetStateAction<boolean>>
}

export interface UserRowProps {
  user: User
  checkedFromAbove: boolean
  length: number
  setSelected?: Dispatch<SetStateAction<number>>
}
