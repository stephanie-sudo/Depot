import React, { createContext, useContext, ReactNode } from 'react'

export type Messages = {
  [key: string]: string | Messages
}

type TranslationContextType = {
  messages: Messages
  locale: string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ 
  children, 
  messages, 
  locale 
}: { 
  children: ReactNode
  messages: Messages
  locale: string
}) {
  return (
    <TranslationContext.Provider value={{ messages, locale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslations(namespace?: string) {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider')
  }
  
  const { messages } = context

  return (key: string): string => {
    const keys = namespace ? `${namespace}.${key}` : key
    const parts = keys.split('.')
    let current: string | Messages = messages
    for (const k of parts) {
      if (typeof current !== 'object' || current === null || !(k in current)) {
        return key
      }
      current = (current as Messages)[k]
    }
    return typeof current === 'string' ? current : key
  }
}

export function useLocale() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useLocale must be used within a TranslationProvider')
  }
  return context.locale
}
