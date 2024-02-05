import ErrorBlock from "@SharedComponents/ErrorBlock"
import LoadingButton from "@SharedComponents/LoadingButton"
import api from "@redux/api"
import Link from "next/link"
import { useEffect, useState } from "react"

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<string>>
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function EnterEmail({ setPage, formData, setFormData }: IProps) {
  const [ formEmail, setFormEmail ] = useState({ email: "" });
  const [ triggeSendToken, { isLoading, error, isSuccess } ] = api.adminApis.useSendRecoveryTokenMutation();

  useEffect(() => {
    if (isSuccess) {
      setPage("SET_NEW_PASSWORD");
    };
  }, []);

  const handleSubmit = (): void => {
    triggeSendToken(formEmail);
  };
  console.log(error)
  console.log(formEmail)
  return (
    <>
      <div className="self-stretch text-gray-700 text-center text-3xl font-semibold leading-10 mt-6 max-md:max-w-full">Forgot Password</div>
        <div className="self-stretch text-gray-500 text-center text-base leading-6 mt-3 max-md:max-w-full">Enter your email to reset it. </div>

        <div className="my-10 mt-14 w-full flex flex-col gap-y-5">
          <label htmlFor="email" className="w-full">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">EMAIL ADDRESS</p>
            <input id="email" name="email" value={formEmail.email} onChange={(e) => setFormEmail({  email: e.target.value })} required type="email" className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-4 rounded-md items-start max-md:pr-5" />
          </label>
        </div>

        <ErrorBlock error={error} className="mb-3" />
        <LoadingButton loading={isLoading} sucess={isSuccess} onClick={() => handleSubmit()} type="button" className="text-white text-center duration-300 text-base font-medium leading-6 justify-center items-center self-stretch bg-primary-red hover:bg-red-400 active:bg-red-600 px-16 py-4 rounded-lg max-md:max-w-full max-md:px-5">Continue</LoadingButton>

        <div className="justify-center items-center self-stretch flex flex-col mt-8 px-16 max-md:max-w-full max-md:px-5">
          <div className="flex items-stretch gap-1">
            <div className="text-gray-500/80 text-sm leading-5 grow shrink basis-auto">Return to</div>
            <Link href="sign-up" className="text-orange-600 text-sm font-medium leading-5 whitespace-nowrap">Sign In</Link>
          </div>
        </div>
    </>
  )
}