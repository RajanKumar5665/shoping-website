import React, { Fragment} from 'react'
import { ChartNoAxesCombined, Menu} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBasket, BadgeCheck } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';




export const adminSidebaeMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon:<LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',  
        path: '/admin/products',
        icon:<ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon:<BadgeCheck />
    },
];

function MenuItems({setOpen}){
  const navigate = useNavigate();
  return <nav className='mt-8 flex-col flex gap-2'>
     {
      adminSidebaeMenuItems.map((item) => (
        <div key={item.id} 
        onClick={()=>{
          navigate(item.path);
          setOpen ? setOpen(false) : null;
        }} 
        className='flex text-xl items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer'>
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))
     }
  </nav>
}

const AdminSidebar = ({open, setOpen}) => {


   const navigate = useNavigate();
  return (
   <Fragment>
       <Sheet open={open} onOpenChange={setOpen} >
          <SheetContent side="left" className="w-64">
              <div className='flex flex-col h-full'>
                <SheetHeader className="border-b">
                   <SheetTitle className='flex gap-2'>
                     <ChartNoAxesCombined size={30} />
                      <span className='text-2xl font-extrabold'>Admin Panel</span>
                   </SheetTitle>
                </SheetHeader>
                <MenuItems  setOpen={setOpen} />
              </div>
          </SheetContent>
       </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
         <div onClick={() => navigate("/admin/dashboard")} className='flex items-center'>
          <ChartNoAxesCombined size={30} />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
         </div>
          <MenuItems />
      </aside>
   </Fragment>
  )
}

export default AdminSidebar
