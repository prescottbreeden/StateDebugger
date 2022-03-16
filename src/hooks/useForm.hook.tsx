import React from 'react'

export const FormContext = React.createContext<any>({} as any)
export const useForm = () => React.useContext(FormContext)

export const FormProvider = () => {
  const [submitFailed, setSubmitFailed] = React.useState(false)
  const [resetValidation, setResetValidation] = React.useState(false)

  return {
    FormContext,
    submitFailed,
    setSubmitFailed,
    resetValidation,
    setResetValidation,
  }
}
