"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { IFormData } from "../page";
import { useEffect, useState } from "react";
import en from "../../../../../dictionaries/en.json"
import fr from "../../../../../dictionaries/fr.json"
import { useSearchParams } from "next/navigation";
import { countryList } from "@SharedData/CountryList";
import { IState, State } from "country-state-city";
import Image from "next/image";
import langs from "@dictionaries/langs";

interface IProps {
  setFormSection: React.Dispatch<React.SetStateAction<number>>
  formSection: number
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  handleInputChange: (e: any, property: string) => void
  phoneDetails: { countryCode: string, number: string }
  setPhoneDetails: React.Dispatch<React.SetStateAction<{ countryCode: string, number: string }>>
  params: {
    lang: string
  }
}

export default function ContactInformation({ setFormSection, formSection, formData, setFormData, isLoading, handleInputChange, phoneDetails, setPhoneDetails, params }: IProps) {
  const action = useSearchParams().get("action");

  const [ mailingPhoneDetails, setMailingPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" });

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (formData.contactInformation.isMailingAddress && formData.contactInformation.isMailingAddress) {
      delete formData.contactInformation.mailingAddress
    }
  }, [ formData.contactInformation.isMailingAddress ]);

  useEffect(() => {
    if(phoneDetails.number.startsWith("0")){
      setFormData({ ...formData, contactInformation: { ...formData.contactInformation, mailingAddress: { ...formData.contactInformation.mailingAddress, phone: `+${mailingPhoneDetails.countryCode}${mailingPhoneDetails.number.slice(1, mailingPhoneDetails.number.length - 2)}`}} });
    } else {
      setFormData({ ...formData, contactInformation: { ...formData.contactInformation, mailingAddress: { ...formData.contactInformation.mailingAddress, phone: `+${mailingPhoneDetails.countryCode}${mailingPhoneDetails.number }` }} });
    }
  }, [ mailingPhoneDetails ]);

  const handleMailingAddressInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, contactInformation: { ...formData.contactInformation, mailingAddress: { ...formData.contactInformation.mailingAddress, [name]: value }    }  });
    // if (submitSuccess) reset();
  }

  console.log(formData.contactInformation.mailingAddress);

  return (
    <section className="">
      <div className="items-start mx-auto bg-white shadow-md flex flex-col px-6 py-7 rounded-xl max-md:px-4 max-w-screen-lg">
        <h2 className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          {langs[params.lang as keyof typeof langs].contactInformation.contactInformation}
        </h2>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="email" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.emailAddress}</p>
            {
              !isLoading
                ?  <input required id="email" disabled={action == "view"} value={formData?.contactInformation?.email} onChange={(e) => handleInputChange(e, "contactInformation")} name="email" type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterEmail} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <label htmlFor="mobileNumber" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.mobileNumber}</p>
            <span className="grid grid-cols-[max-content_3fr] gap-2">
            {
              !isLoading
                ? 
                  <>
                  {/* <Select
                      itemID="location"
                      defaultValue="234"
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
                    </Select> */}
                    <FormControl fullWidth>
                      <Select
                        required
                        disabled={action == "view"}
                        itemID="location"
                        defaultValue="234"
                        className="[&>*]:!py-1 [&>*]:!px-2 [&>*]:!rounded-md mt-1 [&>*]:!flex [&>*]:!items-center !min-w-max placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                        // className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                        onChange={(e) => setPhoneDetails({ ...phoneDetails, countryCode: e.target.value })}
                      >
                        {
                          countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                            <MenuItem key={country.name} className="" value={country.phone}><Image className="mr-0.5" width={35} height={17} src={`/images/country-flag/${country?.code}.svg`} alt="flag" />({country.name?.slice(0,3)}) +{country.phone}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    <input required id="mobileNumber" name="mobileNumber" disabled={action == "view"} value={phoneDetails?.number} onChange={(e) => {setPhoneDetails({ ...phoneDetails, number: e.target.value.replace(/[^0-9]/ig, "") })}} type="tel" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
                  </>
                  :
                  <>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </>
            }
            </span>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="streetAddress" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.streetAddress}</p>
            {
              !isLoading
                ? <input required id="streetAddress" name="streetAddress" disabled={action == "view"} value={formData?.contactInformation?.streetAddress} onChange={(e) => handleInputChange(e, "contactInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterStreetAddress} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <label htmlFor="city" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.city}</p>
            {
              !isLoading
                ? <input required id="city" name="city" disabled={action == "view"} value={formData?.contactInformation?.city} onChange={(e) => handleInputChange(e, "contactInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterCity} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
        <label htmlFor="country" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.country}</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      required
                      itemID="location"
                      defaultValue="NG"
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="country"
                      value={formData?.contactInformation?.country}
                      onChange={(e) => handleInputChange(e, "contactInformation")}
                    >
                       <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].contactInformation.selectCountry}</MenuItem>
                      {
                        countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                          <MenuItem key={index} className="" value={country.code} >{country.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.state}</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                    <Select
                      required
                      // displayEmpty
                      itemID="location"
                      defaultValue={10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="state"
                      value={formData?.contactInformation?.state}
                      onChange={(e) => handleInputChange(e, "contactInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].contactInformation.selectCountry}</MenuItem>
                      {
                        State.getStatesOfCountry(formData?.contactInformation?.country as string).map((state: IState, index: number) => (
                          <MenuItem key={index} value={state.name}>{state.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="zipCode" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.zipCode}</p>
            {
              !isLoading
                ? <input required id="zipCode" name="zipCode" disabled={action == "view"} value={formData?.contactInformation?.zipCode} onChange={(e) => handleInputChange(e, "contactInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterZipCode} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <div className="grow basis-1/2 flex flex-col justify-around">
            <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.sameAsMailingAddress}</p>
            <ul className="flex flex-row gap-6 mt-2 text-stone-500">
              <li className="">
                <label className="flex flex-row items-center gap-2.5">
                  <input type="radio" disabled={action == "view"} checked={formData?.contactInformation?.isMailingAddress} onChange={(e) => setFormData({ ...formData, contactInformation: {...formData.contactInformation, isMailingAddress: true}})} name="isMailingAddress" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.yes}</p>
                </label>
              </li>
              <li className="">
                <label className="flex flex-row items-center gap-2.5">
                  <input type="radio" disabled={action == "view"} checked={!formData?.contactInformation?.isMailingAddress} onChange={(e) => setFormData({ ...formData, contactInformation: {...formData.contactInformation, isMailingAddress: false}})} name="isMailingAddress" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.no}</p>
                </label>
              </li>
            </ul>
          </div>
        </div>

        {
          !formData?.contactInformation?.isMailingAddress
            && (
              <>
              <h2 className="text-lg grow mt-9 mb-6 w-full">Mailing Address</h2>
              {/* <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap"> */}
                {/* <label htmlFor="streetAddress" className="grow basis-1/2">
                  <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.streetAddress}</p>
                  {
                    !isLoading
                      ? <input required id="streetAddress" name="streetAddress" disabled={action == "view"} value={!formData?.contactInformation?.isMailingAddress ? formData?.contactInformation?.streetAddress : ""} onChange={(e) => handleInputChange(e, "contactInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterStreetAddress} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                      : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  }
                </label> */}
                <div className="items-stretch self-stretch flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="email" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.emailAddress}</p>
                    {
                      !isLoading
                        ?  <input required id="email" disabled={action == "view"} value={formData?.contactInformation?.mailingAddress?.email} onChange={(e) => handleMailingAddressInputChange(e)} name="email" type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterEmail} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                        : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    }
                  </label>

                  <label htmlFor="mobileNumber" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.mobileNumber}</p>
                    <span className="grid grid-cols-[max-content_3fr] gap-2">
                    {
                      !isLoading
                        ? 
                          <>
                          {/* <Select
                              itemID="location"
                              defaultValue="234"
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
                            </Select> */}
                            <FormControl fullWidth>
                              <Select
                                required
                                disabled={action == "view"}
                                itemID="location"
                                defaultValue="234"
                                className="[&>*]:!py-1 [&>*]:!px-2 [&>*]:!rounded-md mt-1 [&>*]:!flex [&>*]:!items-center !min-w-max placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                                // className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                                onChange={(e) => setMailingPhoneDetails({ ...mailingPhoneDetails, countryCode: e.target.value })}
                              >
                                {
                                  countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                                    <MenuItem key={country.name} className="" value={country.phone}><Image className="mr-0.5" width={35} height={17} src={`/images/country-flag/${country?.code}.svg`} alt="flag" />({country.name?.slice(0,3)}) +{country.phone}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                            <input required id="mobileNumber" name="mobileNumber" disabled={action == "view"} value={mailingPhoneDetails?.number} onChange={(e) => {setMailingPhoneDetails({ ...phoneDetails, number: e.target.value.replace(/[^0-9]/ig, "") })}} type="tel" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
                          </>
                          :
                          <>
                            <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                            <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                          </>
                    }
                    </span>
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="streetAddress" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.streetAddress}</p>
                    {
                      !isLoading
                        ? <input required id="streetAddress" name="streetAddress" disabled={action == "view"} value={formData?.contactInformation?.mailingAddress?.streetAddress} onChange={(e) => handleMailingAddressInputChange(e)} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterStreetAddress} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                        : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    }
                  </label>

                  <label htmlFor="city" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.city}</p>
                    {
                      !isLoading
                        ? <input required id="city" name="city" disabled={action == "view"} value={formData?.contactInformation?.mailingAddress?.city} onChange={(e) => handleMailingAddressInputChange(e)} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterCity} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                        : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    }
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                <label htmlFor="country" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.country}</p>
                    {
                      !isLoading
                        ? <FormControl fullWidth>
                            <Select
                              required
                              itemID="location"
                              defaultValue="NG"
                              className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                              disabled={action == "view"}
                              name="country"
                              value={formData?.contactInformation?.mailingAddress?.country}
                              onChange={(e) => handleMailingAddressInputChange(e)}
                            >
                              <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].contactInformation.selectCountry}</MenuItem>
                              {
                                countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                                  <MenuItem key={index} className="" value={country.code} >{country.name}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        :
                        <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    }
                  </label>
                  <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.state}</p>
                    {
                      !isLoading
                        ? <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                            <Select
                              required
                              // displayEmpty
                              itemID="location"
                              defaultValue={10}
                              className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                              disabled={action == "view"}
                              name="state"
                              value={formData?.contactInformation?.mailingAddress?.state}
                              onChange={(e) => handleMailingAddressInputChange(e)}
                            >
                              <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].contactInformation.selectCountry}</MenuItem>
                              {
                                State.getStatesOfCountry(formData?.contactInformation?.mailingAddress?.country as string).map((state: IState, index: number) => (
                                  <MenuItem key={index} value={state.name}>{state.name}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        :
                        <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    }
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="zipCode" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].contactInformation.zipCode}</p>
                    {
                      !isLoading
                        ? <input required id="zipCode" name="zipCode" disabled={action == "view"} value={formData?.contactInformation?.mailingAddress?.zipCode} onChange={(e) => handleMailingAddressInputChange(e)} type="text" placeholder={langs[params.lang as keyof typeof langs].contactInformation.enterZipCode} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                        : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    }
                  </label>

                  
                  </div>
              {/* </div> */}
              </>
            )
        }

        <div className="items-stretch self-stretch  flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400  text-sm flex  w-full md:basis-1/2 flex-col">
            <button
              onClick={() => setFormSection(2)}
              className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-8 px-16 py-3 rounded-lg self-start max-md:px-5"
            >
              {langs[params.lang as keyof typeof langs].contactInformation.continue}
            </button>
          </label>
          <label htmlFor="" className="grow basis-1/2 w-full invisible" />
        </div>

      </div>
    </section>
  )
}