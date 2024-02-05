"use client";

import Link from "next/link"
import { navRoutes } from "../data"
import { usePathname } from "next/navigation";

interface IProps {
  route: Array<typeof navRoutes[0]>,
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavList = ({ route, setIsOpen }: IProps) => {
  const pathname = usePathname();

  const highlightActive = (arg: string): boolean => pathname.split(/\//).includes(arg.split(/\//)[0]);

  return (
    <ul className="flex flex-col gap-y-4 my-[2vh]">
      {
        route.map((item: typeof route[0], index: number) => (
          <li key={index} className={`pl-4 pr-5 border-l- ${highlightActive(item.route) ? "border-l-[#FF4512]" : "border-l-white"}`}>
            <Link href={`/backoffice/${item.route}`} onClick={() => { setIsOpen && setIsOpen(false)}} className={`flex rounded-md flex-row  px-3 py-3.5 items-center gap-2  hover:text-red-600  hover:bg-red-50 ${highlightActive(item.route) ? "!bg-[#FF4512] !text-white" : "text-zinc-600"}`}>
              <span className={`flex font-medium rounded-md flex-row gap-2.5 `}>
                {item.icon}
                <p className="text-md">{item.text}</p>
              </span>
              {
                item.subroutes
                  && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )
              }
              </Link>
              {
                item.subroutes
                && (
                  <ul className="flex fo mt-1 flex-col py-2 bg-zinc-100 text-zinc-700 inset-10 rounded-md">
                    {
                      item.subroutes.map((subroute: typeof item.subroutes[0], innerIndex: number) => (
                        <li key={innerIndex} className={`py-2 ${highlightActive(subroute.route) ? "text-primary-red" : "text-zinc-600"}`}>
                          <Link href={`/backoffice/applications/${subroute.route}`} className="pl-8">
                            {subroute.text}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
          </li>
        ))
      }
    </ul>
  )
}