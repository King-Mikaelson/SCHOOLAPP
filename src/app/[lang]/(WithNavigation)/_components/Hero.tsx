// import { useTranslation } from 'react-i18next';
"use client";

import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getDictionary } from "../../dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import langs from "../../dictionaries/langs";
import { countryList } from "@SharedData/CountryList";
import { ChangeEvent, useEffect, useState } from "react";
import { degreeList } from "@SharedData/degreeList";
import api from "@redux/api";

interface IProps {
  params: {
    lang: string
  }
}
export default function Hero({ params }: IProps) {
  const pathname = usePathname();

  // const [ searchData, setFormData ] = useState({ location: "", courseOfStudy: "", timeframe: "" })
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ searchData, setSearchData ] = useState({ location: "", program: "", timeframe: "", from: "", to: "", name: "", cursor: "" });

  const [ getProgramsTrigger, { data: programs } ] = api.adminApis.useLazyGetSchoolProgramsQuery();

  useEffect(() => {
    // let interval: NodeJS.Timeout|null = null;
    // if (!programs) {
    //   interval = setInterval(() => {
    //     console.log("Some running");
    //     getProgramsTrigger("");
    //   }, 400);
    // } else {
    //   console.log("Some ele runing")
    //   if (interval) clearTimeout(interval);
    // }
    if (!programs) {
      console.log("firing")
      getProgramsTrigger("");
    }
  }, [ programs, searchData, searchQuery ]);

  useEffect(() => {
    setSearchQuery(`?${searchData.location && `location=${searchData.location}`}${searchData.program && `&program=${searchData.program}`}${searchData.name && `&name=${searchData.name}`}${searchData.from && `&from=${searchData.from}`}${searchData.to && `&to=${searchData.to}`}${(searchData.cursor) && `&cursor=${searchData.cursor}`}`);
  }, [ searchData ]);

  const handleTextInput = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|any>|any): void => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  }

  // const dict = await getDictionary(params.lang)
  // const { t } = useTranslation();
  console.log(programs)
  console.log(searchData?.name)
  return (
    <section id="hero" className="flex-col min-h-[calc(100vh-100px)] after:h-full after:w-full after:bg-black/40 after:absolute bg-[url(/images/home/hero.png)] bg-no-repeat bg-cover items-center overflow-hidden relative flex justify-center px-16 py-12 max-md:px-5">
      <header className="header z-[1] max-w-[1000px]">
        {/* <div className="text-sky-500 text-center text-sm leading-4 tracking-widest uppercase self-center whitespace-nowrap">
          {langs[params.lang as keyof typeof langs].common.welcome}
        </div> */}
        <h1 className="text-white text-center text-7xl mx-auto font-semibold leading-[72px] tracking-tighter self-center max-w-[939px] mt-8 max-md:max-w-full max-md:text-5xl max-md:leading-12">
          {langs[params.lang as keyof typeof langs].common.heroTitle}
        </h1>
        <p className="text-neutral-50 text-center mx-auto text-md md:text-lg leading-7 lg:w-[80%] self-center mt-7 max-md:max-w-full">
          {langs[params.lang as keyof typeof langs].common.heroSubtitle}
        </p>
      </header>
      
      <div className="form-container hidden lg:block z-[1] mt-10 bg-white rounded-lg w-[95%] max-w-screen-2xl">        
        <form className="input-group  flex flex-row gap-2 justify-between items-center p-4">
          <label htmlFor="location" className="text-neutral-400 text-sm flex flex-col">
            {langs[params.lang as keyof typeof langs].form.locationLabel}
            <FormControl fullWidth>
              <Select
                itemID="location"
                displayEmpty
                defaultValue=""
                value={searchData.location}
                onChange={handleTextInput}
                name="location"
                sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
              >
                <MenuItem className="!p-0 !hidden" value="">{langs[params.lang as keyof typeof langs].form.selectCountry}</MenuItem>
                {
                  countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                    <MenuItem key={index} className="" value={country.code}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </label>
          
          <label htmlFor="location" className="text-neutral-400 text-sm flex flex-col">
            {langs[params.lang as keyof typeof langs].form.studyLabel}
            {/* <FormControl fullWidth>
            <TextField
              // label="Type or select"
              variant="outlined"
              value={searchData.name}
              onChange={handleTextInput}
              name="name"
              select
              fullWidth
            >
              <MenuItem className="!p-0 !hidden" value="">{langs[params.lang as keyof typeof langs].form.selectProgram}</MenuItem>
                {
                  programs && programs?.map((program: string) => (
                    <MenuItem value={program}>{program}</MenuItem>
                  ))
                }
            </TextField>
            </FormControl> */}

            <FormControl fullWidth className="">
              <Autocomplete
                // disablePortal
                value={searchData.name}
                onChange={(e, val) => setSearchData({ ...searchData, name: val as string})}
                options={programs ? programs : []}
                sx={{ "& ul": { backgroundColor: "blue !important", } }}
                // sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className="[&>*]:!py-2 [&_*]:whitespace-nowrap   [&>*>*>*>*>*]:text-[0px] [&>*]:min-w-[250px] [&>*]:!px-0 [&_*]:!border-none font-medium text-stone-500 min-w-[180px]"
                renderInput={(params) =>
                  <TextField
                  {...params}
                  name="name"
                  placeholder="Select Course"
                  sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500",  } }}
                  className="[&>*]:!py-2  !border placeholder:!text-neutral-900 !border-red-400 [&>*]:!px-0 [&>*]:!border-none font-medium !text-stone-800 min-w-[180px]"
                  // label="Select Course"
                  />}

              />
            </FormControl>

            {/* <FormControl fullWidth>
              <Select             
                displayEmpty
                value={searchData.name}
                onChange={handleTextInput}
                name="name"
                defaultValue=""
                sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
              >
                <MenuItem className="!p-0 !hidden" value="">{langs[params.lang as keyof typeof langs].form.selectProgram}</MenuItem>
                {
                  programs && programs?.map((program: string) => (
                    <MenuItem value={program}>{program}</MenuItem>
                  ))
                }
              </Select>
            </FormControl> */}
            {/* <input name="courseOfStudy" onChange={handleTextInput} type="text" placeholder="Enter course of study" className="px-3 py-2 focus:outline outline-1 rounded-md text-slate-700 focus:outline-slate-300" /> */}
            
          </label>
          <label htmlFor="location" className="text-neutral-400 text-sm flex flex-col">
            {langs[params.lang as keyof typeof langs].form.desiredDegree}
            <FormControl fullWidth>
              <Select
                itemID="location"
                displayEmpty
                sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
                value={searchData.program}
                name="program"
                onChange={handleTextInput}
              >
                <MenuItem className="!p-0 !hidden" value="">{langs[params.lang as keyof typeof langs].form.selectDegree}</MenuItem>
                
                {
                  degreeList.map((degType: string) => (
                    <MenuItem key={degType} value={degType}>{degType}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </label>

          {/* ... other form elements ... */}

          <Link href={`/${pathname.split("/")[1]}/study-abroad${searchQuery}`} className="button bg-red-500 h-full flex flex-row py-2 px-6 items-center rounded-md gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec30e33db9ff2542020699f255cdc699c343a9eea71f9d3d7995882140f597ea?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              alt="Search Icon"
            />
            <span className="text-white text-center text-base font-medium">
              {langs[params.lang as keyof typeof langs].form.searchButton}
            </span>
          </Link>
        </form>
      </div>

      <div className="block lg:hidden mt-10 z-[1]">
        <Link href={`/${pathname.split("/")[1]}/study-abroad${searchQuery}`} className="button  bg-red-600 h-full flex flex-row py-3 px-10 items-center rounded-md gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec30e33db9ff2542020699f255cdc699c343a9eea71f9d3d7995882140f597ea?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            alt="Search Icon"
          />
          <span className="text-white text-center text-base font-medium">
            {langs[params.lang as keyof typeof langs].button.findProgram}
          </span>
        </Link>
      </div>
    </section>
  );
}