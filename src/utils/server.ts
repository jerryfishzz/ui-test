import { Department, Status, User } from './types'

const store: User[] = [
  { name: 'Alex', department: Department.sales, status: Status.active },
  { name: 'Brian', department: Department.marketing, status: Status.active },
  {
    name: 'Caroline',
    department: Department.humanResources,
    status: Status.terminated,
  },
  { name: 'Diana', department: Department.support, status: Status.active },
  { name: 'Ernest', department: Department.product, status: Status.active },
  {
    name: 'Fred',
    department: Department.accounting,
    status: Status.terminated,
  },
]
