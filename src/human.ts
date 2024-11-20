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
