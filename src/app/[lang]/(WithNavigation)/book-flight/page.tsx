"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FormControl, MenuItem, Select } from "@mui/material";
import { countryList } from "@SharedData/CountryList";
import langs from "@dictionaries/langs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IProps {
  params: {
    lang: string;
  };
}

export default function BookFlight({ params }: IProps) {
  const router = useRouter();
  const [ formData, setformdata ] = useState({
    returnType: "RETURN"
  })

  // const handleSubmit = (e: any): void => {
  //   e.preventDefault();
  //   router.push("https://www.wakanow.com");
  // }

  return (
    <div className="animate-fade-in flex relative justify-center overflow-hidden bg-[url(/images/book-flight/airplane.jpg)] bg-cover bg-no-repeat after:h-full after:w-full after:bg-black/60 after:absolute items-center min-h-[calc(100vh-80px)]">
    <section className="self-center w-full lg:container 2xl:max-w-screen-2xl mb-24 max-md:max-w-full max-md:my-10">
      <div className=" gap-5 md:pt-12 flex px-3 items-center  max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="[ flex flex-col items-stretch w-[53%] max-md:w-full max-md:ml-0">
          <div className="flex z-[1] flex-col max-md:max-w-full max-md:mt-10">
            <h1 className="text-white max-md:text-center text-[clamp(20px,5vw,70px)] max-w-[700px] font-semibold leading-[50px] lg:leading-[63px] xl:leading-[72px] self-stretch max-md:max-w-full max-md:text-4xl">
              {langs[params.lang as keyof typeof langs].bookFlight.heading}
            </h1>
            <p className="text-white max-md:text-center text-lg leading-7 self-stretch mt-6 max-md:max-w-full">
              {langs[params.lang as keyof typeof langs].bookFlight.description}
            </p>
          </div>
        </div>
        <div className="bg-white    z-[1] max-w-xl max-md:mt-6 max-md:mx-auto flex flex-col items-stretch w-[47%] ml-auto  max-md:w-full p-4 lg:p-5 xl:p-6 rounded-xl">
          <form className="items-stretch flex flex-col my-auto max-md:max-w-full mt-1">
            <ul className="flex flex-row gap-4 ml-2 mt-2 mb-6">
              <li className="basis-1/2">
                <label className="flex flex-row items-center gap-2.5">
                  <input checked={formData.returnType === "RETURN"} onChange={() => setformdata({ ...formData, returnType: "RETURN" })} type="radio" name="returnType" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2" />
                  <p className="text-zinc-500 text-sm font-medium leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.return}</p>
                </label>
              </li>
              <li className="basis-1/2">
                <label className="flex flex-row items-center gap-2.5">
                  <input checked={formData.returnType === "ONE-WAY"} onChange={() => setformdata({ ...formData, returnType: "ONE-WAY" })} type="radio" name="returnType" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2" />
                  <p className="text-zinc-500 text-sm font-medium leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.oneWay}</p>
                </label>
              </li>
            </ul>
            <div className="items-stretch self-stretch flex justify-between max-md:gap-2.5 gap-5 mt-2 max-md:max-w-full">
              <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.flyingFrom}</p>
                <FormControl fullWidth>
                  <Select
                    itemID="location"
                    defaultValue={10}
                    className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-0"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    {/* <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].bookFlight.flyingFrom}</MenuItem> */}
                    {countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                      <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>
              <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.flyingTo}</p>
                <FormControl fullWidth>
                  <Select
                    itemID="location"
                    defaultValue={1}
                    className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-0"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    {/* <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].bookFlight.flyingTo}</MenuItem> */}
                    {countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                      <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>
            </div>
            <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
              <label htmlFor="departureDate" className="grow basis-1/2">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.departureDate}</p>
                <input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  placeholder="Enter here"
                  className="text-neutral-500 bg-white w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
                />
              </label>
              {
                formData.returnType === "RETURN"
                  && (
                    <label htmlFor="returnDate" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.returnDate}</p>
                      <input
                        id="returnDate"
                        name="returnDate"
                        type="date"
                        placeholder="Enter here"
                        className="text-neutral-500 bg-white w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
                      />
                    </label>
                  )
              }
            </div>
            <label htmlFor="location" className="text-neutral-400 text-sm flex mt-3 grow basis-1/2 flex-col">
              <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.adult}</p>
              <FormControl fullWidth>
                <Select
                  itemID="location"
                  defaultValue={0}
                  className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem className="!p-0 !hidden" value={10}>1</MenuItem>
                  {Array.from({ length: 10 }).map((_, index: number) => (
                    <MenuItem key={index} value={index}>{index}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </label>
            <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
              <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.child}</p>
                <FormControl fullWidth>
                  <Select
                    itemID="location"
                    defaultValue={0}
                    className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem className="!p-0 !hidden" value={10}>From</MenuItem>
                    {Array.from({ length: 10 }).map((_, index: number) => (
                      <MenuItem key={index} value={index}>{index}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>
              <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookFlight.infant}</p>
                <FormControl fullWidth>
                  <Select
                    itemID="location"
                    defaultValue={0}
                    className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem className="!p-0 !hidden" value={10}>To</MenuItem>
                    {Array.from({ length: 10 }).map((_, index: number) => (
                      <MenuItem key={index} value={index}>{index}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>
            </div>
            <label htmlFor="name" className="grow mt-8 flex basis-full bg-yellow-300">
              <Link href="https://www.wakanow.com" target="_blank" rel="noreferrer" className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-[#FF4512] max-w-full px-16 py-3 rounded-lg self-start max-md:px-5">
                {langs[params.lang as keyof typeof langs].bookFlight.findFlights}
              </Link>
            </label>
          </form>
        </div>
      </div>
    </section>
  </div>
  );
}
