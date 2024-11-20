export interface Country {
  code: string,
  name: string
}

export function getCountry(code: string) : Country {
  if(!code) {
    return null
  }
  return allCountries.find(c => c.code.toUpperCase() == code.toUpperCase())
}

export const allCountries: Country[] = [
  { code: 'CM', name: 'Cameroun' },
  { code: 'CG', name: 'Congo Brazaville' },
  { code: 'CD', name: 'République démocratique du Congo' },
  { code: 'CI', name: 'Côte d\'Ivoire' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GQ', name: 'Guinée équatoriale' },
  { code: 'MU', name: 'Maurice' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigéria' },
  { code: 'CF', name: 'République centrafricaine' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'TD', name: 'Tchad' },
  { code: 'TG', name: 'Togo' },
  { code: 'UA', name: 'Ukraine' },

  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BJ', name: 'Bénin' },
  { code: 'AO', name: 'Angola' },
  { code: 'ZM', name: 'Zambie' },
  { code: 'ZW', name: 'Zimbabwe' },
  { code: 'TN', name: 'Tunisie' },
  { code: 'TH', name: 'Thaïlande' },
  { code: 'TZ', name: 'Tanzanie' },
  { code: 'CH', name: 'Suisse' },
]
