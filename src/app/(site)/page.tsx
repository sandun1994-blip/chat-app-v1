import AuthForm from '@/components/AuthForm'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    return (
        <div className="flex bg-red-500 
      min-h-full 
      flex-col 
      justify-center
      py-12 sm:px-6
      lg:px-8">
            <div className='bg-amber-200 sm:nx-auto sm:w-full sm:max-w-md'>
                <Image alt='logo' height={48}
                    width={48} className='mx-auto w-auto' src='/images/logo.png' />

                <h2 className='mt-6 
                text-center 
                text-3xl 
                font-bold 
                tracking-tight
                text-gray-900'>
                    Sign in to ypur account
                </h2>
<AuthForm/>

            </div>
           
        </div>
    )
}
