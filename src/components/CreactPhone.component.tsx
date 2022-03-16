import React from 'react'
import over from 'lodash/fp/over'
import { Box2, Button, Heading } from '@looker/components'
import { usePhoneValidation } from '../hooks/usePhoneValidation.hook'
import { PhoneForm } from '../forms/Phone.form'
import { usePetValdiation } from '../hooks/usePetValidation.hook'
import { FormProvider } from '../hooks/useForm.hook'
import { Phone, PhoneFactory } from '../types'
import { Query } from '../App'

interface CreatePhoneProps {}
export const CreatePhone: React.FC<CreatePhoneProps> = () => {
  const [contact, setPhone] = React.useState<Phone>(PhoneFactory())

  const formProps = FormProvider()
  const { FormContext, resetValidation, setSubmitFailed, setResetValidation } =
    formProps

  const validations = {
    contact: usePhoneValidation(),
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
    setPhone(PhoneFactory())
    setResetValidation(!resetValidation)
    setSubmitFailed(false)
  }

  return (
    <>
      <FormContext.Provider value={{ ...formProps, ...validations }}>
        <Box2 width="20rem">
          <Heading mb="1rem">Create Phone</Heading>
          <PhoneForm data={contact} onChange={over([setPhone])} />
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
