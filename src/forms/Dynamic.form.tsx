import React from 'react'
import { Box2, Button } from '@looker/components'
import type { DynamicFormProps } from '../types'

export const DynamicForm: React.FC<DynamicFormProps> = ({
  addForm,
  form,
  items,
  onChange,
  removeForm,
}) => {
  return (
    <>
      <Box2 display="flex" flexDirection="column">
        {items.map((data: any, i: number) => (
          <Box2 display="flex" key={i}>
            {React.createElement(form, {
              data,
              onChange,
            })}
            <Box2>
              <Button
                className="button--delete"
                name="crossCircle"
                onClick={() => removeForm(data)}
                title="Remove"
              >
                Remove
              </Button>
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
}
