import { renderHook, act } from '@testing-library/react-hooks'
import { Contact, ContactFactory, PetFactory } from '../types'
import { useContactValdiation } from './useContactValidation.hook'

const validContact: Contact = {
  ...ContactFactory(),
  firstName: 'bob',
  lastName: 'ross',
  email: 'bob@ross.com',
  phones: [],
  pet: {
    ...PetFactory(),
    name: 'dingo',
    type: 'dog',
    favoriteFood: 'chow',
  },
}

describe('useContactValdiation', () => {
  it('validates a truthy contact', () => {
    const { result } = renderHook(() => useContactValdiation())
    let bool
    act(() => {
      bool = result.current.validateAll(validContact)
    })
    expect(bool).toBe(true)
    expect(result.current.isValid).toBe(true)
  })
})
