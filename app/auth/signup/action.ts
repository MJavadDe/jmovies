"use server";
import { redirect } from "next/navigation";
import { schema } from "../schema";
import prisma from "@/prisma/client";
import { Store } from "react-notifications-component";

export async function submitForm(prevState: string, formData: FormData) {
  const inputValues = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const isValid = schema.safeParse(inputValues);

  if (!isValid.success) {
    // Store.addNotification({
    //   title: "Error",
    //   message: `${isValid.error.flatten().fieldErrors!}`,
    //   type: "warning",
    //   insert: "top",
    //   container: "bottom-left",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 5000,
    //     onScreen: true,
    //   },
    // });
    return {
      message: isValid.error.flatten().fieldErrors!,
    };
  }

  const duplicateUser = await prisma.user.findUnique({
    where: { email: `${inputValues.email}` },
  });

  if (duplicateUser) {
    // Store.addNotification({
    //   title: "Error",
    //   message: `User Already Exists`,
    //   type: "warning",
    //   insert: "top",
    //   container: "bottom-left",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 5000,
    //     onScreen: true,
    //   },
    // });
    return {
      message: `User Already Exists`,
    };
  }

  const createdUserRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify(inputValues),
    }
  );
  const createdUser = await createdUserRes.json();

  if (!createdUser) {
    // Store.addNotification({
    //   title: "Error",
    //   message: `Something went wrong`,
    //   type: "warning",
    //   insert: "top",
    //   container: "bottom-left",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 5000,
    //     onScreen: true,
    //   },
    // });
    return {
      message: `Something went wrong`,
    };
  }

  // Store.addNotification({
  //   title: "Congratulations",
  //   message: `User Was Successfully Created`,
  //   type: "success",
  //   insert: "top",
  //   container: "bottom-left",
  //   animationIn: ["animate__animated", "animate__fadeIn"],
  //   animationOut: ["animate__animated", "animate__fadeOut"],
  //   dismiss: {
  //     duration: 5000,
  //     onScreen: true,
  //   },
  // })
  return {
    message: `Congratulations`,
    redirect: redirect("/auth"),
  };
}
