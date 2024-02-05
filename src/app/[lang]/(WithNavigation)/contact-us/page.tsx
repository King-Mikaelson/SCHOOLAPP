"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import langs from "@dictionaries/langs"
import { useEffect, useState } from "react";
import { countryList } from "@SharedData/CountryList";
import api from "@redux/api";
import LoadingButton from "@SharedComponents/LoadingButton";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import Image from "next/image";
import emailjs from "emailjs-com";

interface IProps {
  params: {
    lang: string;
  };
}

const initialState = {
  fullName: "", email: "", phone: "", country: "", question: ""
}

export default function ContactUs({ params }: IProps) {
  const [ formData, setFormData ] = useState(initialState);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isSucessful, setIsSucessful ] = useState<boolean>(false);
  // const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" })

  // const [ addContactUs, { isSuccess, reset, isLoading: isSubmitting, error: submitError } ] = api.adminApis.useAddContactUsMutation();

  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (isSucessful) setIsSucessful(false);
  }

  // useEffect(() => {
  //   if(phoneDetails.number.startsWith("0")){
  //     setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number.slice(1, phoneDetails.number.length - 2)}`})
  //   } else {
  //     setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number }`})
  //   }
  // }, [ phoneDetails ]);

  /* Sucessful Submission Effect */
  // useEffect(() => {
  //   if (isSucessful) {
  //     setFormData(initialState);
  //   };
  // }, [ isSucessful ]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    setIsLoading(true);

    const SERVICE_ID ="service_q21igjv";
    const TEMPLATE_ID ="template_hm8bgvp";
    const USER_ID ="rotjEdPIEU_gHvNVt";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result)=>{
        // console.log(result.text);
        setFormData(initialState);
        setIsLoading(false);
        setIsSucessful(true);
        // alert("Mail sucessfully sent")
      })
      .catch((error)=>{
        setIsLoading(false);
        alert("Something went wrong");
        // console.log(error);
      })
    // setFormContent({ name:"", email: "", title: "", message: ""})

    
  }

 

  return (
    <main className="animate-fade-in my-12 justify-center max-md:max-w-full min-h-[calc(100vh-175px)]">
    <div className="container xl:max-w-screen-xl mx-auto">
      <div className="px-[clamp(1rem,calc(1vw*2),50px)] 2xl:px-auto  max-w-screen-2xl">
        <div className="form-container   mt-[clamp(2rem,2vmax,4rem)]  z-[1] mb-2 bg-whit rounded-lg w-full">
          <h1 className="text-3xl font-semibold text-stone-700 max-w-[500px] lg:text-4xl xl:text-5xl">{langs[params.lang as keyof typeof langs].contactUs.getInTouch}</h1>
          <p className="text-sm text-stone-600 mt-3 w-[50%] min-w-[400px]">{langs[params.lang as keyof typeof langs].contactUs.thanksForStoppingBy}</p>
        </div>
      </div>

      <div className="grid relative w-full container mt-8 px-[clamp(1rem,calc(1vw*2),50px)] 2xl:px-auto max-w-screen-xl gap-[clamp(1rem,3vw,7rem)] md:grid-cols-[4fr_3fr] h-full">
        <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
          {/* <form action="mailto:GTWAgency@gmail.com" className="  items-stretch flex flex-col my-auto max-md:max-w-full max-md:mt-10"> */}
          <form onSubmit={handleSubmit} className="  items-stretch flex flex-col my-auto max-md:max-w-full max-md:mt-10">
            <label htmlFor="fullName" className="grow basis-full">
              <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactUs.yourName}</p>
              <input
                required
                disabled={isLoading}
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange(e)}
                placeholder={langs[params.lang as keyof typeof langs].contactUs.typeYourFullName}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
              />
            </label>

            <label htmlFor="email" className="grow basis-full mt-5">
              <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactUs.yourEmailAddress}</p>
              <input
                required
                disabled={isLoading}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                placeholder={langs[params.lang as keyof typeof langs].contactUs.typeYourEmailAddress}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
              />
            </label>

            <div className="items-stretch self-stretch flex justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap">
              <label htmlFor="mobileNumber" className="grow basis-1/3">
                <p className="text-neutral-700 grow basis-full text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactUs.mobileNumber}</p>
                <span className="grid">
                  {/* <FormControl fullWidth>
                    <Select
                      itemID="location"
                      defaultValue="+234"
                      className="[&>*]:!py-1.5 [&>*]:!px-2 [&>*]:!rounded-md mt-1 [&>*]:!flex [&>*]:!items-center !min-w-max placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                      value={phoneDetails.countryCode}
                      onChange={(e) => setPhoneDetails({ ...phoneDetails, countryCode: e.target.value })}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>+234</MenuItem>
                      {
                        countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                          <MenuItem key={country.name} className="" value={country.phone}><Image className="mr-0.5" width={35} height={17} src={`/images/country-flag/${country?.code}.svg`} alt="flag" />({country.name?.slice(0,3)}) +{country.phone}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl> */}
                  <input
                    required
                    disabled={isLoading}
                    id="mobileNumber"
                    name="phone"
                    onChange={handleInputChange}
                    type="tel"
                    value={formData.phone}
                    // onChange={(e) => {setPhoneDetails({ ...phoneDetails, number: e.target.value.replace(/[^0-9]/ig, "") })}}
                    placeholder={langs[params.lang as keyof typeof langs].contactUs.enterMobileNumber}
                    className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
                  />
                </span>
              </label>
            </div>

            <label htmlFor="location" className="text-neutral-400 text-sm flex mt-5 grow basis-1/2 flex-col">
              <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactUs.selectYourCountry}</p>
              <FormControl fullWidth>
                <Select
                  itemID="location"
                  required
                  disabled={isLoading}
                  defaultValue={"NG"||10}
                  className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                  name="country"
                  value={formData?.country}
                  onChange={handleInputChange}
                >
                  <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].contactUs.select}</MenuItem>
                  {
                    countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                      <MenuItem key={index} value={country.name}>{country?.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </label>

            <label htmlFor="question" className="grow basis-full mt-5">
              <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactUs.whatsYourQuestion}</p>
              <textarea
                id="question"
                name="question"
                rows={8}
                required
                disabled={isLoading}
                value={formData.question}
                onChange={(e) => handleInputChange(e)}
                placeholder={langs[params.lang as keyof typeof langs].contactUs.typeYourQuestion}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 p-3 rounded-md items-start"
              />
            </label>

            {/* <ErrorBlock error={submitError} className="w-full mt-4" /> */}

            <label htmlFor="submit" className="grow basis-full">
              <LoadingButton
                loading={isLoading}
                sucess={isSucessful}
                successText="Sucessful!"
                type="submit"
                className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-5 px-16 py-3 rounded-lg self-start max-md:px-5"
              >
                {langs[params.lang as keyof typeof langs].contactUs.submit}
              </LoadingButton>
            </label>
          </form>
        </div>

        <div className="flex flex-col">
          <div className="bg-[#007BE6] flex flex-col px-6 py-7 rounded-xl">
            <div className="text-sky-100 text-3xl font-medium leading-10 tracking-tighter">
              {langs[params.lang as keyof typeof langs].contactUs.chatWithUs}
            </div>
            <div className="text-sky-100 text-sm leading-5 mt-2">
              {langs[params.lang as keyof typeof langs].contactUs.ourExperiencedAndFriendlyTeam}
            </div>

            <div className="text-white text-md font-semibold leading-6 tracking-tight whitespace-nowrap mt-1">
              admin@gtwhub.com
            </div>

            <div className="text-sky-100 text-3xl font-medium leading-10 tracking-tighter mt-7">
              {langs[params.lang as keyof typeof langs].contactUs.callUs}
            </div>
            <div className="text-sky-100 text-sm leading-5 mt-2">
              {langs[params.lang as keyof typeof langs].contactUs.ourExperiencedAndFriendlyTeam}
            </div>
            <div className="text-white text-lg font-semibold leading-6 tracking-tight whitespace-nowrap mt-2">
              +2347031918634
            </div>

            <div className="text-sky-100 text-3xl font-medium leading-10 tracking-tighter mt-6">
              {langs[params.lang as keyof typeof langs].contactUs.visitUs}
            </div>
            <div className="text-sky-100 text-sm leading-5 mt-1">
              {langs[params.lang as keyof typeof langs].contactUs.comeSayHello}
            </div>

            <div className="text-white text-lg font-normal leading-6 mt-7">
              Abuja, NigeriaANON PlazaBS, Second FloorPlot 1085 Joseph Gomwalk Way, Gudu, Abuja (Opposite Ajuji Hotel)
            </div>

            <div className="text-white text-lg font-normal leading-6 tracking- mt-4">
              Owerri, Nigeria Silas PlazaLevel 2, Unit 7, KM 6 Owerri-Orlu RoadOwerri, Imo State (After Akwakuma Junction)
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}


