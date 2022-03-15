import { Box2, Button } from '@looker/components'
import React from 'react'
import { Query } from '../App'
import { Pet, PetFactory } from '../types'
import { PetForm } from './Pet.form'
import { FormProvider } from './useForm.hook'
import { usePetValdiation } from './usePetValidation.hook'

interface CreatePetProps {}
export const CreatePet: React.FC<CreatePetProps> = () => {
  const [pet, setPet] = React.useState<Pet>(PetFactory())

  const formProps = FormProvider()
  const {
    FormContext,
    resetValidation,
    setSubmitFailed,
    setResetValidation,
  } = formProps

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
      <div style={{ width: '20rem' }}>
        <h1>Create Pet</h1>
        <PetForm onChange={setPet} data={pet} />
        <Box2 display="flex" justifyContent="flex-end" mt="1rem">
          <Button mr="1rem" onClick={handleReset}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box2>
      </div>
    </FormContext.Provider>
  )
}
