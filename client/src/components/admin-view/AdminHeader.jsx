import React, { use } from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';

const AdminHeader = ({ setOpenSidebar }) => {

   const dispatch  = useDispatch();

  function handleLogout() {
    // Add logout logic here
    // console.log("Logout clicked");
    dispatch(logoutUser());
  }
  return (
     <header className="flex items-center justify-between px-4 py-3 border-b">
      <Button onClick={() => setOpenSidebar(true)} className="lg:hidden sm:block">
        <Menu />
        <span className='lg:hidden sm:block'>
          Toggle Menu
        </span>
      </Button>
      <div className='flex flex-1 justify-end'>
         <Button
           onClick={handleLogout}
          className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
          <LogOut />
          Logout
         </Button>
      </div>
     </header>
  )
}

export default AdminHeader
