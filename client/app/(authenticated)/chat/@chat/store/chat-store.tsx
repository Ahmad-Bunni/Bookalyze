import { Message, nanoid } from 'ai'
import { create } from 'zustand'
import { Conversation, db } from '../db/db-model'

interface ChatStore {
  conversations: Conversation[]
  currentConversation: Conversation | null
  fetchConversations: () => Promise<void>
  setConversation: (conversationId: string) => Promise<void>
  resetConversation: () => void
  searchConversations: (term: string) => Promise<void>
  appendMessage: (
    content: string,
    role: 'system' | 'user' | 'assistant' | 'function' | 'data' | 'tool',
  ) => Promise<void>
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  currentConversation: null,

  fetchConversations: async () => {
    const conversations = await db.conversations.toArray()
    set({ conversations })
  },

  setConversation: async (conversationId) => {
    const current = get().currentConversation
    if (current && current.id === conversationId) return

    const conversation = await db.conversations.get(conversationId)
    if (conversation) {
      set({ currentConversation: conversation })
    }
  },

  resetConversation: () => {
    set({ currentConversation: null })
  },

  searchConversations: async (term) => {
    const conversations = term
      ? await db.conversations.where('id').startsWithIgnoreCase(term).toArray()
      : await db.conversations.toArray()
    set({ conversations })
  },

  appendMessage: async (content, role) => {
    let { currentConversation } = get()

    if (!currentConversation) {
      const newConversation: Conversation = {
        id: nanoid(),
        createdAt: new Date(),
        messages: [],
      }

      await db.conversations.add(newConversation)

      set((state) => ({
        conversations: [...state.conversations, newConversation],
        selectedConversation: newConversation,
      }))

      currentConversation = newConversation
    }

    if (currentConversation) {
      const message: Message = { id: nanoid(), content, role, createdAt: new Date() }
      currentConversation.messages.push(message)
      await db.conversations.update(currentConversation.id, currentConversation)
      set({ currentConversation })
    }
  },
}))
