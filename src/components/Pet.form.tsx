import React from 'react'
import _ from 'lodash/fp/placeholder'
import flow from 'lodash/fp/flow'
import merge from 'lodash/fp/merge'
import { TextInput } from '../form/TextInput.component'
import { FormProps } from './Contact.form'
import { Pet, usePetValdiation } from './usePetValidation.hook'
import { eventNameValue } from '@de-formed/base'
import { SelectOne } from '../form/SelectOne.component'
import { DebugState } from './DebugState.component'

export const PetForm: React.FC<FormProps<Pet>> = ({ state, onChange }) => {
  const { getError, validateOnBlur, validateOnChange } = usePetValdiation()

  const handleChange = flow(eventNameValue, merge(state), onChange)

  const options = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'bird', label: 'Bird' },
    { value: 'fish', label: 'Fish' },
    { value: 'crab', label: 'Crab' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <>
      <DebugState
        state={state}
        windowName="Pet Data"
        darkMode={false}
        //noHelp
      >
        <div>
          <TextInput
            error={getError('name')}
            name="name"
            onBlur={validateOnBlur(state)}
            onChange={validateOnChange(handleChange, state)}
            value={state.name}
          />
        </div>
        <div>
          <TextInput
            error={getError('favoriteFood')}
            name="favoriteFood"
            onBlur={validateOnBlur(state)}
            onChange={validateOnChange(handleChange, state)}
            value={state.favoriteFood}
          />
        </div>
        <div>
          <SelectOne
            name="type"
            options={options}
            onChange={validateOnChange(handleChange, state)}
            onBlur={validateOnBlur(state)}
            label="Pet Type"
            value={state.type}
          />
          {getError('type') && <div>{getError('type')}</div>}
        </div>
      </DebugState>
    </>
  )
}
