"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { schoolInformationInitialState } from "../data";
import { degreeList } from "@SharedData/degreeList";

interface IProps {
  
}

export default function LoginDetails({  }: IProps) {
  const action = useSearchParams().get("action");

  const [ isVisible, setIsVisible ] = useState({ password: false, confirmPassword: false });
  const [ formData, setFormData ] = useState({ oldPassword: "", newPassword: "", confirmPassword: ""});

  let isLoading, isSubmitting = false;

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, []);

  const handleInputChange = (e: any): void => {
    const { name, value, id, itemId } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl max-md:px-4 max-w-screen-md">

        <h3 className="font-medium text-neutral-700 text-xl mt-8">Password</h3>
        <p className="text-neutral-500/80 mt-2">Please enter your current password to change your password.</p>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-8 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="oldPassword" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">CURRENT PASSWORD</p>
            {
              !isLoading
                ? <input id="oldPassword" name="oldPassword" disabled={action == "view" || isSubmitting} value={formData?.oldPassword} onChange={handleInputChange} type="password" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3.5 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="newPassword" className="w-full">
            <p className="text-neutral-700 mb-1 text-xs leading-4 tracking-widest uppercase">NEW PASSWORD</p>
            <span className="relative">
              <input id="newPassword" name="newPassword" required onChange={handleInputChange} type={isVisible.password ? "text" : "password"} className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center px-3 lg:px-4 py-3.5 pr-12 rounded-md items-start max-md:pr-5" />
              <button type="button" onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password})} className="absolute top-0 bottom-0 h-max my-auto right-4">
                {
                  isVisible.password ?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              </button>
            </span>
          </label>
        </div>
        <p className="text-neutral-400 text-sm">Your new password must be more than 8 characters</p>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="confirmPassword" className="w-full">
            <p className="text-neutral-700 mb-1 text-xs leading-4 tracking-widest uppercase">CONFIRM NEW PASSWORD</p>
            <span className="relative">
              <input id="confirmPassword" name="confirmPassword" required onChange={handleInputChange} type={isVisible.confirmPassword ? "text" : "password"} className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center px-3 lg:px-4 py-3.5 pr-12 rounded-md items-start max-md:pr-5" />
              <button type="button" onClick={() => setIsVisible({ ...isVisible, confirmPassword: !isVisible.confirmPassword})} className="absolute top-0 bottom-0 h-max my-auto right-4">
                {
                  isVisible.confirmPassword ?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              </button>
            </span>
          </label>
        </div>
      

       
      </div>
    </section>
  )
}