// store/chatStore.tsx
import { Message, nanoid } from 'ai'
import { create } from 'zustand'
import { Conversation, db } from '../db/db-model'

interface ChatStore {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  messages: Message[]
  fetchConversations: () => Promise<void>
  setSelectedConversation: (conversationId: string) => Promise<void>
  searchConversations: (term: string) => Promise<void>
  addNewConversation: () => Promise<void>
  appendMessage: (
    content: string,
    role: 'system' | 'user' | 'assistant' | 'function' | 'data' | 'tool',
  ) => Promise<void>
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],

  fetchConversations: async () => {
    const conversations = await db.conversations.toArray()
    set({ conversations })
  },

  setSelectedConversation: async (conversationId) => {
    const conversation = await db.conversations.get(conversationId)
    if (conversation) {
      set({ selectedConversation: conversation, messages: conversation.messages })
    }
  },

  searchConversations: async (term) => {
    const conversations = term
      ? await db.conversations.where('id').startsWithIgnoreCase(term).toArray()
      : await db.conversations.toArray()
    set({ conversations })
  },

  addNewConversation: async () => {
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
  },

  appendMessage: async (content, role) => {
    let { selectedConversation: currentConversation } = get()
    if (!currentConversation) {
      await get().addNewConversation()
      currentConversation = get().selectedConversation
    }
    if (currentConversation) {
      const message: Message = { id: nanoid(), content, role, createdAt: new Date() }
      const updatedMessages = [...currentConversation.messages, message]
      await db.conversations.update(currentConversation.id, { messages: updatedMessages })
      set({ messages: updatedMessages, selectedConversation: { ...currentConversation, messages: updatedMessages } })
    }
  },
}))
