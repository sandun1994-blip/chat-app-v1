
import Sidebar from '@/components/sidebar/Sidebar'
import {ReactNode} from 'react'

const UserLayout = async({children}:{children:ReactNode}) => {
  return (
    //@ts-expect-error
    <Sidebar>
    <div className='h-full'>{children}</div>
    </Sidebar>
  )
}

export default UserLayout