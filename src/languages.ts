import {allCountries, Country} from "./countries";

export interface LanguageLevel {
  code: string
  title: string
}

export function getLanguageLevel(code: string) : LanguageLevel {
  if(!code) {
    return null
  }
  return allLanguageLevels.find(c => c.code.toUpperCase() == code.toUpperCase())
}

export const allLanguageLevels: LanguageLevel[] = [
  {code: 'A1', title: 'Élémentaire • Découverte'},
  {code: 'A2', title: 'Élémentaire • Intermédiaire'},
  {code: 'B1', title: 'Indépendant • Seuil'},
  {code: 'B2', title: 'Indépendant • Avancé'},
  {code: 'C1', title: 'Expérimenté • Autonome'},
  {code: 'C2', title: 'Expérimenté • Maîtrise'},
]

export class LanguageDescriptor {
  code: string
  nameFr: string
}

export function getLanguageDescriptor(code: string) : LanguageDescriptor {
  if(!code) {
    return null
  }
  return allLanguageDescriptors.find(c => c.code.toUpperCase() == code.toUpperCase())
}

export const allLanguageDescriptors: LanguageDescriptor[] = [
  {code: 'ar', nameFr: 'Arabe' },
  {code: 'deu', nameFr: 'Allemand' },
  {code: 'eng', nameFr: 'Anglais' },
  {code: 'spa', nameFr: 'Espagnol' },
  {code: 'fra', nameFr: 'Français' },
  {code: 'heb', nameFr: 'Hébreu' },
  {code: 'hin', nameFr: 'Hindi' },
  {code: 'ind', nameFr: 'Indonésien' },
  {code: 'ita', nameFr: 'Italien' },
  {code: 'lat', nameFr: 'Latin' },
  {code: 'zho', nameFr: 'Chinois' }
]
