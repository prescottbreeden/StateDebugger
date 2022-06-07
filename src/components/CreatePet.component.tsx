import React from 'react'
import { Box2, Button, Heading } from '@looker/components'
import { Pet, PetFactory } from '../types'
import { PetForm } from '../forms/Pet.form'
import { Query } from '../service'
import { FormContext, useFormProvider } from '../hooks/useForm.hook'
import { usePetValdiation } from '../hooks/usePetValidation.hook'

export const CreatePet: React.FC = () => {
  const [pet, setPet] = React.useState<Pet>(PetFactory())
  const { validateAll } = usePetValdiation()
  const form = useFormProvider()

  const handleSubmit = () => {
    if (validateAll(pet)) {
      form.setSubmitFailed(false)
      Query(pet).then(form.setAPIerrors) // faked server call
    } else {
      form.setSubmitFailed(true)
    }
  }

  const handleReset = () => {
    setPet(PetFactory())
    form.setResetValidation(!form.resetValidation)
    form.setSubmitFailed(false)
  }

  return (
    <FormContext.Provider value={form}>
      <Box2 width="20rem">
        <Heading mb="1rem">Create Pet</Heading>
        <PetForm onChange={setPet} data={pet} />
        <Box2 display="flex" justifyContent="flex-end" mt="1rem">
          <Button mr="1rem" onClick={handleReset}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box2>
      </Box2>
    </FormContext.Provider>
  )
}
