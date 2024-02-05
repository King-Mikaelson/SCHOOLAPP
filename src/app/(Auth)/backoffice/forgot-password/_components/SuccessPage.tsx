import Link from "next/link";

export default function PasswordResetSuccessPage() {
  return (
    <section className="items-center max-w-md w-full mx-auto flex flex-col">
      <div className="h-auto aspect-square bg-[#D1FADF] outline outline-[12px] outline-[#ECFDF3] flex justify-center items-center rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
        <path d="M25.6663 13.4281V14.5015C25.6649 17.0173 24.8503 19.4653 23.3439 21.4803C21.8375 23.4953 19.7202 24.9694 17.3076 25.6827C14.895 26.396 12.3165 26.3104 9.95656 25.4385C7.59664 24.5666 5.58177 22.9553 4.21246 20.8447C2.84315 18.7342 2.19276 16.2375 2.3583 13.7272C2.52383 11.2168 3.49642 8.82718 5.131 6.91472C6.76559 5.00226 8.97459 3.66942 11.4286 3.11497C13.8825 2.56053 16.45 2.8142 18.748 3.83814M25.6663 5.16814L13.9997 16.8465L10.4997 13.3465" stroke="#039855" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div className="self-stretch text-gray-700 text-center text-3xl font-semibold leading-10 tracking-tighter mt-6 max-md:max-w-full">Password Reset</div>
      <div className="self-stretch text-gray-500 text-center text-base leading-6 mt-3 max-md:max-w-full">Your password has been successfully reset. <br /> Click below to Log In</div>


      <button type="submit" className="text-white text-center duration-300 text-base font-medium leading-6 mt-10 justify-center items-center self-stretch bg-primary-red hover:bg-red-400 active:bg-red-600 px-16 py-4 rounded-lg max-md:max-w-full max-md:px-5">Continue</button>

      <div className="justify-center items-center self-stretch flex flex-col mt-8 px-16 max-md:max-w-full max-md:px-5">
        <div className="flex items-stretch gap-1">
          <div className="text-gray-500/80 text-sm leading-5 grow shrink basis-auto">Return to</div>
          <Link href="sign-up" className="text-orange-600 text-sm font-medium leading-5 whitespace-nowrap">Sign In</Link>
        </div>
      </div>
    </section>
  )
}