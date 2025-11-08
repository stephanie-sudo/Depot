import path from 'path'
import { promises as fs } from 'fs'
import type { Messages } from './i18n'

export async function serverSideTranslations(locale: string, namespaces: string[]): Promise<{ messages: Messages }> {
  const messages: Messages = {}
  for (const ns of namespaces) {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${ns}.json`)
    const data = await fs.readFile(filePath, 'utf8')
    ;(messages as Record<string, unknown>)[ns] = JSON.parse(data)
  }
  return { messages }
}
