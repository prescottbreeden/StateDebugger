import React from 'react'
import { Box2, Button, Heading } from '@looker/components'
import { FormProvider } from '../hooks/useForm.hook'
import { Pet, PetFactory } from '../types'
import { PetForm } from '../forms/Pet.form'
import { Query } from '../App'
import { usePetValdiation } from '../hooks/usePetValidation.hook'

interface CreatePetProps {}
export const CreatePet: React.FC<CreatePetProps> = () => {
  const [pet, setPet] = React.useState<Pet>(PetFactory())

  const formProps = FormProvider()
  const { FormContext, resetValidation, setSubmitFailed, setResetValidation } =
    formProps

  const validations = {
    pet: usePetValdiation(),
  }

  const handleSubmit = () => {
    if (validations.pet.validateAll(pet)) {
      setSubmitFailed(false)
      Query(pet).then((response: any) => {
        validations.pet.setValidationState(response.pet)
      })
    } else {
      setSubmitFailed(true)
    }
  }

  const handleReset = () => {
    setPet(PetFactory())
    setResetValidation(!resetValidation)
    setSubmitFailed(false)
  }

  return (
    <FormContext.Provider value={{ ...formProps, ...validations }}>
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
