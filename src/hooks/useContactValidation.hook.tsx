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
 * the non-nested validations since they're just data
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

// TODO - this is a bit of a hack
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
        validation: ({ bestFriend }) => {
          // TODO - this is not a great way to do this

          // go until you can't go any further
          if (!bestFriend) {
            return true
          }

          // check if the nested types pass
          const nestedTypes = [
            validatePet(bestFriend.pet),
            bestFriend.phones.map((p) => validatePhone(p)).every(Boolean),
          ].every(Boolean)

          // TODO: to cond or not to cond?
          const nonNestedTypes = Object.keys(contactValidations).reduce(
            (acc: boolean, curr: string) => {
              if (contactValidations[curr]) {
                const valid = contactValidations[curr]
                  .map((v: any) => v.validation(bestFriend))
                  .every(Boolean)
                return acc ? valid : acc
              } else {
                return acc
              }
            },
            true
          )
          return nestedTypes && nonNestedTypes
        },
      },
    ],
  })
}
