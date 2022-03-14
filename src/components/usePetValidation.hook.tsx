import { useValidation } from '@de-formed/react-validations'

export type Pet = {
  name: string
  favoriteFood: string
  type: string
}
export const usePetValdiation = () => {
  return useValidation<Pet>({
    name: [
      {
        error: 'Name is required',
        validation: ({ name }) => name.length > 0,
      },
    ],
    favoriteFood: [
      {
        error: 'Favorite Food is required',
        validation: ({ favoriteFood }) => favoriteFood.length > 0,
      },
    ],
    type: [
      {
        error: 'Type must be a dog',
        validation: ({ type }) => type === 'dog',
      },
    ],
  })
}
