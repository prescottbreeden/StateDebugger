import { ValidationState } from '@de-formed/base'

export type IFormContext = {
  FormContext: React.Context<IFormContext>
  submitFailed: boolean
  setSubmitFailed: (submitFailed: boolean) => void
  resetValidation: boolean
  setResetValidation: (resetValidation: boolean) => void
}

export type MultipleValidationState = {
  [key: string]: ValidationState
}

export type FormProps<T> = {
  data: T
  onChange: (event: any) => any
}

export type DynamicFormProps = {
  addForm: Function
  form: React.FunctionComponent<FormProps<any>>
  items: any[]
  onChange: (event: any) => any
  removeForm: (data: any) => void
}

export type Contact = {
  id: string
  firstName: string
  lastName: string
  email: string
  pet: Pet
  phones: Phone[]
  bestFriend: Contact
}

export const ContactFactory = (): Contact => ({
  id: 'contact',
  firstName: '',
  lastName: '',
  email: '',
  pet: PetFactory(),
  phones: [PhoneFactory()],
  bestFriend: ContactFactory(),
})

export type Pet = {
  id: string
  name: string
  favoriteFood: string
  type: string
}

export const PetFactory = (): Pet => ({
  id: 'pet',
  name: '',
  favoriteFood: '',
  type: '',
})

export type Phone = {
  id: string
  number: string
  description: string
}

export const PhoneFactory = (): Phone => ({
  id: 'phone1',
  number: '',
  description: '',
})
