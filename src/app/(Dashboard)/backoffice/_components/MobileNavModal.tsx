import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { NavList } from "./NavList";
import { navRoutes } from "../data";

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavMenuModal: React.FC<IProps> = memo(({ isOpen, setIsOpen }) => {

  if (isOpen) {
    return (
        <aside className="bg-white z-[1] fixed md:hidden bottom-0 left-0 w-full h-full border border-r-slate-200">
          <button onClick={() => setIsOpen(false)} className="absolute right-3 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Link href="/" className="relative px-4 py-3 flex flex-row  max-w-max items-center gap-x-2">
            <Image
              width={150}
              height={40}
              loading="lazy"
              src="/images/logo-and-text.svg"
              className=""
              alt="Study Abroad"
            />
            {/* <h1 className="text-2xl font-semibold -mb-2 text-slate-800">GT Western</h1> */}
          </Link>
  
          <NavList setIsOpen={setIsOpen} route={navRoutes} />
  
          
        </aside>
    )
  }
})

MobileNavMenuModal.displayName = "MobileNavMenuModal";
export default MobileNavMenuModal;