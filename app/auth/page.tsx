'use client'

import { useFormState } from 'react-dom'
import SubmitButton from './signup/SubmitButton'
import { loginAction } from './loginAction'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getCsrfToken, getSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

function SignIn() {


  const searchParams = useSearchParams()

  const [state, formAction] = useFormState(loginAction, { message: "" })

  const [csrfToken, setcsrfToken] = useState<string>()

  const getMyCsrfToken = async () => {
    const csrf = await getCsrfToken()
    setcsrfToken(csrf)
  }


  useEffect(() => {
    getMyCsrfToken()
    if (searchParams?.get("error")) {
      toast("username or password is wrong")
    }
  function notify() {
    if (typeof state?.message === "string" && state.message === "") {
      return null
    }
    if (typeof state?.message === "string") {
      toast(state.message)
    }      
    if(typeof state?.message === "object") {
      state.message.map(message => {
        toast(message[0])
      })
      
    }
    }

    console.log(state);
    
    
    
    notify()
  }, [state])
  
  
  
    return (
      <form
        action={formAction}
          className="gap-5 p-3 sm:p-5 w-full sm:w-auto items-center flex flex-col bg-[#1D2128] text-white rounded-2xl"
        >
          <h3 className="p-4 text-center text-4xl font-semibold">Sign in</h3>
          <div className="flex flex-col gap-3 w-[350px]">
            <div className='w-full'>
              <label htmlFor="email">email</label>
            <br />
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <input
                className="w-full"
                type="text"
                required
                name="username"
                id="email"
                placeholder="email"
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <br />
              <input
                min={8}
                className="w-full"
                type="password"
                required
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
          </div>
          <SubmitButton />
        </form>
    )
}

export default SignIn