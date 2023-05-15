interface SelectsValues {
  id: number
  name: string
}

export const genders: SelectsValues[] = [
  {
    id: 1,
    name: 'Masculino'
  },
  {
    id: 2,
    name: 'Femenino'
  },
  {
    id: 3,
    name: 'Otro'
  }
]

export const documentType: SelectsValues[] = [
  {
    id: 1,
    name: 'Pasaporte'
  },
  {
    id: 2,
    name: 'Cédula'
  },
  {
    id: 3,
    name: 'Cédula de extranjería'
  }
]
