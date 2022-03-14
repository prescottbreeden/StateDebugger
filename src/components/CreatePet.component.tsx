import React from 'react'
import { PetForm } from './Pet.form'
import { Pet, usePetValdiation } from './usePetValidation.hook'

type FormContext = any

const FormContext = React.createContext<FormContext>(null as any)

export const useFormContext = () => React.useContext(FormContext)

interface CreatePetProps {}
export const CreatePet: React.FC<CreatePetProps> = (props) => {
  const [pet, setPet] = React.useState<Pet>({
    name: '',
    favoriteFood: '',
    type: '',
  })

  const v = usePetValdiation()

  const handleSubmit = () => {
    console.log('state', pet)
    if (v.validateAll(pet)) {
      console.log('success')
    }
  }

  return (
    <div style={{ width: '20rem' }}>
      <h1>Create Pet</h1>
      <PetForm onChange={setPet} state={pet} />
      <button onClick={handleSubmit}>Submit?</button>
    </div>
  )
}
