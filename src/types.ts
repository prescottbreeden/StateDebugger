import { ValidationState } from '@de-formed/base'

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
