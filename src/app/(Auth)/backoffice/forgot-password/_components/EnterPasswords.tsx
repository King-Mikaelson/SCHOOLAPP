import LoadingButton from "@SharedComponents/LoadingButton";
import Link from "next/link";
import { useState } from "react";

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<string>>
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
}

export default function EnterPasswords({ setPage, formData, setFormData, isLoading, confirmPassword, setConfirmPassword }: IProps) {
  const [ isVisible, setIsVisible ] = useState({ password: false, confirmPassword: false });

  return (
    <>
      <div className="self-stretch text-gray-700 text-center text-3xl font-semibold leading-10 mt-6 max-md:max-w-full">Set New Password</div>
      <div className="self-stretch text-gray-500 text-center text-base leading-6 mt-3 max-md:max-w-full">Your new password should be different from previously used passwords.</div>

      <div className="my-10 mt-14 w-full flex flex-col gap-y-5">
        <label htmlFor="password" className="w-full">
          <p className="text-neutral-700 mb-1 text-xs leading-4 tracking-widest uppercase">Password</p>
          <span className="relative">
            <input id="password" name="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type={isVisible.password ? "text" : "password"} className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center px-3 lg:px-4 py-4 pr-12 rounded-md items-start max-md:pr-5" />
            <button type="button" onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password})} className="absolute top-0 bottom-0 right-4 h-max my-auto">
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

        <label htmlFor="password" className="w-full">
          <p className="text-neutral-700 mb-1 text-xs leading-4 tracking-widest uppercase">Confirm Password</p>
          <span className="relative">
            <input id="password" name="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={isVisible.confirmPassword ? "text" : "password"} className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center px-3 lg:px-4 py-4 pr-12 rounded-md items-start max-md:pr-5" />
            <button type="button" onClick={() => setIsVisible({ ...isVisible, confirmPassword: !isVisible.confirmPassword})} className="absolute top-0 bottom-0 right-4 h-max my-auto">
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

      <LoadingButton loading={isLoading} type="submit" className={`${(formData.password === confirmPassword && formData.password !== "") ? "bg-primary-red hover:bg-red-400 active:bg-red-600 text-white" : "bg-slate-200 text-slate-600"}  text-center duration-500 text-base font-medium leading-6 justify-center items-center self-stretch  px-16 py-4 rounded-lg max-md:max-w-full max-md:px-5`}>Submit</LoadingButton>

      <div className="justify-center items-center self-stretch flex flex-col mt-8 px-16 max-md:max-w-full max-md:px-5">
        <div className="flex items-stretch gap-1">
          <div className="text-gray-500/80 text-sm leading-5 grow shrink basis-auto">Return to</div>
          <Link href="sign-up" className="text-orange-600 text-sm font-medium leading-5 whitespace-nowrap"> Sign In</Link>
        </div>
      </div>
    </>
  )
}