import { useValidation } from '@de-formed/react-validations'
import { ValidationSchema } from '@de-formed/base'
import { Contact } from '../types'
import { usePetValdiation } from './usePetValidation.hook'
import { usePhoneValidation } from './usePhoneValidation.hook'

/**
 * Recursive Form Data Validations
 *
 * @Example
 * Contact type
 * {
 *   firstName: { string }
 *   lastName: { string }
 *   email: { string }
 *   pet: { Pet }
 *   phones: [{ Phone }]
 *   bestFriend: { Contact }
 * }
 *
 * Implementation:
 * All nested schema definitions are defined in the useValidation hook which
 * merges the non-nested schema definitions defined separately. The purpose of
 * separately defining the non-nested validations is to allow a helper function
 * to manually map over the nested and non-nested types when it goes to recurse
 * on the bestFriend property.
 */

// non-recursive schema properties
const contactBaseValidationSchema: ValidationSchema<Contact> = {
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
}

 // If a Contact has a best friend check both nested and non-nested properties
 // within the form data
const validateBestFriend =
  (validatePet: Function, validatePhone: Function) =>
  ({ bestFriend }: Contact) => {
    if (!bestFriend) return true

    // validate nested properties
    const validPetAndPhones = [
      validatePet(bestFriend.pet),
      bestFriend.phones.map((p) => validatePhone(p)).every(Boolean),
    ].every(Boolean)

    // reduce the contactValidations object applying the bestFriend data to
    // each validation property
    const baseValidations = Object.keys(contactBaseValidationSchema).reduce(
      (acc: boolean, curr: string) =>
        contactBaseValidationSchema[curr] && acc
          ? contactBaseValidationSchema[curr]
              .map((v: { validation: Function }) => v.validation(bestFriend))
              .every(Boolean)
          : acc,
      true
    )
    return validPetAndPhones && baseValidations
  }

export const useContactValdiation = () => {
  const { validateAll: validatePet } = usePetValdiation()
  const { validateAll: validatePhone } = usePhoneValidation()

  return useValidation<Contact>({
    ...contactBaseValidationSchema,
    pet: [
      {
        error: 'Pet is not valid',
        validation: ({ pet }: Contact) => validatePet(pet),
      },
    ],
    phones: [
      {
        error: 'At least one valid phone number is required',
        validation: ({ phones }: Contact) =>
          phones.map((p) => validatePhone(p)).every(Boolean),
      },
    ],
    bestFriend: [
      {
        error: 'Best Friend is not valid',
        validation: validateBestFriend(validatePet, validatePhone),
      },
    ],
  })
}
