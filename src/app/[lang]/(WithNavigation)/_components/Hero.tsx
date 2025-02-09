// import { useTranslation } from 'react-i18next';
"use client";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getDictionary } from "../../dictionaries";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import langs from "../../dictionaries/langs";
import { countryList, getCountryNameFromCode } from "@SharedData/CountryList";
import { ChangeEvent, useEffect, useState } from "react";
import { degreeList } from "@SharedData/degreeList";
import api from "@redux/api";

interface IProps {
  params: {
    lang: string;
  };
}
export default function Hero({ params }: IProps) {
  const pathname = usePathname();
  const router = useRouter();

  // const [ searchData, setFormData ] = useState({ location: "", courseOfStudy: "", timeframe: "" })
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState({
    location: "",
    school: "",
    timeframe: "",
    from: "",
    to: "",
    name: "",
    cursor: "",
  });
  // const [ searchData, setSearchData ] = useState({ location: "",school: ""});

  const { data: schools,isLoading:isLoadingSchools } = api.adminApis.useGetSchoolsInCountryQuery(
    searchData.location,
    {
      skip: searchData.location === "",
    }
  );

  const { data: courses, isLoading:isLoadingPrograms,refetch,  } = api.adminApis.useGetProgramsInSchoolsQuery(
    searchData.school,
    {
      skip: searchData.school === "",
    }
  );



  useEffect(() => {
    setSearchData({ ...searchData, school: "", name: "" });
  }, [searchData.location]);

  useEffect(() => {
      setSearchData({ ...searchData, name: "" });
  }, [searchData.school]);

  // useEffect(() => {
  //   if(courses?.length > 0){
  //     refetch()
  //   }
  // }, [courses,searchData.school,searchData.location]);
 

  console.log(courses)

  // const [getProgramsTrigger, { data: programs }] =
  //   api.adminApis.useLazyGetSchoolProgramsQuery();

  // useEffect(() => {
  //   // let interval: NodeJS.Timeout|null = null;
  //   // if (!programs) {
  //   //   interval = setInterval(() => {
  //   //     console.log("Some running");
  //   //     getProgramsTrigger("");
  //   //   }, 400);
  //   // } else {
  //   //   console.log("Some ele runing")
  //   //   if (interval) clearTimeout(interval);
  //   // }
  //   // if (!programs) {
  //   //   console.log("firing");
  //   //   getProgramsTrigger("");
  //   // }
  // }, [programs, searchData, searchQuery]);

  // useEffect(() => {
  //   setSearchQuery(
  //     `/${searchData.location && `location=${searchData.location}`}${
  //       searchData.school && `&school=${searchData.school}`
  //     }${searchData.name && `&name=${searchData.name}`}${
  //       searchData.from && `&from=${searchData.from}`
  //     }${searchData.to && `&to=${searchData.to}`}${
  //       searchData.cursor && `&cursor=${searchData.cursor}`
  //     }`
  //   );
  // }, [searchData]);
  useEffect(() => {
    setSearchQuery(`/${searchData.name && `${searchData.name}`}`);
  }, [searchData]);

  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any
  ): void => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  // const dict = await getDictionary(params.lang)
  // const { t } = useTranslation();
  // console.log(searchData);
  // console.log(countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((x: any) => x?.name))

  console.log(schools);

  return (
    <section
      id="hero"
      className="flex-col min-h-[calc(100vh-100px)] after:h-full after:w-full after:bg-black/40 after:absolute bg-[url(/images/home/hero.png)] bg-no-repeat bg-cover items-center overflow-hidden relative flex justify-center px-16 py-12 max-md:px-5"
    >
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

      <div className="form-container z-[1] mt-10 bg-white rounded-lg w-[95%] xl:w-full  max-w-screen-2xl lg:px-6">
        <form className="input-group  flex flex-row gap-2 justify-between items-center p-4 max-lg:flex-col">
          <label
            htmlFor="location"
            className="text-neutral-400 bg-neutral-100 rounded-lg py-2 px-4 max-lg:w-full lg:bg-white text-sm flex flex-col"
          >
            {langs[params.lang as keyof typeof langs].form.locationLabel}
            {/* <FormControl fullWidth className="">
              <Autocomplete
                options={countryList ? countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name)) : []}
                getOptionLabel={(country) => country.name as any}
                // getOptionSelected={(country: any, selectedValue: any) => country.code === selectedValue.code}
                value={countryList.find((country) => country.code === searchData.location)}
                onChange={(e, val) => setSearchData({ ...searchData, location: val?.code as string })}
                // options={countryList ? countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name)) : []}
                sx={{ "& ul": { backgroundColor: "blue !important", } }}
                // sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className=" [&_*]:whitespace-nowrap   [&>*>*>*>*>*]:!text-[0px] [&>*]:min-w-[250px] [&>*]:!px-0 [&_*]:!border-none font-medium text-stone-500 min-w-[180px]"
                renderInput={(params) =>
                  <TextField
                  {...params}
                  name="name"
                  placeholder="Select Country"
                  sx={{ '& > *': { border: 'none', fontWeight: "500", color: "black !important" } }}
                  className="[&>*]:!py-1 [&_input]:!px-0 !border placeholder:!text-black !border-red-400 [&>*]:!px-0  [&>*]:!border-none font-medium !text-red-600 min-w-[180px]"
                  // label="Select Course"
                  />}

              />
            </FormControl> */}

            <FormControl fullWidth>
              <Select
                itemID="location"
                displayEmpty
                defaultValue=""
                value={searchData.location}
                onChange={handleTextInput}
                name="location"
                sx={{
                  "& > *": {
                    border: "none",
                    padding: "0.5rem 0",
                    fontWeight: "500",
                    color: "rgba(60, 60, 60, 1) !important",
                  },
                }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
              >
                <MenuItem className="!p-0 !opacity-0" value="">
                  {langs[params.lang as keyof typeof langs].form.selectCountry}
                </MenuItem>
                {countryList
                  .sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
                  ?.map((country: (typeof countryList)[0], index: number) => (
                    <MenuItem key={index} className="" value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </label>

          <label
            htmlFor="location"
            className="text-neutral-400 bg-neutral-100 rounded-lg py-2 px-4 max-lg:w-full lg:bg-white text-sm flex flex-col"
          >
            {langs[params.lang as keyof typeof langs].form.desiredDegree}
            <FormControl fullWidth>
              <Select
                itemID="location"
                displayEmpty
                sx={{
                  "& > *": {
                    border: "none",
                    padding: "0.5rem 0",
                    fontWeight: "500",
                    color: "rgba(60, 60, 60, 1) !important",
                  },
                }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
                value={searchData.school}
                name="school"
                onChange={handleTextInput}
                defaultValue="No Schools available"
              >
                <MenuItem className="!p-0 !hidden" value="">
                  {langs[params.lang as keyof typeof langs].form.selectDegree}
                </MenuItem>

                {schools?.length === 0 && (
                  <MenuItem value="" disabled>
                    {"No Schools available"}
                  </MenuItem>
                )}


                {isLoadingSchools  && (
                  <MenuItem value="" disabled>
                    {"Loading Available Schools Please Wait..."}
                  </MenuItem>
                )}


                {schools?.map((degType: any) => (
                  <MenuItem key={degType._id} value={degType?.schoolId}>
                    {degType?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </label>

          <label
            htmlFor="location"
            className="text-neutral-400 bg-neutral-100 rounded-lg py-2 px-4 max-lg:w-full lg:bg-white text-sm flex flex-col"
          >
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
                  programs && programs?.map((school: string) => (
                    <MenuItem value={school}>{school}</MenuItem>
                  ))
                }
            </TextField>
            </FormControl> */}

            {/* <FormControl fullWidth className="">
              <Autocomplete
                // disablePortal
                value={searchData.name}
                onChange={(e, val) => setSearchData({ ...searchData, name: val as string})}
                options={programs ? programs : []}
                sx={{ "& ul": { backgroundColor: "blue !important", } }}
                // sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                className="   [&>*>*>*>*>*]:!text-[0px]  [&>*]:!px-0 [&_*]:!border-none font-medium text-stone-500 "
                renderInput={(params) =>
                  <TextField
                  {...params}
                  name="name"
                  placeholder="Select Course"
                  sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgba(60, 60, 60, 1) !important" } }}
                  className="[&>*]:!py-1  !border placeholder:!text-black !border-red-400 [&>*]:!px-0 [&>*]:!border-none font-medium !text-red-600 min-w-[180px]"
                  // label="Select Course"
                  />}
              />
            </FormControl> */}

            <FormControl fullWidth>
              <Select
                displayEmpty
                value={searchData.name}
                onChange={handleTextInput}
                name="name"
                defaultValue=""
                sx={{
                  "& > *": {
                    border: "none",
                    padding: "0.5rem 0",
                    fontWeight: "500",
                    color: "rgba(60, 60, 60, 1) !important",
                  },
                }}
                className="[&>*]:!py-2 [&>*]:!px-0 [&>*]:!border-none font-medium text-stone-500 min-w-[180px]"
              >
                <MenuItem className="!p-0 !hidden" value="">
                  {langs[params.lang as keyof typeof langs].form.selectProgram}
                </MenuItem>

                {isLoadingPrograms  && (
                  <MenuItem value="" disabled>
                    {"Loading Available Courses Please Wait..."}
                  </MenuItem>
                )}

                {courses?.length === 0 ? (
                  <MenuItem value="" disabled>
                    {"No Available Course"}
                  </MenuItem>
                ) : (
                  courses?.map((course: any, index: number) => (
                     // @ts-ignore
                    course.programs?.map((text,id) => (
                      <MenuItem key={id} value={course.schoolId}>
                      {text}
                    </MenuItem>
                    )))
                  ))
                }
              </Select>
            </FormControl>
            {/* <input name="courseOfStudy" onChange={handleTextInput} type="text" placeholder="Enter course of study" className="px-3 py-2 focus:outline outline-1 rounded-md text-slate-700 focus:outline-slate-300" /> */}
          </label>

          {/* ... other form elements ... */}

          {/* <Link
            href={`/${pathname.split("/")[1]}/study-abroad${searchQuery}`}
            className="button  bg-[#FF4512] max-lg:w-full max-md:py-3 flex flex-row py-2 px-6 items-center justify-center rounded-lg gap-2  lg:hidden"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec30e33db9ff2542020699f255cdc699c343a9eea71f9d3d7995882140f597ea?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              alt="Search Icon"
            />
            <span className="text-white text-center text-base font-medium">
              {langs[params.lang as keyof typeof langs].form.searchButton}
            </span>
          </Link> */}

          <button
            title={`/${pathname.split("/")[1]}/study-abroad${searchQuery}`}
            type="button"
            onClick={() => {
              if (
                searchData.location !== "" &&
                searchData.school !== "" &&
                searchData.name !== ""
              ) {
                router.push(
                  `/${pathname.split("/")[1]}/study-abroad${searchQuery}`
                );
              } else {
                alert("Select Country,School And Course To Apply");
              }
            }}
            className="button  bg-[#FF4512] max-lg:w-full max-md:py-3 flex flex-row py-2 px-6 items-center justify-center rounded-lg gap-2  lg:hidden"
          >
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
        {/* <Link href={`/${pathname.split("/")[1]}/study-abroad${searchQuery}`} className="bg-[#FF4512]  py-4 px-6 w-full h-full hidden lg:block rounded-lg gap-2 lg:my-5 md:mt-2 md:mb-2  mx-auto">
            <span className="text-white text-center text-base font-medium block">
              {langs[params.lang as keyof typeof langs].form.searchButton}
            </span>
          </Link> */}

        <button
          title={`/${pathname.split("/")[1]}/study-abroad${searchQuery}`}
          type="button"
          onClick={() => {
            if (
              searchData.location !== "" &&
              searchData.school !== "" &&
              searchData.name !== ""
            ) {
              router.push(
                `/${pathname.split("/")[1]}/study-abroad${searchQuery}`
              );
            } else {
              alert("Select Country,School And Course To Apply");
            }
          }}
          className="bg-[#FF4512]  py-4 px-6 w-full h-full hidden lg:block rounded-lg gap-2 lg:my-5 md:mt-2 md:mb-2  mx-auto"
        >
          <span className="text-white text-center text-base font-medium block">
            {langs[params.lang as keyof typeof langs].form.searchButton}
          </span>
        </button>
      </div>

      {/* <div className="block lg:hidden mt-10 z-[1]">
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
      </div> */}
    </section>
  );
}
