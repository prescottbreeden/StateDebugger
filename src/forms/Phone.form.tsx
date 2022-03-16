import { Box2, FieldText } from '@looker/components'
import React from 'react'
import { useForm } from '../hooks/useForm.hook'
import { FormProps, IFormContext, Phone } from '../types'
import { ValidationObject } from '@de-formed/base'
import { transformError } from '../utils'

export const PhoneForm: React.FC<FormProps<Phone>> = ({ data, onChange }) => {
  // fuck... this isn't going to work with dynamic forms
  const {
    phone: {
      getError,
      resetValidationState,
      validateAll,
      validateOnBlur,
      validateOnChange,
    },
    submitFailed,
    resetValidation,
  } = useForm() as IFormContext & { phone: ValidationObject<Phone> }

  React.useEffect(() => {
    submitFailed && validateAll(data)
  }, [submitFailed, data])

  React.useEffect(() => {
    resetValidationState()
  }, [resetValidation])

  return (
    <>
      <Box2>
        <FieldText
          label="Number"
          name="number"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(onChange, data)}
          validationMessage={transformError(getError('number'))}
          value={data.number}
        />
      </Box2>
      <Box2>
        <FieldText
          label="Description"
          name="description"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(onChange, data)}
          validationMessage={transformError(getError('description'))}
          value={data.description}
        />
      </Box2>
    </>
  )
}
