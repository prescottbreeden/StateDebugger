import React from 'react'
import flow from 'lodash/fp/flow'
import merge from 'lodash/fp/merge'
import { Box2, FieldText, Heading } from '@looker/components'
import { Contact, FormProps, Phone, PhoneFactory } from '../types'
import { DebugState } from '../components/DebugState.component'
import { DynamicForm } from './Dynamic.form'
import { PetForm } from './Pet.form'
import { PhoneForm } from './Phone.form'
import { eventNameValue } from '@de-formed/base'
import { randomString, replaceItem, set, transformError } from '../utils'
import { useContactValdiation } from '../hooks/useContactValidation.hook'
import { useForm } from '../hooks/useForm.hook'

export const ContactForm: React.FC<FormProps<Contact>> = ({
  data,
  onChange,
}) => {
  const { APIerrors, submitFailed, resetValidation } = useForm()

  const {
    getError,
    resetValidationState,
    setValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
    validationState,
  } = useContactValdiation()

  const handleChange = flow(eventNameValue, merge(data), onChange)
  const handlePetChange = flow(set('pet'), merge(data), onChange)

  const addNewPhone = () =>
    onChange({
      ...data,
      phones: [...data.phones, { ...PhoneFactory(), id: randomString() }],
    })

  const deletePhone = (p1: Phone) => {
    const phones = data.phones.filter((p2: Phone) => {
      return p1.id !== p2.id
    })
    return onChange({ ...data, phones })
  }

  const updatePhone = flow(
    replaceItem(data.phones),
    set('phones'),
    merge(data),
    onChange
  )

  React.useEffect(() => {
    submitFailed && validateAll(data)
  }, [submitFailed, data])

  React.useEffect(() => {
    APIerrors[data.id] && setValidationState(APIerrors[data.id])
  }, [APIerrors])

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
      <DebugState
        state={validationState}
        darkMode={false}
        modalTitle="Contact Validation State"
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
        <Heading mb="1rem">Add Phone</Heading>
        <DynamicForm
          addForm={addNewPhone}
          form={PhoneForm}
          items={data.phones}
          onChange={updatePhone}
          removeForm={deletePhone}
        />
      </Box2>
      <Box2>
        <Heading mb="1rem">Add Pet</Heading>
        <PetForm onChange={handlePetChange} data={data.pet} />
      </Box2>
    </>
  )
}
