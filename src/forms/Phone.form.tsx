import React from 'react'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import merge from 'lodash/fp/merge'
import { Box2, FieldText } from '@looker/components'
import { FormProps, Phone } from '../types'
import { eventNameValue } from '@de-formed/base'
import { transformError } from '../utils'
import { useForm } from '../hooks/useForm.hook'
import { usePhoneValidation } from '../hooks/usePhoneValidation.hook'

export const PhoneForm: React.FC<FormProps<Phone>> = ({ data, onChange }) => {
  const { APIerrors, submitFailed, resetValidation } = useForm()

  const {
    getError,
    resetValidationState,
    setValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
    validationState,
  } = usePhoneValidation()

  const handleChange = flow(eventNameValue, merge(data), onChange)

  // merge the API errors with the current validationState
  const mergeApiErrors = flow(
    get(data.id),
    merge(validationState),
    setValidationState
  )

  React.useEffect(() => {
    submitFailed && validateAll(data)
  }, [submitFailed, data])

  React.useEffect(() => {
    APIerrors[data.id] && mergeApiErrors(APIerrors)
  }, [APIerrors])

  React.useEffect(() => {
    resetValidationState()
  }, [resetValidation])

  return (
    <>
      <Box2 mr="1rem" mb="1rem">
        <FieldText
          label="Number"
          name="number"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(handleChange, data)}
          validationMessage={transformError(getError('number'))}
          value={data.number}
        />
      </Box2>
      <Box2>
        <FieldText
          label="Description"
          name="description"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(handleChange, data)}
          validationMessage={transformError(getError('description'))}
          value={data.description}
        />
      </Box2>
    </>
  )
}
