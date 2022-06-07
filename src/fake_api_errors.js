export const fakeAPIErrors = {
  contact: {
    firstName: {
      isValid: false,
      errors: ['Not Bob.'],
    },
    lastName: {
      isValid: false,
      errors: ['Not Ross.'],
    },
  },
  phone1: {
    number: {
      isValid: false,
      errors: ['This is a fake phone.'],
    },
    description: {
      isValid: false,
      errors: ['How could you leave this blank?!'],
    },
  },
  pet: {
    name: {
      isValid: false,
      errors: ['Not Garfield.'],
    },
    favoriteFood: {
      isValid: false,
      errors: ['Crabs are friends not food.'],
    },
  },
  bestFriend: {
    firstName: {
      isValid: false,
      errors: ['You don\'t have any friends'],
    },
  },
  bestFriendPet: {
    name: {
      isValid: false,
      errors: ['Imaginary friends don\'t have pets.'],
    },
  },
}
