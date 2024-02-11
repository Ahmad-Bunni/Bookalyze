'use client'

import React, { createContext, useContext, useState } from 'react'

const initialContext = {
  isVisible: true,
  toggle: () => {},
}

const SidebarContext = createContext(initialContext)

export const useSidebar = () => {
  return useContext(SidebarContext)
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(initialContext.isVisible)
  const toggle = () => setIsVisible(!isVisible)

  return <SidebarContext.Provider value={{ isVisible, toggle }}>{children}</SidebarContext.Provider>
}
