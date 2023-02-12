import { useCallback, useReducer } from 'react';

import { formDataIntialState, FormState } from './useAuthFormReducer';
import { EmailRegex } from './constants';

type FormErrorState = FormState & { generic: string; loading?: boolean };

const formErrorinitialState: FormErrorState = {
  ...formDataIntialState,
  generic: '',
};

const formErrorReducer = (
  initialState: FormErrorState,
  updatedState: Partial<FormErrorState>
) => {
  return {
    ...initialState,
    ...updatedState,
  };
};

export const useFormValidation = (
  formState: FormState,
  isRegisterMode: boolean
) => {
  const [formError, setFormError] = useReducer(
    formErrorReducer,
    formErrorinitialState
  );

  const resetErrors = () => {
    setFormError({ ...formErrorinitialState });
  };

  const isFormDataValid = useCallback(() => {
    resetErrors();

    const { firstName, lastName, email, password } = formState;
    let isValid = true;

    if (isRegisterMode && firstName?.length === 0) {
      isValid = false;
      setFormError({ firstName: "First name can't be empty!" });
    }
    if (isRegisterMode && lastName?.length === 0) {
      isValid = false;
      setFormError({ lastName: "Last name can't be empty!" });
    }
    if (email?.length === 0) {
      isValid = false;
      setFormError({ email: "Email can't be empty!" });
    }
    if (!EmailRegex.test(email)) {
      isValid = false;
      setFormError({ email: 'Invalid email address!' });
    }
    if (password?.length < 8) {
      isValid = false;
      setFormError({
        password: 'Password should contain atleast 8 charaters!',
      });
    }

    return isValid;
  }, [formState, isRegisterMode, setFormError]);

  return {
    formError,
    setFormError,
    isFormDataValid,
  };
};
