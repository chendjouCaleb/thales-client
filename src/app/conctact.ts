import {allCountries, Country} from "../countries";

export class ContactLabel {
  code: string
  name: string
}
export class AddressLabel {
  code: string
  name: string
}

export const allContactLabels: ContactLabel[] = [
  {code: 'MOBILE', name: 'Mobile' },
  { code: 'RESIDENCE', name: 'Domicile' },
  { code: 'PROFESSIONAL', name: 'Professionnel' },
  { code: 'OTHER', name: 'Autre' }
]


export const allAddressLabels: AddressLabel[] = [
  { code: 'RESIDENCE', name: 'Domicile' },
  { code: 'PROFESSIONAL', name: 'Professionnel' },
  { code: 'OTHER', name: 'Autre' }
]

export function getContactLabel(code: string) : ContactLabel {
  if(!code) {
    return null
  }
  return allContactLabels.find(c => c.code.toUpperCase() == code.toUpperCase())
}

export function getAddressLabel(code: string) : AddressLabel {
  if(!code) {
    return null
  }
  return allAddressLabels.find(c => c.code.toUpperCase() == code.toUpperCase())
}
