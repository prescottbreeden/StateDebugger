import React from 'react'
import over from 'lodash/fp/over'
import { Box2, Button, Heading } from '@looker/components'
import { useContactValdiation } from '../hooks/useContactValidation.hook'
import { ContactForm } from '../forms/Contact.form'
import { FormContext, useFormProvider } from '../hooks/useForm.hook'
import { Contact, ContactFactory } from '../types'
import { Query } from '../App'

export const CreateContact: React.FC = () => {
  const [contact, setContact] = React.useState<Contact>(ContactFactory())

  const formProps = useFormProvider()
  const {
    resetValidation,
    setSubmitFailed,
    setResetValidation,
    setAPIerrors,
  } = formProps

  const { validateAll } = useContactValdiation()

  const handleSubmit = () => {
    if (validateAll(contact)) {
      setSubmitFailed(false)
      Query(contact).then((response: any) => {
        setAPIerrors(response)
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
      <FormContext.Provider value={formProps}>
        <Box2 width="20rem" border="1px solid black">
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
    </>
  )
}
