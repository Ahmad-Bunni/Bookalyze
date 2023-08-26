export enum Role {
  USER = 'ADMIN',
  SYSTEM = 'USER',
}

export interface Message {
  text: string
  role: Role
  id: string
}
