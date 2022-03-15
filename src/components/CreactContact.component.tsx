import React from 'react'
import over from 'lodash/fp/over'
import { Box2, Button, Heading } from '@looker/components'
import { Contact, useContactValdiation } from './useContactValidation.hook'
import { ContactForm } from './Contact.form'
import { DebugState } from './DebugState.component'
import { Pet } from './usePetValidation.hook'
import { ValidationObject } from '@de-formed/base'
import { usePetValdiation } from './usePetValidation.hook'
import { useValidation } from '@de-formed/react-validations'

const usePhoneValidation = () => {
  return useValidation({
    number: [{ error: 'Err', validation: F }],
  })
}

const F = (_?: any) => false

const fakeAPIErrors = {
  contact: {
    firstName: {
      isValid: false,
      errors: ['Not Pac'],
    },
    lastName: {
      isValid: false,
      errors: ['Not Man'],
    },
  },
  pet: {
    name: {
      isValid: false,
      errors: ['Not Bob Ross'],
    },
    favoriteFood: {
      isValid: false,
      errors: ['Not Food'],
    },
  },
}

type IFormContext = {
  contactValidations: ValidationObject<Contact>
  petValidations: ValidationObject<Pet>
  phoneValidation: ValidationObject<string>
  submitFailed: boolean
  setSubmitFailed: (submitFailed: boolean) => void
  resetValidation: boolean
}

const FormContext = React.createContext<IFormContext>({} as IFormContext)

export const useForm = () => React.useContext(FormContext)

interface CreateContactProps {}
export const CreateContact: React.FC<CreateContactProps> = () => {
  const [submitFailed, setSubmitFailed] = React.useState(false)
  const [resetValidation, setResetValidation] = React.useState(false)
  const [contact, setContact] = React.useState<Contact>({
    firstName: '',
    lastName: '',
    email: '',
    phones: [],
    pet: {
      name: '',
      type: '',
      favoriteFood: '',
    },
  })
  const v = useContactValdiation()

  const stuff: IFormContext = {
    contactValidations: v,
    petValidations: usePetValdiation(),
    phoneValidation: usePhoneValidation(),
    submitFailed,
    setSubmitFailed,
    resetValidation,
  }

  const handleSubmit = () => {
    console.log('state', contact)
    if (v.validateAll(contact)) {
      setSubmitFailed(false)
      console.log('success')
      return false
        ? console.log('show success message')
        : (() => {
            stuff.petValidations.setValidationState(fakeAPIErrors.pet)
            v.setValidationState(fakeAPIErrors.contact)
          })()
    } else {
      setSubmitFailed(true)
    }
  }

  return (
    <>
      <FormContext.Provider value={stuff}>
        <DebugState
          state={contact}
          windowName="Contact Form State"
          darkMode={false}
          maxWidth={'20rem'}
        />
        <Box2 width="20rem">
          <Heading mb="1rem">Create Contact</Heading>
          <ContactForm data={contact} onChange={over([setContact])} />
          <div>
            {v.validationErrors.map((error) => (
              <p>{error}</p>
            ))}
          </div>
          <Box2 display="flex" justifyContent="flex-end" mt="1rem">
            <Button mr="1rem" onClick={handleSubmit}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Box2>
        </Box2>
      </FormContext.Provider>
    </>
  )
}
