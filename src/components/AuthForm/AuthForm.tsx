'use client'

import { ChangeEvent, useCallback } from 'react'
import Link from 'next/link'

import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { Input } from '@components/Input'

import { AuthFormModes, RegisterContent, SigninContent } from './constants'
import { useAuthFormReducer } from './useAuthFormReducer'

type AuthFormProps = {
  mode: keyof typeof AuthFormModes
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const { formState, setFormState } = useAuthFormReducer()

  const content =
    mode === AuthFormModes.register ? RegisterContent : SigninContent

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({ [e.target.name]: e.target.value })
    },
    [setFormState]
  )

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form className="py-10 w-full">
          {mode === AuthFormModes.register && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  name="firstName"
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={onInputChange}
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  name="lastName"
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={onInputChange}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              name="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              name="password"
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" variant="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}
