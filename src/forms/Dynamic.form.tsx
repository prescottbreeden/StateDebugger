import React from 'react'
import type { DynamicFormProps } from '../types'
import { Box2, Button } from '@looker/components'

export const DynamicForm: React.FC<DynamicFormProps> = ({
  addForm,
  form,
  items,
  onChange,
  removeForm,
}) => (
  <>
    <Box2 display="flex" flexDirection="column">
      {items.map((data: any, i: number) => (
        <Box2 display="flex" key={i}>
          {React.createElement(form, {
            data,
            onChange,
          })}
          <Box2 position="relative">
            <svg
              tabIndex={0}
              className="button--delete"
              onClick={() => removeForm(data)}
              viewBox="0 0 32 32"
            >
              <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
              <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
            </svg>
          </Box2>
        </Box2>
      ))}
    </Box2>
    <Box2 display="flex" mt="1rem">
      <Button onClick={addForm} className="button form__btn--add">
        + Add New Phone
      </Button>
    </Box2>
  </>
)
