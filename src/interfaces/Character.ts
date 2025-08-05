export interface Character {
  'id': number
  'file-name': string
  'name': {
    'name-EUen': string
    'name-EUfr': string
  }
  'personality': string
  'birthday-string': string
  'specie': string
  'gender': string
  'hobby': string
}

// Types helper pour les filtres
export type FilterableProperty = 'gender' | 'hobby' | 'personality' | 'specie'
