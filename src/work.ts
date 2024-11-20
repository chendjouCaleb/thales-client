export interface OccupationLevel {
  code: string,
  name: string
}

export function getOccupationLevel(code: string) : OccupationLevel {
  if(!code) {
    return null
  }
  return allOccupationLevels.find(c => c.code.toUpperCase() == code.toUpperCase())
}

export const allOccupationLevels: OccupationLevel[] = [
  { code: 'BEGINNER', name: 'Expérience limitée' },
  { code: 'INTERMEDIATE', name: 'Application pratique ' },
  { code: 'ADVANCE', name: 'Avancé' },
  { code: 'EXPERT', name: 'Expert' }
]
