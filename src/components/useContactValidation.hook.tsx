import { useValidation } from '@de-formed/react-validations'
import { Pet, usePetValdiation } from './usePetValidation.hook'
const F = (_?: any) => false

export type Contact = {
  firstName: string
  lastName: string
  email: string
  pet: Pet
  phones: any[]
}
export const useContactValdiation = () => {
  const { validateAll: validatePet } = usePetValdiation()
  return useValidation<Contact>({
    firstName: [
      {
        error: 'First Name is required',
        validation: ({ firstName }) => firstName.length > 0,
      },
      {
        error: 'First Name must be at least 2 characters',
        validation: ({ firstName }) => firstName.length > 1,
      },
    ],
    lastName: [
      {
        error: 'Last Name is required',
        validation: ({ lastName }) => lastName.length > 0,
      },
      {
        error: 'Last Name must be at least 2 characters',
        validation: ({ lastName }) => lastName.length > 1,
      },
    ],
    email: [
      {
        error: 'Email is required',
        validation: ({ email }) => email.length > 0,
      },
    ],
    pet: [
      {
        error: 'Pet is not valid',
        validation: ({ pet }) => validatePet(pet),
      },
    ],
    phones: [
      {
        error: 'At least one valid phone number is required',
        validation: F,
      },
    ],
  })
}
