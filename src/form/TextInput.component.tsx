import React from 'react'
import { Input } from './Input.component'

interface TextInputProps {
  error?: string
  label?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  value?: string
}

const startCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    })
    .trim()
}

export const TextInput: React.FC<TextInputProps> = ({
  error,
  label,
  name,
  ...props
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '0.5rem 0',
      }}
    >
      <label htmlFor="">{label ?? startCase(name)}</label>
      <Input type="text" name={name} {...props} />
      {error && <p>{error}</p>}
    </div>
  )
}
