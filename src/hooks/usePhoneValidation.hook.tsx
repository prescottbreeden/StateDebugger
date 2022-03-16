import { useValidation } from '@de-formed/react-validations'
import { Phone } from '../types'

export const usePhoneValidation = () => {
  return useValidation<Phone>({
    number: [
      {
        error: 'Phone must be 10 digits long',
        validation: ({ number }) => number.length === 10,
      },
    ],
  })
}
