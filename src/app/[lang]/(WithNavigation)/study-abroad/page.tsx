"use client";

import SchoolsList from "@SharedComponents/SchoolList";
import FilterSelector, { degreeFilter } from "@SharedComponents/FiltterSelector";
import { FormControl, MenuItem, Select } from "@mui/material";
import langs from "@dictionaries/langs"
import api from "@redux/api";
import LoadingButton from "@SharedComponents/LoadingButton";
import { countryList } from "@SharedData/CountryList";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getURL } from "next/dist/shared/lib/utils";
import { degreeList } from "@SharedData/degreeList";

interface IProps {
  params: {
    lang: string;
  };
}

export default function StudyAbroad({ params }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const query = getURL()?.split("?")[1];
  const listArrangement = "grid";


  const [ searchData, setSearchData ] = useState({ location: "", program: "", timeframe: "", from: "", to: "", name: "", cursor: "" });
  const [ selectedFilters, setSelectedFilters ] = useState<Array<string>>([]);
  const [ searchQuery, setSearchQuery ] = useState("");

  const [ getSchoolsTrigger, { isLoading, isFetching, data, error } ] = (searchQuery || query) ? api.adminApis.useLazyClientSearchSchoolsQuery() : api.adminApis.useLazyClientGetSchoolsQuery();
  const [ getProgramsTrigger, { data: programs } ] = api.adminApis.useLazyGetSchoolProgramsQuery();

  useEffect(() => {
    if (!programs) {
      console.log("firing")
      getProgramsTrigger("");
    }
  }, [ programs, searchData, searchQuery ]);

  console.log(query)
  useEffect(() => {
    query ? getSchoolsTrigger(query) : getSchoolsTrigger("");
  }, [ ]);

  useEffect(() => {
    query ? getSchoolsTrigger(query) : getSchoolsTrigger("");
  }, [ query ]);

  useEffect(() => {
    // setSearchQuery(`${searchData.location && `location=${searchData.location}`}${searchData.program && `&program=${searchData.program}`}${searchData.name && `&name=${searchData.name}`}${searchData.from && `&from=${searchData.from}`}${searchData.to && `&to=${searchData.to}`}${(searchData.cursor) && `&cursor=${searchData.cursor}`}`);
    console.log(searchQuery)
    getSchoolsTrigger(searchQuery);
  }, [ searchQuery ]);

  const handleSelectFilter = (arg: string): void => {
    if (selectedFilters.includes(arg)){
      setSelectedFilters(selectedFilters.filter((val: string) => val != arg ));
    } else {
      setSelectedFilters([ ...selectedFilters, arg ]);
    }
  }

  const handleTextInput = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|any>|any): void => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  }

  const getNextPage = (): void => {
    setSearchQuery("");
    getSchoolsTrigger({ direction: "forward", cursor: data?.nextCursor})
  }

  const getPreviousPage = (): void => {
    setSearchQuery("");
    getSchoolsTrigger({ direction: "backward", cursor: data?.previousCursor})
  }

  const handleSearch = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearchQuery(`${searchData.location && `location=${searchData.location}`}${searchData.program && `&program=${searchData.program}`}${searchData.name && `&name=${searchData.name}`}${searchData.from && `&from=${searchData.from}`}${searchData.to && `&to=${searchData.to}`}${(searchData.cursor) && `&cursor=${searchData.cursor}`}`);

    // if (query) router.push(`/${pathname.split("/")[1]}/study-abroad?${searchData.location && `location=${searchData.location}`}${searchData.program && `&program=${searchData.program}`}${searchData.name && `&name=${searchData.name}`}${searchData.from && `&from=${searchData.from}`}${searchData.to && `&to=${searchData.to}`}${(searchData.cursor) && `&cursor=${searchData.cursor}`}`)
    if (query) router.push(`/${pathname.split("/")[1]}/study-abroad`);
    // getSchoolsTrigger(`${searchData.location && `location=${searchData.location}`}${searchData.program && `&program=${searchData.program}`}${searchData.name && `&name=${searchData.name}`}${searchData.from && `&from=${searchData.from}`}${searchData.to && `&to=${searchData.to}`}${(searchData.cursor) && `&cursor=${searchData.cursor}`}`)
  }


  console.log(error)
  // console.log(searchData)
  // console.log(searchQuery)
  return (
    <main className="p-4 grid grid-rows-[max-content_1fr] animate-fade-in min-h-[calc(100vh-80px)]">
      <div className="form-container container mx-auto shadow-lg my-[clamp(3rem,5vmax,6rem)] z-[1] mt-10 bg-white rounded-lg w-full md:w-[95%] max-w-screen-2xl">        
      <form onSubmit={handleSearch} className="input-group flex flex-row gap-2 justify-between items-center p-4">
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
                    <MenuItem key={country.name} className="" value={country.code}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </label>
          
          <label htmlFor="location" className="text-neutral-400 text-sm flex flex-col">
            {langs[params.lang as keyof typeof langs].form.studyLabel}
            {/* <input name="courseOfStudy" onChange={handleTextInput} type="text" placeholder="Enter course of study" className="px-3 py-2 focus:outline outline-1 rounded-md text-slate-700 focus:outline-slate-300" /> */}
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
                <MenuItem className="!p-0 !hidden" value="">{langs[params.lang as keyof typeof langs].form.selectProgram}</MenuItem>
                {
                  degreeList.map((degType: string) => (
                    <MenuItem key={degType} value={degType}>{degType}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </label>
          <label htmlFor="location" className="text-neutral-400 text-sm flex flex-col">
            {langs[params.lang as keyof typeof langs].form.timeframeLabel}
            <FormControl fullWidth>
              <Select
                itemID="location"
                
                displayEmpty
                value={searchData.name}
                onChange={handleTextInput}
                name="name"
                defaultValue=""
                sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
                
              >
                <MenuItem className="!p-0 !hidden" value="">{langs[params.lang as keyof typeof langs].form.selectTimeframe}</MenuItem>
                {
                  programs && programs?.map((program: string) => (
                    <MenuItem value={program}>{program}</MenuItem>
                  ))
                }
                {/* <MenuItem value="Dec 2023 - March 2024">Dec 2023 - March 2024</MenuItem>
                <MenuItem value="April - July 2024">April - July 2024</MenuItem>
                <MenuItem value="Aug - Nov 2024">Aug - Nov 2024</MenuItem>
                <MenuItem value="Dec 2024 to Mar 2025">Dec 2024 to Mar 2025</MenuItem> */}
                
                {/* <MenuItem value={20}>{langs[params.lang as keyof typeof langs].form.selectCountryOption1}</MenuItem>
                <MenuItem value={30}>{langs[params.lang as keyof typeof langs].form.selectCountryOption2}</MenuItem> */}
              </Select>
            </FormControl>
          </label>

          {/* ... other form elements ... */}

          <button className="button bg-red-500 h-full flex flex-row py-2 px-6 items-center rounded-md gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec30e33db9ff2542020699f255cdc699c343a9eea71f9d3d7995882140f597ea?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              alt="Search Icon"
            />
            <span className="text-white text-center text-base font-medium">
              {langs[params.lang as keyof typeof langs].form.searchButton}
            </span>
          </button>
        </form>
      </div>

      <section className="grid gap-x-2  lg:gap-x-3 md:mx-[clamp(1px,calc(1vw*2),50px)] 2xl:mx-auto max-w-screen-2xl xl:gap-x-4 sm:grid-cols-[1fr_5fr] h-full">
        <aside className="hidden h-max sticky top-[100px] sm:block overflow-y-auto w-[250px]">
          <details open className="appearance-none mb-5 w-full">
            <summary className="text-slate-500 text-center text-[0px] h-[15px] relative marker font-semibold items-center gap-x-2 justify-between marker:appearance-none mb-6 ">
              <h3 className=" text-[15px] block absolute">{langs[params.lang as keyof typeof langs].studyAbroad.degree}</h3>
            </summary>
            <FilterSelector selectionGroup={selectedFilters} setSelectionGroup={setSelectedFilters} params={params} filters={langs[params.lang as keyof typeof langs].studyAbroad.degreeFilter} />
          </details>
        </aside>

        <div className="grid h-full grid-rows-[1fr_max-content]">
          <SchoolsList routeProfix="/dashboard/jobs" data={data?.data} loading={isFetching} selectedFilters={selectedFilters} arrangement={listArrangement} />

          <div className="flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
            <button onClick={getPreviousPage} disabled={data?.previousCursor ? false : true} className={`${data?.previousCursor ? "text-stone-700" : "text-stone-300"} border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Previous
            </button>
            {/* <div className=" text-ellipsis text-slate-500  max-w-none sm:max-w-[180px] md:max-w-none whitespace-nowrap overflow-hidden">
              {
                Array.from({ length: paginationData?.data?.numPages }).map((_, index: number) => (
                  <button key={index} className="bg-primary-pale/30 border border-white hover:border-primary-red rounded-md duration-300 text-primary/90 px-3 py-1">{index+1}</button>
                ))
              }
            </div> */}
            <button onClick={getNextPage} disabled={data?.nextCursor ? false : true} className={`${data?.nextCursor ? "text-stone-700" : "text-stone-300"} border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}>
              Next
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}