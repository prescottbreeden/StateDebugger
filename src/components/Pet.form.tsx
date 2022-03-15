import React from 'react'
import _ from 'lodash/fp/placeholder'
import flow from 'lodash/fp/flow'
// import get from 'lodash/fp/get'
import merge from 'lodash/fp/merge'
import { Box2, FieldSelect, FieldText } from '@looker/components'
import { DebugState } from './DebugState.component'
import { FormProps } from '../types'
import type { Pet } from './usePetValidation.hook'
import { createFakeEvent, eventNameValue } from '@de-formed/base'
import { transformError } from '../utils'
import { useForm } from './CreactContact.component'

export const PetForm: React.FC<FormProps<Pet>> = ({ data, onChange }) => {
  const {
    petValidations: {
      getError,
      resetValidationState,
      validateAll,
      validateOnBlur,
      validateOnChange,
      validationState,
    },
    submitFailed,
    resetValidation,
  } = useForm()

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
    resetValidation && resetValidationState()
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
