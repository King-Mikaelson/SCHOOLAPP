"use client"

import Link from "next/link";
import { memo, useEffect, useState } from "react";
import MobileNavMenuModal  from "./MobileNavModal";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

const DashboardNav = memo(() => {
  const router = useRouter();
  const [ isNavOpen, setIsNavOpen ] = useState<boolean>(false);
  const pathname = usePathname();
  const loggedInUser = typeof window != "undefined" && JSON.parse(localStorage.getItem("userToken") as string);

  useEffect(() => {
    if (typeof window !== "undefined" && !loggedInUser) router.push("/backoffice/sign-in ");
  }, [ loggedInUser ]);

  const rootReducer = useSelector((RootReducer: any) => RootReducer);

  useEffect(() => {
    if (typeof window != "undefined"){
      if (!loggedInUser) router.push("/backoffice/sign-in");
    }
  }, [ rootReducer, typeof window ]);

  const handleSignOut = (): void => {
    if (typeof window !== "undefined" && loggedInUser) {
      localStorage.removeItem("userToken");
      router.push("/backoffice/sign-in");
    }
  }

  return (
    <nav className="w-full z-[3] sticky top-0 bg-white flex justify-between py-2 md:py-3 px-3 md:px-4 xl:px-6 shadow items-center">
      <span className="flex flex-col items-center gap-x-1.5">
        {/* <Link href="/" className="md:hidden block">
          <Image width={35} height={35} alt="Logo" src="/logo.svg" />
        </Link> */}
        <h1 className="text-xl font-bold -mb-1 text-slate-700 capitalize">Hi {loggedInUser?.fullName}</h1>
        <p className="text-zinc-500 text-sm">Welcome back!</p>

      </span>
      <button onClick={() => setIsNavOpen(true)} className="block md:hidden text-primary border border-primary/60 px-2 py-0.5 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <ul className="flex flex-row gap-2 items-center">
        <li className="max-h-max grid">
          <button className="text-zinc-500">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="w-7 h-7">
              <path d="M14.0003 21.1875H10.0003M2.29414 6.00739C2.27979 4.55604 3.06227 3.20075 4.32635 2.4875M21.7025 6.0074C21.7169 4.55605 20.9344 3.20075 19.6703 2.4875M18.0003 8.1875C18.0003 6.5962 17.3682 5.07008 16.2429 3.94486C15.1177 2.81964 13.5916 2.1875 12.0003 2.1875C10.409 2.1875 8.88288 2.81964 7.75766 3.94486C6.63244 5.07008 6.0003 6.5962 6.0003 8.1875C6.0003 11.2777 5.22077 13.3935 4.34996 14.7929C3.61542 15.9734 3.24816 16.5636 3.26162 16.7283C3.27653 16.9106 3.31516 16.9801 3.46207 17.0891C3.59476 17.1875 4.19289 17.1875 5.38915 17.1875H18.6114C19.8077 17.1875 20.4058 17.1875 20.5385 17.0891C20.6854 16.9801 20.7241 16.9106 20.739 16.7283C20.7524 16.5636 20.3852 15.9734 19.6506 14.7929C18.7798 13.3935 18.0003 11.2777 18.0003 8.1875Z" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </li>

        <li className="bg-zinc-100 shadow-sm p-1 rounded-full flex flex-row items-center gap-2">
          <figure className="w-[35px] relative rounded-full overflow-hidden h-auto aspect-square">
            <Image fill alt="User" className="object-cover" src="/images/home/testimony.png" />
          </figure>
          <Select
            // displayEmpty
            itemID="location"
            defaultValue={0}
            value={0}
            className="[&>*]:!py-0 [&>*]:!px-0 [&>*]:!border-none  pr-2 font-semibold text-md text-zinc-600 min-w-[50px]"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem className="!p-0 !hidden" value={0}>{loggedInUser?.fullName}</MenuItem>
            <MenuItem className="font-semibold text-zinc-600" value={10}>Settings</MenuItem>
            <MenuItem onClick={handleSignOut} className="font-semibold text-zinc-600" value={10}>Log Out</MenuItem>
            
          </Select>
        </li>
      </ul>
      <MobileNavMenuModal isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
    </nav>
  )
})

DashboardNav.displayName = "DashboardNav";
export default DashboardNav;