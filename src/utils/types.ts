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