export interface SchoolLevel {
  code: string,
  name: string
}

export function getStudyLevel(code: string) : SchoolLevel {
  if(!code) {
    return null
  }
  return allStudyLevels.find(c => c.code == code.toUpperCase())
}

export const allStudyLevels: SchoolLevel[] = [
  { code: 'H0', name: 'CEP' },
  { code: 'H1', name: 'CEP + 1' },
  { code: 'H2', name: 'CEP + 2' },
  { code: 'H3', name: 'CEP + 3' },
  { code: 'H4', name: 'BEPC' },
  { code: 'H5', name: 'Seconde' },
  { code: 'H6', name: 'Probatoire' },
  { code: 'H7', name: 'Bacc + 0' },
  { code: 'H8', name: 'Bacc + 1' },
  { code: 'H9', name: 'Bacc + 2' },
  { code: 'H10', name: 'License' },
  { code: 'H11', name: 'Bacc + 4' },
  { code: 'H12', name: 'Bacc + 5' },
  { code: 'H13', name: 'Bacc + 6' },
  { code: 'H14', name: 'Bacc + 7' },
  { code: 'H15', name: 'Bacc + 8' },
]
