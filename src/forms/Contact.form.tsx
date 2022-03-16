import React from 'react'
import flow from 'lodash/fp/flow'
import merge from 'lodash/fp/merge'
import type { Contact, FormProps, IFormContext } from '../types'
import { Box2, FieldText, Heading } from '@looker/components'
import { PetForm } from './Pet.form'
import { eventNameValue } from '@de-formed/base'
import { set, transformError } from '../utils'
import { useForm } from '../hooks/useForm.hook'
import { ValidationObject } from '@de-formed/base'
import { DynamicForm } from './Dynamic.form'
import { PhoneForm } from './Phone.form'
import { DebugState } from '../components/DebugState.component'

export const ContactForm: React.FC<FormProps<Contact>> = ({
  data,
  onChange,
}) => {
  const {
    contact: {
      getError,
      resetValidationState,
      validateAll,
      validateOnBlur,
      validateOnChange,
    },
    submitFailed,
    resetValidation,
  } = useForm() as IFormContext & { contact: ValidationObject<Contact> }

  const handleChange = flow(eventNameValue, merge(data), onChange)
  const handlePetChange = flow(set('pet'), merge(data), onChange)

  React.useEffect(() => {
    submitFailed && validateAll(data)
  }, [submitFailed, data])

  React.useEffect(() => {
    resetValidationState()
  }, [resetValidation])

  return (
    <>
      <DebugState
        state={data}
        darkMode={false}
        modalTitle="Contact Form State"
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
      <Box2 mb="1rem">
        <Heading mb="1rem">Add Phones</Heading>
        <DynamicForm
          addForm={() => null}
          form={PhoneForm}
          items={data.phones}
          onChange={() => null}
          removeForm={() => null}
        />
      </Box2>

      <Box2>
        <Heading mb="1rem">Add Pet</Heading>
        <PetForm onChange={handlePetChange} data={data.pet} />
      </Box2>
    </>
  )
}
