import React, { useLayoutEffect } from 'react'
import { useValidation } from '@de-formed/react-validations'
import { createFakeEvent, eventNameValue } from '@de-formed/base'

type FormProps = any

type User = {
  username: string
  email: string
}

export const useUserValidation = () => {
  return useValidation<User>({
    username: [
      {
        error: 'Username is required',
        validation: ({ username }) => username.trim().length > 0,
      },
    ],
    email: [
      {
        error: 'Email is required',
        validation: ({ email }) => email.trim().length > 0,
      },
    ],
  })
}
export const SignupForm: React.FC<FormProps> = ({ onChange, user }) => {
  const {
    getError,
    validate,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = useUserValidation()

  const [duplicateUser, setDuplicateUser] = React.useState<boolean>(false)
  const mounted = React.useRef<boolean>(true)

  React.useEffect(() => {
    ;() => (mounted.current = false)
  }, [])

  const checkDatabaseForEmail = () => null
  // query(user.email)
  //   .then((bool: boolean) => mounted.current && setDuplicateUser(bool))
  //   .catch(() => undefined) // handle error

  const handleEmailBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...user, ...eventNameValue(event) }
    validate('email', updatedData) && checkDatabaseForEmail()
  }

  const handleSubmit = () => {
    if (duplicateUser) {
      // short circuit attempt to validate data
    } else if (validateAll(user)) {
      // validations passed, do submit stuff
    } else {
      // validations failed, do oopsy stuff
    }
  }

  // Note: this is a terrible practice, you're notifying a potential bad actor
  // about sensitive information stored in your database, it's a common example
  // but please don't do this
  const renderEmailError = duplicateUser ? (
    <p>This email is already registered.</p>
  ) : (
    getError('email') && <p>{getError('email')}</p>
  )

  return (
    <>
      <input
        name="username"
        onBlur={validateOnBlur(user)}
        onChange={validateOnChange(onChange, user)}
        value={user.username}
      />
      {getError('username') && <p>{getError('username')}</p>}
      <input
        name="email"
        onBlur={handleEmailBlur}
        onChange={validateOnChange(onChange, user)}
        type="email"
        value={user.age}
      />
      {renderEmailError}
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
