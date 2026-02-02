import CommonForm from '@/components/common/CommonForm'
import { regsiterFormControls } from '@/config'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { regsiterUser } from '@/store/auth-slice'
import { toast } from 'sonner'

const initialState = {
  userName: '',   
  email: '',
  password: ''
}

const Register = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

const onSubmit = async (event) => {
  event.preventDefault()

  try {
    const res = await dispatch(regsiterUser(formData)).unwrap()

    toast.success(res.message || 'Registered successfully!', {
      description: 'You have registered successfully',
      duration: 2500,
    })

    navigate('/auth/login')
  } catch (error) {
    toast.error(
      error?.message || error || 'Something went wrong',
      { duration: 2500 }
    )
  }
}



  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={regsiterFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register
