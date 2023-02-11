import { useReducer } from 'react';

export type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const formDataIntialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const formDataReducer = (
  initialState: FormState,
  updatedState: Partial<FormState>
) => {
  return {
    ...initialState,
    ...updatedState,
  };
};

export const useAuthFormReducer = () => {
  const [formState, setFormState] = useReducer(
    formDataReducer,
    formDataIntialState
  );

  return {
    formState,
    setFormState,
  };
};
