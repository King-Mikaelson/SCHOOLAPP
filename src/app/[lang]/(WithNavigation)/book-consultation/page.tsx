"use client";

import Head from 'next/head';
import { FormControl, MenuItem, Select } from "@mui/material";
import langs from "@dictionaries/langs"
import { useEffect, useState } from "react";
import { countryList } from "@SharedData/CountryList";
import api from "@redux/api";
import LoadingButton from "@SharedComponents/LoadingButton";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import Image from "next/image";
import CalendlyEmbed from '@SharedComponents/CalendlyEmbed';

interface IProps {
  params: {
    lang: string;
  };
}

const initialState = { fullName: "", email:"", phone: "", topic: "", date: "", time: "" };

export default function BookConsultation({ params }: IProps) {
  const [ formData, setFormData ] = useState(initialState);
  const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" })

  const [ addConsultation, { isSuccess, reset, isLoading: isSubmitting, error: submitError } ] = api.adminApis.useAddBookConsultationMutation();

  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (isSuccess) reset();
  };


  useEffect(() => {
    if(phoneDetails.number.startsWith("0")){
      setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number.slice(1, phoneDetails.number.length - 2)}`})
    } else {
      setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number }`})
    }
  }, [ phoneDetails ]);

  /* Sucessful Submission Effect */
  useEffect(() => {
    if (isSuccess) {
      setFormData(initialState);
      setPhoneDetails({ ...phoneDetails, number: "" });
    };
  }, [ isSuccess ]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addConsultation(formData);
  }

  return (
    <>
    
    <CalendlyEmbed url="YOUR_CALENDLY_EVENT_LINK_HERE" />
    <main className="animate-fade-in my-12 justify-center max-md:max-w-full min-h-[calc(100vh-175px)]">
      <div className="container mx-auto xl:max-w-screen-xl">
        <div className="px-[clamp(1rem,calc(1vw*2),50px)]  2xl:px-auto  max-w-screen-2xl">
          <div className="  form-container mt-[clamp(2rem,2vmax,4rem)]  z-[1] mb-2 bg-whit rounded-lg w-full">
            <h1 className="text-3xl font-semibold text-stone-700 max-w-[600px] lg:text-4xl xl:text-5xl">{langs[params.lang as keyof typeof langs].bookConsultation.title}</h1>
            <p className="text-sm text-stone-600 mt-5 w-[50%] min-w-[400px] max-w-screen-md">{langs[params.lang as keyof typeof langs].bookConsultation.subTitle}</p>
          </div>
        </div>

        <div className="grid relative w-full container mt-8 px-[clamp(1rem,calc(1vw*2),50px)] 2xl:px-auto gap-[clamp(1rem,3vw,7rem)] md:grid-cols-[4fr_3fr] h-full">
          <div className="flex flex-col max-w-screen-sm items-stretch max-md:w-full max-md:ml-0">
            <form onSubmit={handleSubmit} className="  items-stretch flex flex-col my-auto max-md:max-w-full max-md:mt-10">
              <label htmlFor="fullName" className="grow basis-full">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookConsultation.yourName}</p>
                <input
                  required
                  disabled={isSubmitting}
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder={langs[params.lang as keyof typeof langs].bookConsultation.yourName}
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
                />
              </label>

              <label htmlFor="email" className="grow basis-full mt-5">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookConsultation.yourEmailAddress}</p>
                <input
                  required
                  disabled={isSubmitting}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={langs[params.lang as keyof typeof langs].bookConsultation.yourEmailAddress}
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
                />
              </label>

              <div className="items-stretch self-stretch flex justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap">
                <label htmlFor="mobileNumber" className="grow basis-1/3">
                  <p className="text-neutral-700 grow basis-full text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookConsultation.mobileNumber}</p>
                  <span className="grid grid-cols-[1fr_3fr] gap-2">
                    <FormControl fullWidth>
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
                    </FormControl>
                    <input
                      required
                      disabled={isSubmitting}
                      id="mobileNumber"
                      value={phoneDetails.number}
                      onChange={(e) => {setPhoneDetails({ ...phoneDetails, number: e.target.value.replace(/[^0-9]/ig, "") })}}
                      placeholder={langs[params.lang as keyof typeof langs].contactUs.enterMobileNumber}
                      className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
                    />
                  </span>
                </label>
              </div>

              <label htmlFor="topic" className="text-neutral-400 text-sm flex mt-5 grow basis-1/2 flex-col">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookConsultation.selectMainTopic}</p>
                <FormControl fullWidth>
                  <Select
                    required
                    disabled={isSubmitting}
                    id="topic"
                    name="topic"
                    type="text"
                    value={formData.topic || "10"}
                    onChange={handleInputChange}
                    defaultValue={"10"}
                    className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                  >
                    <MenuItem className="!p-0 !hidden" value={"10"}>
                      {langs[params.lang as keyof typeof langs].bookConsultation.selectMainTopic}
                    </MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Study Abroad">Study Abroad</MenuItem>
                    <MenuItem value="Tourism">Tourism</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </label>

              <label htmlFor="date" className="grow basis-full mt-5">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookConsultation.chooseAvailableDate}</p>
                <input
                  required
                  disabled={isSubmitting}
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder={langs[params.lang as keyof typeof langs].bookConsultation.chooseAvailableDate}
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
                />
              </label>

              <label htmlFor="time" className="grow basis-full mt-5">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].bookConsultation.pickATime}</p>
                <input
                  id="time"
                  name="time"
                  type="time"
                  required
                  disabled={isSubmitting}
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder={langs[params.lang as keyof typeof langs].bookConsultation.pickATime}
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-3 rounded-md items-start"
                />
              </label>

              <ErrorBlock error={submitError} className="w-full mt-4" />

              <label htmlFor="name" className="grow mt-5 basis-full">
                <LoadingButton
                  loading={isSubmitting}
                  sucess={isSuccess}
                  successText="Sucessful!"
                  type="submit"
                  className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-5 px-16 py-3 rounded-lg self-start max-md:px-5"
                >
                  {langs[params.lang as keyof typeof langs].bookConsultation.scheduleSession}
                </LoadingButton>
              </label>
            </form>
          </div>

        </div>
      </div>
    </main>
    </>
  );
}
