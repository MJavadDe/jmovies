import React from "react";
import styles from "@/app/auth/Signin.module.css";
import SubmitButton from "@/app/auth/signup/SubmitButton";

const AuthLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
    return (
        <section className={`${styles.section} w-full h-screen`}>
            <div className="container h-screen mx-auto flex justify-evenly items-center gap-3 flex-col ">
                <div>
                    <h2 className="text-center text-white text-5xl font-semibold">
                        Unlock a world of endless entertainment
                    </h2>
                    <p className="text-center text-gray-400 text-xl font-semibold">
                        Login to Discover, Stream, and Enjoy!
                    </p>
                </div>
                {children}
            </div>
        </section>

    );
};

export default AuthLayout;
