import React from 'react'
import over from 'lodash/fp/over'
import { Box2, Button, Heading } from '@looker/components'
import { useContactValdiation } from '../hooks/useContactValidation.hook'
import { usePhoneValidation } from '../hooks/usePhoneValidation.hook'
import { ContactForm } from '../forms/Contact.form'
import { usePetValdiation } from '../hooks/usePetValidation.hook'
import { FormProvider } from '../hooks/useForm.hook'
import { Contact, ContactFactory } from '../types'
import { Query } from '../App'
import { DebugState } from './DebugState.component'

interface CreateContactProps {}
export const CreateContact: React.FC<CreateContactProps> = () => {
  const [contact, setContact] = React.useState<Contact>(ContactFactory())

  const formProps = FormProvider()
  const { FormContext, resetValidation, setSubmitFailed, setResetValidation } =
    formProps

  const validations = {
    contact: useContactValdiation(),
    pet: usePetValdiation(),
    phone: usePhoneValidation(),
  }

  const handleSubmit = () => {
    if (validations.contact.validateAll(contact)) {
      setSubmitFailed(false)
      Query(contact).then((response: any) => {
        validations.contact.setValidationState(response.contact)
        validations.pet.setValidationState(response.pet)
      })
    } else {
      setSubmitFailed(true)
    }
  }

  const handleReset = () => {
    setContact(ContactFactory())
    setResetValidation(!resetValidation)
    setSubmitFailed(false)
  }

  return (
    <>
      <DebugState
        darkMode={false}
        modalTitle="Contact Validation State"
        state={validations.contact.validationState}
      >
        <FormContext.Provider value={{ ...formProps, ...validations }}>
          <Box2 width="20rem">
            <Heading mb="1rem">Create Contact</Heading>
            <ContactForm data={contact} onChange={over([setContact])} />
            <Box2 display="flex" justifyContent="flex-end" mt="1rem">
              <Button mr="1rem" onClick={handleReset}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </Box2>
          </Box2>
        </FormContext.Provider>
      </DebugState>
    </>
  )
}
