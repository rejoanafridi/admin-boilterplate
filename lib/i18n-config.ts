export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export type LocaleResource = Record<Locale, () => Promise<Record<string, any>>>

export function getLocaleResource(namespace: string): LocaleResource {
  return {
    en: () => import(`../messages/en.json`).then((module) => module.default),
    de: () => import(`../messages/de.json`).then((module) => module.default),
  }
}
