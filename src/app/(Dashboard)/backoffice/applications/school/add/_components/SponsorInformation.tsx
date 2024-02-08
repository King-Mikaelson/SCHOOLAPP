"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { countryList } from "@SharedData/CountryList";
import { State } from "country-state-city";
import Image from "next/image";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  handleInputChange: (e: any, property: string) => void
  handleArrayInputChange: (e: any, index: number, property: string, nestedProperty: string) => void
  phoneDetailsArray: { countryCode: string, number: string }[]
  setPhoneDetailsArray: React.Dispatch<React.SetStateAction<{ countryCode: string, number: string }[]>>
  handleNestedPhoneNumberChange: (e: any, index: number, name: ("countryCode"|"number")) => void
}

export default function SponsorInformation({ formData, setFormData, isLoading, handleInputChange, handleArrayInputChange, phoneDetailsArray, setPhoneDetailsArray, handleNestedPhoneNumberChange }: IProps) {
  const action = useSearchParams().get("action");

  const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" })

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (formData.sponsorInformation.isSelfSponsored) {
      setFormData({ ...formData, sponsorInformation: { ...formData.sponsorInformation, sponsors: [
        {
          city: "",
          country: "",
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          state: "",
          streetAddress: "",
          zipCode: "",
          shouldAddAnotherSponsor: false
        }
      ]}})
    }
  }, [ formData.sponsorInformation.isSelfSponsored ]);
  
  console.log(phoneDetailsArray)
  const addSponsor = () => {
    setFormData({ ...formData, sponsorInformation: { ...formData.sponsorInformation, sponsors: [ ...formData?.sponsorInformation?.sponsors, {
      city: "",
      country: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      state: "",
      streetAddress: "",
      zipCode: "",
      shouldAddAnotherSponsor: false 
    }]}})
    setPhoneDetailsArray([ ...phoneDetailsArray, { countryCode: "", number: "" } ]);
  }

  const removeSponsor = (index: number): void => {
    if (formData?.sponsorInformation?.sponsors?.length > 1) {
      const temp = { ...formData };
      temp?.sponsorInformation?.sponsors?.splice(index, 1);
      setFormData(temp)
      const phoneTemp = [ ...phoneDetailsArray ];
      phoneTemp?.splice((phoneDetailsArray?.length - 1), 1);
      setPhoneDetailsArray(phoneTemp)
    }
  }

  // console.log(phoneDetailsArray)

  // useEffect(() => {
  //   formData?.sponsorInformation?.sponsor?.forEach((_, index: number) => {
  //     if(phoneDetails.number.startsWith("0")){
  //       // setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number.slice(1, phoneDetails.number.length - 2)}`})
  
  //       setFormData((prevFormData: any) => ({
  //         ...prevFormData,
  //         // @ts-ignore
  //         sponsorInformation: {
  //           // @ts-ignore
  //           ...prevFormData.sponsorInformation,
  //           // @ts-ignore
  //           sponsors: prevFormData.sponsorInformation.sponsors.map((sponsor: any, i: number) =>
  //           // @ts-ignore
  //           i === index ? { ...sponsor, ...{phone: `+${phoneDetails.countryCode}${phoneDetails.number.slice(1, phoneDetails.number.length - 2)}`} } : sponsor
  //         ),
  //         },
  //       }));
  
  //     } else {
  //       // setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number }`})
  //       setFormData((prevFormData: any) => ({
  //         ...prevFormData,
  //         // @ts-ignore
  //         sponsorInformation: {
  //           // @ts-ignore
  //           ...prevFormData.sponsorInformation,
  //           // @ts-ignore
  //           sponsors: prevFormData.sponsorInformation.sponsors.map((sponsor: any, i: number) =>
  //           // @ts-ignore
  //           i === index ? { ...sponsor, ...{phone: `+${phoneDetails.countryCode}${phoneDetails.number }`} } : sponsor
  //         ),
  //         },
  //       }));
  //     }
  //   })   
  // }, [phoneDetails])

  // console.log(formData?.sponsorInformation?.sponsors)


  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl max-md:px-4 max-w-screen-lg">
 
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <div className="grow flex basis-full flex-col justify-around">
            <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">ARE YOU SELF SPONSORED?</p>
            <ul className="flex flex-row gap-6 mt-2 text-stone-500">
              <li className="">
                <label className="flex flex-row items-center gap-2.5">
                  <input type="radio" disabled={action == "view"} checked={formData?.sponsorInformation?.isSelfSponsored} onChange={(e) => setFormData({ ...formData, sponsorInformation: {...formData.sponsorInformation, isSelfSponsored: true}})} name="isSelfSponsored" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">YES</p>
                </label>
              </li>
              <li className="">
                <label className="flex flex-row items-center gap-2.5">
                  <input type="radio" disabled={action == "view"} checked={!formData?.sponsorInformation?.isSelfSponsored} onChange={(e) => setFormData({ ...formData, sponsorInformation: {...formData.sponsorInformation, isSelfSponsored: false}})} name="isSelfSponsored" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">NO</p>
                </label>
              </li>
            </ul>
          </div>
        </div>

        {
          !isLoading
            ? !formData.sponsorInformation.isSelfSponsored
              && (
              formData?.sponsorInformation?.sponsors?.map((sponsor: any, index: number) => (
                <>
                  <div key={`sponsor-person-${index}`} className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="firstName" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SPONSOR'S FIRST NAME</p>
                      <input disabled={action == "view"} id="firstName" name="firstName" value={sponsor.firstName} onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                      
                    <label htmlFor="lastName" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SPONSOR'S LAST NAME</p>
                      <input disabled={action == "view"} id="lastName" name="lastName" value={sponsor?.lastName} onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                  </div>

                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="email" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">EMAIL ADDRESS</p>
                      <input disabled={action == "view"} id="email" name="email" value={sponsor?.email} onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")} type="email" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                      
                    <label htmlFor="email" className="grow basis-1/2">
                      <p className="text-neutral-700 grow basis-full text-xs leading-4 tracking-widest uppercase">MOBILE NUMBER</p>
                      <span className="grid grid-cols-[max-content_3fr] gap-2">
                      <FormControl fullWidth>
                        <Select
                          disabled={action == "view"}
                          itemID="location"
                          defaultValue="234"
                          className="[&>*]:!py-1 [&>*]:!px-2 [&>*]:!rounded-md mt-1 [&>*]:!flex [&>*]:!items-center !min-w-max placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          value={phoneDetailsArray[index]?.countryCode}
                          onChange={(e) => handleNestedPhoneNumberChange(e, index, "countryCode")}
                        >
                          {
                            countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                              <MenuItem key={country.name} className="" value={country.phone}><Image className="mr-0.5" width={35} height={17} src={`/images/country-flag/${country?.code}.svg`} alt="flag" />({country.name?.slice(0,3)}) +{country.phone}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                        <input value={phoneDetailsArray[index]?.number} onChange={(e) => handleNestedPhoneNumberChange(e, index, "number")} disabled={action == "view"} id="mobileNumber" name="mobileNumber" type="tel" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
                      </span>
                    </label>
                  </div>

                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="streetAddress" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">STREET ADDRESS</p>
                      <input disabled={action == "view"} id="streetAddress" name="streetAddress" value={sponsor?.streetAddress} onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")} type="tel" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                      
                    <label htmlFor="city" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">CITY</p>
                      <input disabled={action == "view"} id="city" name="city" value={sponsor?.city} onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")} type="tel" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                  </div>

                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">COUNTRY</p>
                      <FormControl fullWidth>
                        <Select
                          itemID="location"
                          defaultValue="NG"
                          className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                          disabled={action == "view"}
                          name="country"
                          value={sponsor?.country}
                          onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")}
                        >
                          {/* <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem> */}
                          {
                            countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0]) => (
                              <MenuItem key={`count-${index}${country.name}`} className="" value={country.code} >{country.name}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </label>
                    <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">STATE</p>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                        <Select
                          // displayEmpty
                          itemID="location"
                          defaultValue={10}
                          className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                          disabled={action == "view"}
                          name="state"
                          value={sponsor?.state}
                          onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")}
                        >
                          {/* <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem> */}
                          {
                            State.getStatesOfCountry(sponsor?.country as string).map((state: any, stateIndex: number) => (
                              <MenuItem key={`state-${stateIndex}${state?.name}`} value={state.name}>{state.name}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </label>
                  </div>

                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="zipCode" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">ZIPCODE</p>
                      <input disabled={action == "view"} id="zipCode" name="zipCode" value={sponsor?.zipCode} onChange={(e) => handleArrayInputChange(e, index, "sponsorInformation", "sponsors")} type="tel" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>

                    {
                      formData?.sponsorInformation?.sponsors?.length > 1
                      && (
                        <button type="button" onClick={(e) => removeSponsor(index)} className="ml-auto basis-1/2 flex flex-row items-center gap-1 px-3 py-2  mt-3 rounded-md text-primary-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                          Remove Sponsor
                        </button>
                      )
                    }
                    </div>
                    {
                      index === formData?.sponsorInformation?.sponsors?.length - 1
                      && (
                        <button type="button" onClick={(e) => addSponsor()} className="flex flex-row items-center gap-1 py-2  mt-6 rounded-md text-primary-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add Sponsor
                        </button>
                      )
                    }
                </>
              ))
            )
            : // Loading state for when sponsor data is loading
            <>
               <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="email" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SPONSOR'S FIRST NAME</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                    
                  <label htmlFor="mobileNumber" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SPONSOR'S LAST NAME</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="streetAddress" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">EMAIL ADDRESS</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                    
                  <label htmlFor="email" className="grow basis-1/2">
                    <p className="text-neutral-700 grow basis-full text-xs leading-4 tracking-widest uppercase">MOBILE NUMBER</p>
                    <span className="grid grid-cols-[1fr_3fr] gap-2">
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    </span>
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="streetAddress" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">STREET ADDRESS</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                    
                  <label htmlFor="city" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">CITY</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">STATE</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                  <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">COUNTRY</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="zipCode" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">ZIPCODE</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>

                  <div className="grow basis-1/2 flex flex-col justify-around">
                    <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">DO YOU WANT TO ADD ANOTHER SPONSOR</p>

                    <ul className="flex flex-row gap-6 mt-2 text-stone-500">
                      <li className="">
                        <label className="flex flex-row items-center gap-2.5">
                          <input type="radio" disabled name="shouldAddSponsor" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                          <div className="w-[50px] p-[10px] bg-neutral-200 animate-pulse rounded-md" />
                        </label>
                      </li>
                      <li className="">
                        <label className="flex flex-row items-center gap-2.5">
                          <input type="radio" disabled name="shouldAddSponsor" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                          <div className="w-[40px] p-[10px] bg-neutral-200 animate-pulse rounded-md" />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
            </>
        }
      </div>
    </section>
  )
}