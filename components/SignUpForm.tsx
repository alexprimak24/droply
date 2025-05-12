'use client'

import type { z } from 'zod'

// zod custom schema
import { signUpSchema } from '@/schemas/signUpSchema'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function SignUpForm() {
  const [verifying, setVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const { signUp, isLoaded, setActive } = useSignUp()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema), defaultValues: {
    email: '',
    password: '',
    passwordConfirmation: '',
  } })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded)
      return
    setIsSubmitting(true)
    // reset errors
    setAuthError(null)

    try {
        // once it is done it means that user in clerk is created
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })
    }
    catch (error) {

    }
  }

  const handleVerificationSubmit = async () => {

  }

  if (verifying) {
    return (
      <h1>this is OTP entering field</h1>
    )
  }

  return (
    <h1>
      Signup form with email and other fields
    </h1>
  )
}

export default SignUpForm
