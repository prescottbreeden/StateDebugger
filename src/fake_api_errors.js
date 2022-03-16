export const fakeAPIErrors = {
  contact: {
    firstName: {
      isValid: false,
      errors: ['Not Pac'],
    },
    lastName: {
      isValid: false,
      errors: ['Not Man'],
    },
  },
  phone1: {
    number: {
      isValid: false,
      errors: ['this is fake'],
    },
    description: {
      isValid: false,
      errors: ['you are a terrible person'],
    },
  },
  pet: {
    name: {
      isValid: false,
      errors: ['Not Bob Ross'],
    },
    favoriteFood: {
      isValid: false,
      errors: ['Not Food'],
    },
  },
}
