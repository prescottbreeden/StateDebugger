// import get from 'lodash/fp/get'
import React from 'react'
import _ from 'lodash/fp/placeholder'
import flow from 'lodash/fp/flow'
import merge from 'lodash/fp/merge'
import type { Contact } from './useContactValidation.hook'
import type { FormProps } from '../types'
import { Box2, FieldText, Heading } from '@looker/components'
import { DebugState } from './DebugState.component'
import { PetForm } from './Pet.form'
import { eventNameValue } from '@de-formed/base'
import { set, transformError } from '../utils'
import { useForm } from './CreactContact.component'

export const ContactForm: React.FC<FormProps<Contact>> = ({
  data,
  onChange,
}) => {
  const {
    contactValidations: {
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

  const handlePetChange = flow(set('pet'), merge(data), onChange)

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
        windowName="Contact Validation State"
      />
      <Box2 mb="1rem">
        <FieldText
          label="First Name"
          name="firstName"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(handleChange, data)}
          validationMessage={transformError(getError('firstName'))}
          value={data.firstName}
        />
      </Box2>
      <Box2 mb="1rem">
        <FieldText
          label="Last Name"
          name="lastName"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(handleChange, data)}
          validationMessage={transformError(getError('lastName'))}
          value={data.lastName}
        />
      </Box2>
      <Box2 mb="1rem">
        <FieldText
          label="Email"
          name="email"
          onBlur={validateOnBlur(data)}
          onChange={validateOnChange(handleChange, data)}
          validationMessage={transformError(getError('email'))}
          value={data.email}
        />
      </Box2>
      <Heading mb="1rem">Add Pet</Heading>
      <PetForm onChange={handlePetChange} data={data.pet} />
    </>
  )
}
