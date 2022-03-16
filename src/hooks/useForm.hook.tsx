import React from 'react'

export const FormContext = React.createContext<any>({} as any)
export const useForm = () => React.useContext(FormContext)

export const useFormProvider = () => {
  const [submitFailed, setSubmitFailed] = React.useState(false)
  const [resetValidation, setResetValidation] = React.useState(false)
  const [APIerrors, setAPIerrors] = React.useState<any>({})

  return {
    FormContext,
    submitFailed,
    setSubmitFailed,
    resetValidation,
    setResetValidation,
    APIerrors,
    setAPIerrors,
  }
}
