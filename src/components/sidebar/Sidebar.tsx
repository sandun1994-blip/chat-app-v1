import React, { ReactNode } from 'react'
import DesktopSlidebar from './DesktopSlidebar'
import MobileFooter from './MobileFooter'
import getCurrentUser from '@/app/actions/getCurrentUser'

const Sidebar = async({children}:{children:ReactNode}) => {


const currentUser =await getCurrentUser()

  return (
    <div className='h-full'>
        <DesktopSlidebar currentUser={currentUser}/>
        <MobileFooter/>
        <main className='lg:pl-20 h-full'>
        {children}
        </main>
        </div>
  )
}

export default Sidebar