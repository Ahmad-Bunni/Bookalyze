import { create } from 'zustand'

interface ChatBarStore {
  isVisible: boolean
  toggleVisibility: () => void
}

export const useChatBarStore = create<ChatBarStore>((set) => ({
  isVisible: true,

  toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
}))
