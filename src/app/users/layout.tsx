
import Sidebar from '@/components/sidebar/Sidebar'
import {ReactNode} from 'react'
import getUsers from '../actions/getUsers'
import UserList from './components/UserList'

const UserLayout = async({children}:{children:ReactNode}) => {

const users =await getUsers()

  return (
    //@ts-expect-error
    <Sidebar>
    <div className='h-full'>
      <UserList items={users}/>
      {children}</div>
    </Sidebar>
  )
}

export default UserLayout