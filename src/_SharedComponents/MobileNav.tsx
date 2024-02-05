"use client"

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { mobileNavRoutes } from "@SharedData/MobileNavRoutes";
import { Dialog } from "@mui/material";
import { usePathname } from "next/navigation";

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavMenuModal: React.FC<IProps> = memo(({ isOpen, setIsOpen }) => {
  const pathname = usePathname();


  if (isOpen) {
    return (
      <Dialog 
        open={isOpen}
        className="md:hidden [&>*>*]:p-4 lg:[&>*>*]:p-5 xl:[&>*>*]:p-6 [&>*>*]:m-3 [&>*>*]:shadow-xl [&>*]:!backdrop-blur-[3px] [&>*>*]:w-[100%] [&>*>*]:rounded-xl"        
        onClose={setIsOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <section className="bg-white z-[1] fixed bottom-0 left-0 w-full h-full">
            <div className="container mx-auto shadow-md justify-between items-center px-4 py-2  flex flex-row w-full gap-5">
              <button onClick={() => setIsOpen(false)} className="relative aspect-[3.27] object-contain object-center w-[196px]">
                <Image className="" fill src="/images/logo-and-text.svg" alt="logo" />
              </button>

              <button onClick={() => setIsOpen(false)} className="py-2 md:hidden px-3 text-red-600 rounded bg-red-200/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
    
            <div className="bg-primary-blue px-4 py-5 h-full">
              <ul className="">
                {
                  mobileNavRoutes.map((route: typeof mobileNavRoutes[0], index: number) => (
                    <li key={index} className="font-medium text-white py-3 text-lg">
                      <Link onClick={() => setIsOpen(false)} href={`/${pathname.split("/")[1]}/${route.route}`}>{route.text}</Link>
                    </li>
                  ))
                }
              </ul>
              <Link onClick={() => setIsOpen(false)} href={`/${pathname.split("/")[1]}/study-abroad`} className="button bg-primary-red h-max w-max mt-6 flex flex-row py-3 px-7 pr-8 items-center rounded-md gap-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec30e33db9ff2542020699f255cdc699c343a9eea71f9d3d7995882140f597ea?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  alt="Search Icon"
                />
                <span className="text-white text-center text-base font-medium">
                  Find my Preferred program
                </span>
              </Link>
            </div>
          </section>
        </Dialog>
        
    )
  }
})

MobileNavMenuModal.displayName = "MobileNavMenuModal";
export default MobileNavMenuModal;