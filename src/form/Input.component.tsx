import React from 'react'

interface InputProps {
  type: 'text' | 'number' | 'password' | 'email'
  onChange?: any
  onBlur?: any
  value?: any
  placeholder?: string
  name: string
  disabled?: boolean
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      <input {...props} style={{ padding: '.5rem' }} />
    </>
  )
}
