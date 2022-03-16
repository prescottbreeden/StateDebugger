import React from 'react'
import over from 'lodash/fp/over'
import { Box2, Button, Heading } from '@looker/components'
import { Contact, ContactFactory } from '../types'
import { ContactForm } from '../forms/Contact.form'
import { FormContext, useFormProvider } from '../hooks/useForm.hook'
import { Query } from '../App'
import { useContactValdiation } from '../hooks/useContactValidation.hook'

export const CreateContact: React.FC = () => {
  const [contact, setContact] = React.useState<Contact>(ContactFactory())
  const { validateAll } = useContactValdiation()
  const form = useFormProvider()

  const handleSubmit = () => {
    if (validateAll(contact)) {
      form.setSubmitFailed(false)
      Query(contact).then(form.setAPIerrors) // faked server call
    } else {
      form.setSubmitFailed(true)
    }
  }

  const handleReset = () => {
    setContact(ContactFactory())
    form.setResetValidation(!form.resetValidation)
    form.setSubmitFailed(false)
  }

  return (
    <>
      <FormContext.Provider value={form}>
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
