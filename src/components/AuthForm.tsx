'use client'

import { useCallback, useEffect, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import Input from "./input/Input"
import Button from "./Button"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from "axios"
import toast from "react-hot-toast"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
type Props = {}

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = (props: Props) => {


  const session =useSession()
  const router =useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)




useEffect(()=>{
if (session?.status==='authenticated') {
  console.log('authntiacted');
  router.push('/users')
  
}
},[session?.status,router])

  const toogleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')

    } else {
      setVariant('LOGIN')
    }
  }, [variant])



  const { register, handleSubmit, formState: {
    errors
  } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    if (variant === 'REGISTER') {
      // /axios register

      axios.post('/api/register', data)
      .then(()=>signIn('credentials',data))
      .catch(err => toast.error('Something went wrong!'))

    }

    if (variant === 'LOGIN') {
      // /next auth
      signIn('credentials', { ...data, redirect: false }).then(callback => {

        if (callback?.error) {
          toast.error('Invalid credentials')
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Success')
          router.push('/users')
        }
      }).finally(() => setIsLoading(false))

    }



  }



  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((callback) => {

        if (callback?.error) {
          toast.error('Invalid credentials')
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Success')
        }
      }).finally(() => setIsLoading(false))

  }
  return (
    <div
      className="mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md
    
    ">
      <div className="bg-white px-4
      py-8 shadow sm:rounded-lg sm:px-10">

        <form className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (<Input label="Name" register={register} id="name" errors={errors} />)}
          <Input label="Email"
            register={register}
            type="email"
            id="email"
            errors={errors}
            disabled={isLoading} />

          <Input label="Password"
            register={register}
            id="password"
            type="text"
            errors={errors}
            disabled={isLoading} />

          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm ">
              <span className="bg-white px-2 text-gray-500">
                or contiue with
              </span>

            </div>

          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => { signOut() }} />


            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />

          </div>
        </div>
        <div className=" flex gap-2  justify-center text-sm mt-6  px-2 text-gray-500">

          <div>
            {variant === 'LOGIN' ? 'New to messanger?' : 'Alredy have an account?'}
          </div>

          <div onClick={toogleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'login'}
          </div>


        </div>

      </div>
    </div>
  )
}

export default AuthForm


