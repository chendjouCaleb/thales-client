export interface Sex {
  code: string,
  name: string
}

export const allSexes: Sex[] = [
  { code: 'F', name: 'Femme' },
  { code: 'M', name: 'Homme' }
]

export function getSex(code: string): Sex {
  if(!code) {
    return null;
  }
  //console.log(code)
  return allSexes.find(s => s.code === code.toUpperCase());
}

export const allMaritalStatuses: MaritalStatus[] = [
  {code: 'SINGLE', name: 'Célibataire'},
  {code: 'MARRIED', name: 'Marié'},
  {code: 'DIVORCED', name: 'Divorcé'},
]
export interface MaritalStatus {
  code : string,
  name: string
}

export function getMaritalStatus(code: string) : MaritalStatus {
  if(!code) {
    return null
  }
  return allMaritalStatuses.find(c => c.code == code.toUpperCase())
}
