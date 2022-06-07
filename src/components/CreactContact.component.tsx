import React from 'react'
import { Box2, Button, Heading } from '@looker/components'
import { Contact, ContactFactory, PetFactory, PhoneFactory } from '../types'
import { ContactForm } from '../forms/Contact.form'
import { FormContext, useFormProvider } from '../hooks/useForm.hook'
import { Query } from '../service'
import { useContactValdiation } from '../hooks/useContactValidation.hook'

// --[ Local Utils ]-----------------------------------------------------------
const createContactState = (bff?: boolean) =>
  bff
    ? ContactFactory({
        bestFriend: ContactFactory({
          id: 'bestFriend',
          pet: PetFactory({
            id: 'bestFriendPet',
          }),
          phones: [PhoneFactory({ id: 'bestFriendPhone' })],
        }),
      })
    : ContactFactory()

// --[ Create Contact ]--------------------------------------------------------
interface CreateContactProps {
  withBff?: boolean
}
export const CreateContact: React.FC<CreateContactProps> = ({ withBff }) => {
  const [contact, setContact] = React.useState<Contact>(
    createContactState(withBff)
  )
  const { validateAll } = useContactValdiation()
  const Form = useFormProvider()

  const handleSubmit = () => {
    if (validateAll(contact)) {
      Form.setSubmitFailed(false)
      Query(contact).then(Form.setAPIerrors) // faked server call
    } else {
      Form.setSubmitFailed(true)
    }
  }

  const handleReset = () => {
    setContact(ContactFactory())
    Form.setResetValidation(!Form.resetValidation)
    Form.setSubmitFailed(false)
  }

  return (
    <>
      <FormContext.Provider value={Form}>
        <Box2 width="50rem" border="1px solid black">
          <Heading mb="1rem">Create Contact</Heading>
          <ContactForm data={contact} onChange={setContact} />
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
