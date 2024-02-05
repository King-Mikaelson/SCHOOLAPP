"use client"

import LoadingButton from "@SharedComponents/LoadingButton";
import api from "@redux/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import EnterEmail from "./_components/EnterEmail";
import EnterPasswords from "./_components/EnterPasswords";
import PasswordResetSuccessPage from "./_components/SuccessPage";
import ErrorBlock from "@SharedComponents/ErrorBlock";

export default function ForgotPassword() {
  const [ formData, setFormData ] = useState({ email: "", password: "" });
  const [ page, setPage ] = useState<string>("FORGOT_PASSWORD")
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ forgotPassword, { isLoading, isSuccess, error } ] = api.adminApis.useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) setPage("RESET_SUCCESS");
  }, [ isSuccess ])

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if ((formData.password === confirmPassword && formData.password !== "")) forgotPassword(formData);
    
  }
  console.log(error)
  return (
    <main className="h-screen flex items-center w-screen">
      <form onSubmit={handleSubmit} className="items-center max-w-md w-full mx-auto flex flex-col">
        {
          page === "FORGOT_PASSWORD"
            ? <EnterEmail setFormData={setFormData} formData={formData} setPage={setPage} /> 
            : page === "SET_NEW_PASSWORD" ? <EnterPasswords setFormData={setFormData} formData={formData} setPage={setPage} isLoading={isLoading} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
            : page === "RESET_SUCCESS" && <PasswordResetSuccessPage />
        }
      </form>
      {/* <ErrorBlock error={error} className="w-full mt-4 max-w-screen-md" /> */}

    </main>
  )
}