import { useValidation } from '@de-formed/react-validations'

export const usePhoneValidation = () => {
  return useValidation({
    number: [{ error: 'Err', validation: F }],
  })
}

const F = (_?: any) => false
