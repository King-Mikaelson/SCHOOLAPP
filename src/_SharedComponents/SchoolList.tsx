"use client";

import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  arrangement: "grid"|"list"
  routeProfix: string
  selectedFilters: Array<string>
  data: any
  loading: boolean
  scroll?: boolean,
}

const SchoolsList = memo(({ arrangement, selectedFilters, routeProfix, scroll = true, data, loading }: IProps) => {
  const router = useRouter();

  const handleNavigateToSchoolDetails = (schoolId: string): void => {
    if (schoolId) router.push(`study-abroad/${schoolId}`);
  }

  const filteredSchools = data?.filter((filter: any) => selectedFilters?.length >= 1 ? selectedFilters.includes(filter?.program?.degreeType) : filter);

  return (
    <div className={`mt-2 mb-4 h-max md:bg-6 lg:mb-10 `}>
      <ul className={`grid  ${arrangement === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4": "grid-flow-row"} flex-col  gap-x-3 md:gap-x-4 gap-y-6`}>
        {
          !loading && data && data?.length === 0
          && (
            <div className="px-2 col-span-4 py-4 text-center w-full">
              <h2 className="text-xl font-semibold">No result found</h2>
            </div>
          )
        }
        {
          !loading && data && data?.length > 0 && filteredSchools?.length === 0
          && (
            <div className="px-2 col-span-4 py-4 text-center w-full">
              <h2 className="text-xl font-semibold">No result found for filter(s)</h2>
            </div>
          )
        }
        {
          !loading
            ? (
              data && data?.filter((filter: any) => selectedFilters?.length >= 1 ? selectedFilters.includes(filter?.program?.degreeType) : filter)?.map((school: any, index: number) => (
                <li key={index} className="">
                  <div onClick={() => handleNavigateToSchoolDetails(school?.schoolId)} className="card min-h-[400px] grid grid-rows-[1fr,1.2fr] cursor-pointer h-full relative hover:shadow-lg duration-300 min-w-[270px] rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image fill alt="school" className="object-cover object-center" src={school?.images[0]?.url} />
                    </div>
                    {/* <Image fill alt="testimony" className="object-cover object-center" src="/images/home/hero.png" /> */}
                    <div className="p-3 z-[1] flex flex-col gap-1 bg-white w-full">
                      <h3 className="font-semibold  text-md">{school?.info?.name}</h3>
                      
                      <p className="leading-4 text-xs font-light overflow-ellipsis flex flex-col overflow-hidden text-stone-700">
                        <span className=" font-medium text-sm text-stone-600">{school?.program?.duration}, { school?.program?.programType}</span>
                        <span className="mt-0.5 text-justify">{school?.info?.about}</span>
                      </p>
                      <p className="mt-auto text-red-500 font-medium text-md">Explore Program</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              Array.from({ length: 12 }).map((_, index: number) => (
                <li key={index} className="card min-h-[400px] shadow snap-start snap-always h-full relative hover:shadow-lg duration-300 min-w-[270px] flex flex-row rounded-lg overflow-hidden">
                  <div className="bg-neutral-200/70 absolute h-full w-full animate-pulse" />
                  <div />
                  <div className="p-3 z-[1] self-end h-[50%] flex flex-col justify-between gap-1 bg-white w-full backdrop-blur-sm">
                    <h3 className="font-semibold text-md h-[20px] rounded-md w-[80%] bg-neutral-200/70 animate-pulse" />
                    
                    <p className="leading-4 text-xs font-light overflow-ellipsis flex flex-col overflow-hidden text-stone-700">
                      <span className="h-[15px] w-[50%] font-medium rounded-md bg-neutral-200/70 animate-pulse" />
                      <div className="w-full h-max flex flex-col gap-y-1.5 mt-3">
                        <div className="h-[10px] w-[99%] font-medium rounded-md bg-neutral-200/70 animate-pulse" />
                        <div className="h-[10px] w-[90%] font-medium rounded-md bg-neutral-200/70 animate-pulse" />
                        <div className="h-[10px] w-[95%] font-medium rounded-md bg-neutral-200/70 animate-pulse" />
                        <div className="h-[10px] w-[70%] font-medium rounded-md bg-neutral-200/70 animate-pulse" />
                      </div>
                     

                      <span className="mt-0.5"></span>
                      </p>
                    <p className=" h-[15px] w-[40%] font-medium rounded-md bg-neutral-200/70 animate-pulse"></p>
                  </div>
                </li>
              ))
            )
        }
      </ul>
    </div>
  )
});

SchoolsList.displayName = "SchoolsList";
export default SchoolsList;