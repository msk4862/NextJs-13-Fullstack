'use client';

import { ChangeEvent, FormEvent, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader } from 'react-feather';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { register, signin } from '@lib/api';

import { useAuthFormReducer } from './useAuthFormReducer';
import { useFormValidation } from './useFormValidation';
import { AuthFormModes, RegisterContent, SigninContent } from './constants';
import { ErrorLabel } from './ErrorLabel';

type AuthFormProps = {
  mode: keyof typeof AuthFormModes;
};

export const AuthForm = ({ mode }: AuthFormProps) => {
  const { formState, setFormState } = useAuthFormReducer();

  const isRegisterMode = mode === AuthFormModes.register;
  const { formError, setFormError, isFormDataValid } = useFormValidation(
    formState,
    isRegisterMode
  );

  const router = useRouter();

  const content = isRegisterMode ? RegisterContent : SigninContent;

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError({ loading: true });

      try {
        if (isFormDataValid()) {
          const sendRequest = isRegisterMode ? register : signin;
          await sendRequest(formState);
          router.replace('/home');
        }
      } catch (e) {
        console.error(e);
        setFormError({ generic: `Could not ${mode}` });
      } finally {
        setFormError({ loading: false });
      }
    },
    [isFormDataValid, formState, isRegisterMode, mode, setFormError, router]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({ [e.target.name]: e.target.value });
    },
    [setFormState]
  );

  return (
    <Card>
      <div className='w-full'>
        <div className='text-center'>
          <h2 className='text-3xl mb-2'>{content.header}</h2>
          <p className='tex-lg text-black/25'>{content.subheader}</p>
          <ErrorLabel
            className='justify-center ml-0'
            size='base'
            label={formError.generic}
          />
        </div>
        <form onSubmit={handleSubmit} className='pb-10 pt-5 w-full'>
          {mode === AuthFormModes.register && (
            <div className='flex mb-8 justify-between'>
              <div className='pr-2'>
                <div className='text-lg mb-4 ml-2 text-black/50'>
                  First Name
                </div>
                <Input
                  name='firstName'
                  placeholder='First Name'
                  value={formState.firstName}
                  className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
                  onChange={onInputChange}
                />
                <ErrorLabel label={formError.firstName} />
              </div>
              <div className='pl-2'>
                <div className='text-lg mb-4 ml-2 text-black/50'>Last Name</div>
                <Input
                  name='lastName'
                  placeholder='Last Name'
                  value={formState.lastName}
                  className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
                  onChange={onInputChange}
                />
                <ErrorLabel label={formError.lastName} />
              </div>
            </div>
          )}
          <div className='mb-8'>
            <div className='text-lg mb-4 ml-2 text-black/50'>Email</div>
            <Input
              name='email'
              placeholder='Email'
              value={formState.email}
              className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
              onChange={onInputChange}
            />
            <ErrorLabel label={formError.email} />
          </div>
          <div className='mb-8'>
            <div className='text-lg mb-4 ml-2 text-black/50'>Password</div>
            <Input
              name='password'
              value={formState.password}
              type='password'
              placeholder='Password'
              className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
              onChange={onInputChange}
            />
            <ErrorLabel label={formError.password} />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className='text-blue-600 font-bold'
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button
                type='submit'
                variant='secondary'
                disabled={formError.loading}
              >
                <div className='flex items-center gap-1'>
                  {formError.loading && <Loader className='animate-spin' />}
                  {content.buttonText}
                </div>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
