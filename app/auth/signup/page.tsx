"use client";
import { useFormState } from "react-dom";
import styles from "./../Signin.module.css";
import SubmitButton from "./SubmitButton";
import { submitForm } from "./action";
import { useEffect } from "react";
import Notification from "../Notification";
function SignUp() {
  const [state, formAction] = useFormState(submitForm, { message: "" });

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <section className={`w-full h-screen relative ${styles.section}`}>
      <div className="container h-screen mx-auto flex justify-evenly items-center gap-3 flex-col ">
        <div>
          <h2 className="text-center text-white text-5xl font-semibold">
            Unlock a world of endless entertainment
          </h2>
          <p className="text-center text-gray-400 text-xl font-semibold">
            Login to Discover, Stream, and Enjoy!
          </p>
        </div>
        <form
          action={formAction}
          className="gap-5 p-5 w-full sm:w-auto items-center flex flex-col bg-[#1D2128] text-white rounded-2xl"
        >
          <h3 className="p-4 text-center text-4xl font-semibold">Sign in</h3>
          <div className="name flex gap-3 flex-wrap w-full">
            <div>
              <label htmlFor="firstName">first name</label>
              <br />
              <input
                type="text"
                required
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
          <SubmitButton />
        </form>
      </div>

      <section
            className="absolute top-0 left-0 w-full"
      >
      {state?.message &&
        typeof(state.message) === "object" ?
        Object.entries(state.message).map((entry) => (
          <Notification key={entry[0]} entry={entry}/>
        )): <Notification entry={state.message}/>
      }
        
          </section>



    </section>
  );
}

export default SignUp;
