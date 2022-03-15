// import get from 'lodash/fp/get'
import React from 'react'
import flow from 'lodash/fp/flow'
import merge from 'lodash/fp/merge'
import { Box2, FieldSelect, FieldText } from '@looker/components'
import { DebugState } from './DebugState.component'
import { FormProps, IFormContext, Pet } from '../types'
import { ValidationObject } from '@de-formed/base'
import { createFakeEvent, eventNameValue } from '@de-formed/base'
import { transformError } from '../utils'
import { useForm } from './useForm.hook'

export const PetForm: React.FC<FormProps<Pet>> = ({ data, onChange }) => {
  const {
    pet: {
      getError,
      resetValidationState,
      validateAll,
      validateOnBlur,
      validateOnChange,
      validationState,
    },
    submitFailed,
    resetValidation,
  } = useForm() as IFormContext & { pet: ValidationObject<Pet> }

  const handleChange = flow(eventNameValue, merge(data), onChange)

  const options = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'bird', label: 'Bird' },
    { value: 'fish', label: 'Fish' },
    { value: 'crab', label: 'Crab' },
    { value: 'other', label: 'Other' },
  ]

  React.useEffect(() => {
    submitFailed && validateAll(data)
  }, [submitFailed, data])

  React.useEffect(() => {
    resetValidationState()
  }, [resetValidation])

  return (
    <>
      <DebugState
        state={validationState}
        darkMode={false}
        windowName="Pet Validation State"
      />
      <Box2 mb="1rem">
        <FieldText
          label="Name"
          name="name"
          onBlur={validateOnBlur(data)}
          onChange={handleChange}
          validationMessage={transformError(getError('name'))}
          value={data.name}
        />
      </Box2>
      <Box2 mb="1rem">
        <FieldText
          label="Favorite Food"
          name="favoriteFood"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(handleChange, data)}
          validationMessage={transformError(getError('favoriteFood'))}
          value={data.favoriteFood}
        />
      </Box2>
      <Box2 mb="1rem">
        <FieldSelect
          label="Pet Type"
          name="type"
          onBlur={validateOnBlur(data)}
          onChange={flow(
            createFakeEvent('type'),
            validateOnChange(handleChange, data)
          )}
          options={options}
          validationMessage={transformError(getError('type'))}
          value={data.type}
        />
      </Box2>
    </>
  )
}
