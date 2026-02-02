import CommonForm from '@/components/common/CommonForm'
import { loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  

 const onSubmit = async (event) => {
   event.preventDefault()
 
   try {
     const res = await dispatch(loginUser(formData)).unwrap()
 
     toast.success(res.message || 'Logged in successfully!', {
       duration: 2500,
     })
   } catch (error) {
     toast.error(
       error?.message || error || 'Something went wrong',
       { duration: 2500 }
     )
   }
 }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
       <h1 className='text-3xl font-bold tracking-tight text-foreground'>
        Sign in to your account
       </h1>
        <p className='mt-2'>
          Don't have an account? <Link className='font-medium ml-2 text-primary hover:underline'  to="/auth/register">Register</Link>
        </p>
         
      </div>
      <CommonForm formControls={loginFormControls} 
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login
