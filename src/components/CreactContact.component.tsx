import React from 'react'
import { ContactForm } from './Contact.form'
import { DebugState } from './DebugState.component'
import { Contact, useContactValdiation } from './useContactValidation.hook'

interface CreateContactProps {}
export const CreateContact: React.FC<CreateContactProps> = (props) => {
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

  const handleSubmit = () => {
    console.log('state', contact)
    if (v.validateAll(contact)) {
      console.log('success')
    }
  }

  return (
    <DebugState
      state={contact}
      windowName="Contact Form State"
      darkMode={false}
      maxWidth={'20rem'}
      // noHelp
    >
      <div style={{ width: '20rem' }}>
        <h1>Create Contact</h1>
        <ContactForm state={contact} onChange={setContact} />
        <button onClick={handleSubmit}>Submit?</button>
      </div>
    </DebugState>
  )
}
