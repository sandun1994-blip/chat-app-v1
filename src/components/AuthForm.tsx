 'use client'

import { useCallback, useState } from "react"
import { useForm ,FieldValues,SubmitHandler} from "react-hook-form"
import Input from "./input/Input"
import Button from "./Button"

type Props = {}

type Variant ='LOGIN' | 'REGISTER'

const AuthForm = (props: Props) => {
  const [variant,setVariant]=useState<Variant>('LOGIN')
  const [isLoading,setIsLoading]=useState(false)

  const toogleVariant=useCallback(()=>{
if (variant==='LOGIN') {
  setVariant('REGISTER')

}else{
  setVariant('LOGIN')
}
  },[variant])



  const {register,handleSubmit,formState:{
    errors
  }} =useForm<FieldValues>({defaultValues:{
    name:'',
    email:'',
    password:''
  }})

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setIsLoading(true)
    if (variant ==='REGISTER') {
      // /axios register
      
    }

    if (variant ==='LOGIN') {
      // /next auth
      
    }



  }



  const socialAction=(action:string)=>{

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
{variant ==='REGISTER' && (<Input label="Name" register={register} id="name" errors={errors}/>)}
<Input label="Email"
 register={register} 
 type="email"
 id="email"
  errors={errors}/>

<Input label="Password"
 register={register} 
 id="password"
 type="password"
  errors={errors}/>

<div>
  <Button>
    Test
  </Button>
</div>

       </form>  
      </div>
    </div>
  )
}

export default AuthForm