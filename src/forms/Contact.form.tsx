import React from 'react'
import { Box2, FieldText, Heading } from '@looker/components'
import { Contact, FormProps, Pet, Phone, PhoneFactory } from '../types'
import { StateDebugger } from '../components/StateDebugger.component'
import { DynamicForm } from './Dynamic.form'
import { ValidationState } from '@de-formed/base'
import { PetForm } from './Pet.form'
import { PhoneForm } from './Phone.form'
import { eventNameValue } from '@de-formed/base'
import { randomString, transformError } from '../utils'
import { useContactValdiation } from '../hooks/useContactValidation.hook'
import { useForm } from '../hooks/useForm.hook'

type APIerrors = {
  [key: string]: ValidationState
}

// --[ local utils ]-----------------------------------------------------------
const replacePhone = (list: Phone[]) => (b: Phone) => {
  return list.map((a: Phone) => (a.id === b.id ? b : a))
}

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

  const handleChange = (event: any): void =>
    onChange({
      ...data,
      ...eventNameValue(event),
    })

  const handlePetChange = (pet: Pet): void => onChange({ ...data, pet })

  const handleBffChange = (bestFriend: Contact): void =>
    onChange({ ...data, bestFriend })

  const addNewPhone = (): void =>
    onChange({
      ...data,
      phones: [...data.phones, { ...PhoneFactory(), id: randomString() }],
    })

  const deletePhone = (phone: Phone): void =>
    onChange({
      ...data,
      phones: data.phones.filter((existing: Phone) => phone.id !== existing.id),
    })

  const updatePhone = (phone: Phone): void =>
    onChange({
      ...data,
      phones: replacePhone(data.phones)(phone),
    })

  const mergeApiErrors = (errors: APIerrors): void =>
    setValidationState({
      ...validationState,
      ...errors[data.id],
    })

  React.useEffect(() => {
    submitFailed && validateAll(data)
  }, [submitFailed, data]) // eslint-disable-line

  React.useEffect(() => {
    APIerrors[data.id] && mergeApiErrors(APIerrors)
  }, [APIerrors, data.id]) // eslint-disable-line

  React.useEffect(() => {
    resetValidationState()
  }, [resetValidation]) // eslint-disable-line

  return (
    <>
      <StateDebugger state={data} setState={onChange} modalTitle={data.id} />
      <Box2 display="flex">
        <Box2 width="20rem" mr="1rem">
          <Heading mb="1rem">General Info</Heading>
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
            <Heading mb="1rem">Phone(s)</Heading>
            <DynamicForm
              addForm={addNewPhone}
              form={PhoneForm}
              items={data.phones}
              onChange={updatePhone}
              removeForm={deletePhone}
            />
          </Box2>
        </Box2>
        <Box2 ml="1rem" width="20rem">
          <Heading mb="1rem">Pet</Heading>
          <PetForm onChange={handlePetChange} data={data.pet} />
        </Box2>
      </Box2>
      {data.bestFriend && (
        <>
          <hr />
          <Heading my="1rem">Add Your BFF</Heading>
          <Box2 mb="1rem">
            <ContactForm data={data.bestFriend} onChange={handleBffChange} />
          </Box2>
        </>
      )}
    </>
  )
}
