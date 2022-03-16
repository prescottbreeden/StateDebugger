import React from 'react'
import over from 'lodash/fp/over'
import { Box2, Button, Heading } from '@looker/components'
import { Phone, PhoneFactory } from '../types'
import { PhoneForm } from '../forms/Phone.form'
import { Query } from '../App'
import { FormContext, useFormProvider } from '../hooks/useForm.hook'
import { usePhoneValidation } from '../hooks/usePhoneValidation.hook'

export const CreatePhone: React.FC = () => {
  const [phone, setPhone] = React.useState<Phone>(PhoneFactory())
  const { validateAll } = usePhoneValidation()
  const form = useFormProvider()

  const handleSubmit = () => {
    if (validateAll(phone)) {
      form.setSubmitFailed(false)
      Query(phone).then(form.setAPIerrors) // faked server call
    } else {
      form.setSubmitFailed(true)
    }
  }

  const handleReset = () => {
    setPhone(PhoneFactory())
    form.setResetValidation(!form.resetValidation)
    form.setSubmitFailed(false)
  }

  return (
    <>
      <FormContext.Provider value={form}>
        <Box2 width="20rem">
          <Heading mb="1rem">Create Phone</Heading>
          <PhoneForm data={phone} onChange={over([setPhone])} />
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
