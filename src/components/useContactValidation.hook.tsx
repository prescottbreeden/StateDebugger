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
        error: 'First name is required',
        validation: ({ firstName }) => firstName.length > 0,
      },
    ],
    lastName: [
      {
        error: 'Last name is required',
        validation: ({ lastName }) => lastName.length > 0,
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
        error: 'Phone is required',
        validation: F,
      },
    ],
  })
}
