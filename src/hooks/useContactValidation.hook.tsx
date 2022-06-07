import { useValidation } from '@de-formed/react-validations'
import { Contact } from '../types'
import { usePetValdiation } from './usePetValidation.hook'
import { usePhoneValidation } from './usePhoneValidation.hook'

/**
 * While not exactly glamorous, this would validate recursive types that have
 * nested types (oofta... what a use case...)
 *
 * All non-nested validations are defined in an object
 * All nested validations are defined in the useValidation hook which spreads
 * the non-nested validations since they're just objects
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
 */

// TODO - this is a bit of a hack -- however it does kinda emphasize you can
// really do just about anything you want with weird edge cases
const contactValidations: { [key: string]: any } = {
  firstName: [
    {
      error: 'First Name is required',
      validation: ({ firstName }: Contact) => firstName.length > 0,
    },
    {
      error: 'First Name must be at least 2 characters',
      validation: ({ firstName }: Contact) => firstName.length > 1,
    },
  ],
  lastName: [
    {
      error: 'Last Name is required',
      validation: ({ lastName }: Contact) => lastName.length > 0,
    },
    {
      error: 'Last Name must be at least 2 characters',
      validation: ({ lastName }: Contact) => lastName.length > 1,
    },
  ],
  email: [
    {
      error: 'Email is required',
      validation: ({ email }: Contact) => email.length > 0,
    },
  ],
}

/**
 * If a Contact has a best friend, check both nasted and non-nested data types
 * within the form data. Otherwise return true.
 */
export const validateBestFriend =
  (validatePet: Function, validatePhone: Function) =>
  ({ bestFriend }: Contact) => {
    if (!bestFriend) {
      return true
    }

    const nestedTypes = [
      validatePet(bestFriend.pet),
      bestFriend.phones.map((p) => validatePhone(p)).every(Boolean),
    ].every(Boolean)

    // reduce the contactValidations object applying the bestFriend data to each
    // validation property
    const nonNestedTypes = Object.keys(contactValidations).reduce(
      (acc: boolean, curr: string) => {
        if (contactValidations[curr]) {
          const valid = contactValidations[curr]
            .map((v: { validation: Function }) => v.validation(bestFriend))
            .every(Boolean)
          return acc ? valid : acc
        } else {
          return acc
        }
      },
      true
    )
    return nestedTypes && nonNestedTypes
  }

// This is the actual hook that has been broken up by responsibilities
export const useContactValdiation = () => {
  const { validateAll: validatePet } = usePetValdiation()
  const { validateAll: validatePhone } = usePhoneValidation()

  return useValidation<Contact>({
    ...contactValidations,
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
