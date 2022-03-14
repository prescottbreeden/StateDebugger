import React from 'react'
import _ from 'lodash/fp/placeholder'
import flow from 'lodash/fp/flow'
import merge from 'lodash/fp/merge'
import { Contact, useContactValdiation } from './useContactValidation.hook'
import { PetForm } from './Pet.form'
import { TextInput } from '../form/TextInput.component'
import { eventNameValue } from '@de-formed/base'

export interface FormProps<T> {
  onChange: (value: T) => void
  state: T
}

const set = (key: string) => (obj: any) => ({ [key]: obj })

export const ContactForm: React.FC<FormProps<Contact>> = ({
  state,
  onChange,
}) => {
  const { getError, validateOnBlur, validateOnChange } = useContactValdiation()
  const handleChange = flow(eventNameValue, merge(state), onChange)
  const handlePetChange = flow(set('pet'), merge(state), onChange)

  return (
    <>
      <div>
        <TextInput
          onChange={validateOnChange(handleChange, state)}
          onBlur={validateOnBlur(state)}
          name="firstName"
          error={getError('firstName')}
          value={state.firstName}
        />
      </div>
      <div>
        <TextInput
          onChange={validateOnChange(handleChange, state)}
          onBlur={validateOnBlur(state)}
          name="lastName"
          error={getError('lastName')}
          value={state.lastName}
        />
      </div>
      <div>
        <TextInput
          onChange={validateOnChange(handleChange, state)}
          onBlur={validateOnBlur(state)}
          name="email"
          error={getError('email')}
          value={state.email}
        />
      </div>
      <PetForm onChange={handlePetChange} state={state.pet} />
    </>
  )
}
