import { Message } from 'ai'
import Dexie, { Table } from 'dexie'

export interface Conversation {
  id: string
  messages: Message[]
  createdAt: Date
}

export class DB extends Dexie {
  conversations!: Table<Conversation>
  constructor() {
    super('myDatabase')
    this.version(1).stores({
      conversations: 'id, messages, createdAt',
    })
  }
}

export const db = new DB()
