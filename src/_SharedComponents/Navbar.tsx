"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavMenuModal from "./MobileNav";
import { useState } from "react";
import { useRouter } from "next/navigation";
import langs from "@dictionaries/langs"

interface IProps {
  params: {
    lang: string
  }
}
export default function NavBar({ params }: IProps) {
  const pathname = usePathname();

  const [ isMobileNavOpen, setIsMobileNavOpen ] = useState<boolean>(false);

  console.log(pathname.split("/")[1]);

  return (
    <nav className="py-2 sticky top-0 z-[2] max-md:flex-wrap px-4 shadow-lg bg-white">
      <div className="container mx-auto justify-between items-center flex flex-row w-full gap-5">
        <Link href={`/${pathname.split("/")[1]}/`} className="">
          <figure className="relative aspect-[3.27] object-contain object-center w-[196px] overflow-hidden shrink-0 max-w-full">
            <Image
              fill
              loading="lazy"
              src="/images/logo-and-text.svg"
              className=""
              alt="Study Abroad"
            />
          </figure>

          {/* <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc26593d0108d2f2fd511b81f23e7a6d4e7012381a82080ac2a3528d843f928d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
            className="aspect-[3.27] object-contain object-center w-[196px] overflow-hidden shrink-0 max-w-full"
            alt="Study Abroad"
          /> */}
        </Link>

        <ul className="hidden md:flex gap-5 my-auto">
          <li
            className={`${pathname.includes("/study-abroad") ? "text-sky-500" : "text-zinc-600"} text-center text-base font-medium leading-6 whitespace-nowrap`}
          >
            <Link href={`/${pathname.split("/")[1]}/study-abroad`} >{langs[params.lang as keyof typeof langs].navBar.studyAbroad}</Link>
          </li>
          <li className={`${pathname.includes("/visa-application") ? "text-sky-500" : "text-zinc-600"} text-center text-base font-medium leading-6 whitespace-nowrap`}>
            <Link href={`/${pathname.split("/")[1]}/visa-application`}>
            {langs[params.lang as keyof typeof langs].navBar.applyForVisa}
            </Link>
          </li>
          <li className={`${pathname.includes("/book-flight") ? "text-sky-500" : "text-zinc-600"} text-center text-base font-medium leading-6 whitespace-nowrap`}>
            <Link href={`/${pathname.split("/")[1]}/book-flight`}>
            {langs[params.lang as keyof typeof langs].navBar.bookFlight}
            </Link>
          </li>
          <li className={`${pathname.includes("/contact-us") ? "text-sky-500" : "text-zinc-600"} text-center text-base font-medium leading-6 whitespace-nowrap`}>
            <Link href={`/${pathname.split("/")[1]}/contact-us`}>
            {langs[params.lang as keyof typeof langs].navBar.contactUs}
            </Link>
          </li>
        </ul>

        <Link
          href={`/${pathname.split("/")[1]}/book-consultation`}
          className="hidden lg:block text-orange-600 text-sm font-medium leading-5 self-center whitespace-nowrap my-auto"
          aria-label={langs[params.lang as keyof typeof langs].navBar.bookFreeConsultation}
        >
          {langs[params.lang as keyof typeof langs].navBar.bookFreeConsultation}
        </Link>

        <button onClick={() => setIsMobileNavOpen(true)} className="py-2 md:hidden px-3 text-red-600 rounded-md bg-red-200/50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <MobileNavMenuModal setIsOpen={setIsMobileNavOpen} isOpen={isMobileNavOpen} />
    </nav>
  );
}



