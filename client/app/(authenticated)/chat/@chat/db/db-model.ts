import { Message } from 'ai'
import Dexie, { Table } from 'dexie'

export class DB extends Dexie {
  messages!: Table<Message>
  constructor() {
    super('myDatabase')
    this.version(1).stores({
      messages: '++id, content, role, createdAt',
    })
  }
}

export const db = new DB()
