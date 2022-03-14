import React from 'react'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import over from 'lodash/fp/over'
import { createFakeEvent } from '@de-formed/base'

type SelectOption = {
  label: string
  value: string
}

// interface SelectOneProps {}
export const SelectOne: React.FC<any> = ({
  label,
  name,
  onBlur,
  onChange,
  options,
  value,
  ...props
}) => {
  const [localValue, setLocalValue] = React.useState<SelectOption>(options[0])

  // React.useEffect(() => {
  //   if (value.value !== localValue.value) {
  //     setLocalValue(value)
  //   }
  // }, [options, value])

  const updateLocal = flow(
    (value: string) =>
      options.find((option: SelectOption) => option.value === value),
    setLocalValue
  )

  const handleChange = over([flow(get('target.value'), updateLocal), onChange])

  const style = {
    width: '100%',
    height: '100%',
    border: '1px solid #black',
    borderRadius: '4px',
    padding: '0.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#fafafa',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  }

  return (
    <>
      <label htmlFor="name">{label ?? name}</label>
      <div style={style} tabIndex={0}>
        <select
          id=""
          name={name}
          onBlur={onBlur}
          onChange={handleChange}
          style={{ opacity: '1' }}
          value={localValue.value}
        >
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {options
          .filter((o: SelectOption) => o.value === localValue?.value)
          .map((option: any) => (
            <div key={option.value}>
              {option.label} | {option.value}
            </div>
          ))}
      </div>
    </>
  )
}
