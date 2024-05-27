export interface UsersI{
  name: string
  surname: string
  email: string
  phone: string
}
export interface EventI{
  type: string| number,
  data: UsersI | string | UsersI[]
}
