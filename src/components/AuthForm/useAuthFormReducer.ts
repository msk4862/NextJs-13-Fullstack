import { useReducer } from 'react'

type FormState = {
  firstName: string
  lastName: string
  email: string
  password: string
}
const intialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const reducer = (initialState: FormState, updatedState: Partial<FormState>) => {
  return {
    ...initialState,
    ...updatedState,
  }
}

export const useAuthFormReducer = () => {
  const [formState, setFormState] = useReducer(reducer, intialState)
  return {
    formState,
    setFormState,
  }
}
