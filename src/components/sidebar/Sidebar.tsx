import React, { ReactNode } from 'react'
import DesktopSlidebar from './DesktopSlidebar'
import MobileFooter from './MobileFooter'

const Sidebar = async({children}:{children:ReactNode}) => {
  return (
    <div className='h-full'>
        <DesktopSlidebar/>
        <MobileFooter/>
        <main className='lg:pl-20 h-full'>
        {children}
        </main>
        </div>
  )
}

export default Sidebar