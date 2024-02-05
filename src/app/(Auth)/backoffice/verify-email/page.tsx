"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function VerifyPassword() {
  const inputContainerRef = useRef<any>(null);

  const [ code, setCode ] = useState<Array<any>>([]);
  console.log(code)

  const handleCodeInput = (e: any, index: number): void => {
    e.preventDefault()
    const temp = [ ...code ];
    temp[index] = e.target.value;
    setCode(temp);
    if (index <= 2 && /([A-Z])|([0-9])/ig.test(e.target.value)) inputContainerRef!.current!.children[index + 1]!.focus();
  }

  const handleBackspace = (e: React.KeyboardEvent, index: number): void => {
    if (e.key === "Backspace" && index !== 0) {
      inputContainerRef!.current!.children[index - 1]!.focus()
    }
  }

  return (
   <main className="flex items-center h-screen wcreen">
     <form className="items-center max-w-md w-full mx-auto flex flex-col">
      <div className="self-stretch text-gray-700 text-center text-3xl font-semibold leading-10 mt-6 max-md:max-w-full">Security Verification</div>
      <div className="self-stretch text-gray-500 text-center text-base leading-6 mt-3 max-md:max-w-full">Please enter the 4-digit code sent to your email.</div>

      <div ref={inputContainerRef} className="my-10 mt-14 w-full gap-y-5 flex justify-center gap-3">
        {
          Array.from({ length: 4 }).map((_, index: number) => (
            <input maxLength={1} onKeyUp={(e) => handleBackspace(e, index)} onInput={(e) => handleCodeInput(e, index)} key={index} id="text" name="text" required className="text-primary-red h-[60px] font-semibold text-center w-[60px] aspect-square border-primary-red text-3xl leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-primary-red/50 justify-center px-3 lg:px-4 py-4 rounded-md items-start max-md:pr-5" />
          ))
        }
      </div>

      <button type="submit" className="text-white text-center duration-300 text-base font-medium leading-6 justify-center items-center self-stretch bg-primary-red hover:bg-red-400 active:bg-red-600 px-16 py-4 rounded-lg max-md:max-w-full max-md:px-5">Verify Email</button>

      <div className="justify-center items-center flex flex-row gap-1 mt-8 px-16 max-md:max-w-full max-md:px-5">
        <div className="text-gray-500/80 text-sm leading-5 grow shrink basis-auto">Did not receive the code? </div>
        <button type="button" className="text-orange-600 text-sm font-medium leading-5 whitespace-nowrap">Click to Resend</button>
      </div>

      <div className="justify-center items-center flex flex-row gap-1 mt-8 px-16 max-md:max-w-full max-md:px-5">
        <div className="text-gray-500/80 text-sm leading-5 grow shrink basis-auto">Return to</div>
        <Link href="sign-in" className="text-orange-600 text-sm font-medium leading-5 whitespace-nowrap">Sign In</Link>
      </div>
    </form>
   </main>
  )
}