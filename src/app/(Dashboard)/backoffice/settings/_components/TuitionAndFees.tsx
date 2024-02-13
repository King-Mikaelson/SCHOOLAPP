"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { splitInThousand } from "@utils/miscelaneous";
import { FormControl, MenuItem, Select } from "@mui/material";
import { countryList } from "@SharedData/CountryList";
import { schoolInformationInitialState } from "../data";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  isSubmitting: boolean
  handleInputChange: (e: any, property: keyof typeof schoolInformationInitialState) => void
  handleNumericInputChange: (e: any, property: keyof typeof schoolInformationInitialState) => void
}


export default function TuitionAndFees({ formData, setFormData, isLoading, isSubmitting, handleInputChange, handleNumericInputChange }: IProps) {
  const action = useSearchParams().get("action");

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, []);

  return (
    <section className="">
      <div className="items-start flex flex-col py-1 max-md:px-4 max-w-screen-md">
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">CURRENCY</p>
            <FormControl fullWidth>
              <Select
                itemID="location"
                defaultValue="USD"
                className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                disabled={action == "view" || isSubmitting}
                name="currency"
                value={formData?.tuition?.currency || "USD"}
                onChange={(e) => handleInputChange(e, "tuition")}
              >
                {
                  countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => country.currency).filter((currency, index, array) => array.indexOf(currency) === index).map((each: string, innestIndex: number) => (
                    <MenuItem value={each}>{each}</MenuItem>
                  ))

                }
              </Select>
            </FormControl>
          </label>
          <label htmlFor="tuitionFee" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SEMESTER TUITION</p>
            {
              !isLoading
                ? <input id="tuitionFee" name="tuitionFee" disabled={action == "view" || isSubmitting} value={splitInThousand(formData?.tuition?.tuitionFee)} onChange={(e) => handleNumericInputChange(e, "tuition")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
            
          
        </div>
        {/* <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="avgAccomodationCost" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">avg. cost of accommodation (Per month)</p>
            {
              !isLoading
                ? <input id="avgAccomodationCost" name="avgAccomodationCost" disabled={action == "view" || isSubmitting} value={splitInThousand(formData?.tuition?.avgAccomodationCost)} onChange={(e) => handleNumericInputChange(e, "tuition")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
          <label htmlFor="avgFeedingCost" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">avg. cost of feeding (Per month)</p>
            {
              !isLoading
                ? <input id="avgFeedingCost" name="avgFeedingCost" disabled={action == "view" || isSubmitting} value={splitInThousand(formData?.tuition?.avgFeedingCost)} onChange={(e) => handleNumericInputChange(e, "tuition")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div> */}
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="otherFee" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">Other Fees</p>
            {
              !isLoading
                ? <input id="otherFee" name="otherFee" disabled={action == "view" || isSubmitting} value={splitInThousand(formData?.tuition?.otherFee)} onChange={(e) => handleNumericInputChange(e, "tuition")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
          {/* <label htmlFor="avgLivingCost" className="basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">avg. cost of living (Per month)</p>
            {
              !isLoading
                ? <input id="avgLivingCost" name="avgLivingCost" disabled={action == "view" || isSubmitting} value={splitInThousand(formData?.tuition?.avgLivingCost)} onChange={(e) => handleNumericInputChange(e, "tuition")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label> */}
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="otherInformation" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">other information (Breakdown of other fees) </p>
            {
              !isLoading
                ? <textarea id="otherInformation" maxLength={1000} name="otherInformation"  disabled={action == "view" || isSubmitting} value={formData?.tuition?.otherInformation} onChange={(e) => handleInputChange(e, "tuition")} rows={8} placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
            <p className="text-stone-500/90 text-xs ml-auto w-max leading-4">1000 Characters</p>
          </label>
          
        </div>
      </div>
    </section>
  )
}