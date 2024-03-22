"use client";

import { useFormState, useFormStatus } from 'react-dom'

import { submitForm } from "./action";

import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import SubmitButton from './SubmitButton';

function SignUp() {
  const [state, formAction] = useFormState(submitForm, { message: "" })
  

  

  

  useEffect(() => {
    const notify = () => {      
      if (typeof state.message === "string" && state.message === "") {
        return null
      }
      if (typeof state.message === "string") {
        toast(state.message)
      }
      if(typeof state.message === "object") {
        Object.entries(state.message).forEach((message) => {          
          toast(message[1][0])
        })
        
      }
    }
    
  notify()
  }, [state])
  


  return (
    <>
      
      <form
        action={formAction}
        className="gap-5 p-5 w-full sm:w-auto items-center flex flex-col bg-[#1D2128] text-white rounded-2xl"
      >
        <h3
          className="p-4 text-center text-4xl font-semibold"
        >
          Sign in
        </h3>
        <div className="name flex gap-3 flex-wrap w-full">
          <div>
            <label htmlFor="firstName">first name</label>
            <br />
            <input
              type="text"
              required={true}
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div>
            <label htmlFor="lastName">last name</label>
            <br />
            <input
              type="text"
              required
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="userInfo w-full flex flex-col gap-2">
          <div>
            <label htmlFor="username">username</label>
            <br />
            <input
              className="w-full"
              required
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <br />
            <input
              className="w-full"
              type="text"
              required
              name="email"
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
       

       <SubmitButton/>
      
      </form>
    </>
  );
}

export default SignUp;
