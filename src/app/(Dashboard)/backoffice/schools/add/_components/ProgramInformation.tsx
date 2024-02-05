"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { schoolInformationInitialState } from "../data";
import { degreeList } from "@SharedData/degreeList";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  isSubmitting: boolean
  handleInputChange: (e: any, property: keyof typeof schoolInformationInitialState) => void
}

export default function ProgramInformation({ formData, setFormData, isLoading, isSubmitting, handleInputChange }: IProps) {
  const action = useSearchParams().get("action");

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, [])

  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl max-md:px-4 max-w-screen-md">

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="name" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">name OF PROGRAM</p>
            {
              !isLoading
                ? <input id="name" name="name" disabled={action == "view" || isSubmitting} value={formData?.program?.name} onChange={(e) => handleInputChange(e, "program")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">PROGRAM TYPE</p>
            <FormControl fullWidth>
              <Select
                itemID="location"
                defaultValue={10}
                className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                disabled={action == "view" || isSubmitting}
                name="programType"
                value={formData?.program?.programType || 10}
                onChange={(e) => handleInputChange(e, "program")}
              >
                <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Full Time">Full Time</MenuItem>
              </Select>
            </FormControl>
          </label>
            
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">DEGREE TYPE</p>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
              <Select
                // displayEmpty
                itemID="location"
                defaultValue={10}
                className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                disabled={action == "view" || isSubmitting}
                name="degreeType"
                value={formData?.program?.degreeType || 10}
                onChange={(e) => handleInputChange(e, "program")}
              >
                <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                {
                  degreeList.map((degType: string) => (
                    <MenuItem key={degType} value={degType}>{degType}</MenuItem>
                  ))
                }
                {/* <MenuItem value="BACHELOR'S_DEGREE">Bachelor's Degree</MenuItem>
                <MenuItem value="MASTERS_DEGREE">Masters Degree</MenuItem>
                <MenuItem value="PHD">PhD</MenuItem> */}
              </Select>
            </FormControl>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="duration" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">program duration</p>
            {
              !isLoading
                ? <input id="duration" name="duration" disabled={action == "view" || isSubmitting} value={formData?.program?.duration} onChange={(e) => handleInputChange(e, "program")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">class type</p>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
              <Select
                // displayEmpty
                itemID="location"
                defaultValue={10}
                className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                disabled={action == "view" || isSubmitting}
                name="classType"
                value={formData?.program?.classType || 10}
                onChange={(e) => handleInputChange(e, "program")}
              >
                <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                <MenuItem value="In-Person">In-Person</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </label>
          
        </div>


        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="startDate" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">START DATE</p>
            {
              !isLoading
                ? <input id="startDate" name="startDate" disabled={action == "view" || isSubmitting} value={formData?.program?.startDate?.split("T")[0]} onChange={(e) => handleInputChange(e, "program")} type="date" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
         <div className="invisible basis-1/2" />
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="middlename" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">ABOUT PROGRAM (a brief information about the PROGRAM)</p>
            {
              !isLoading
                ? <textarea id="about" maxLength={1000} name="about"  disabled={action == "view" || isSubmitting} value={formData?.program?.about} onChange={(e) => handleInputChange(e, "program")} rows={8} placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
            <p className="text-stone-500/90 text-xs ml-auto w-max leading-4">1000 Characters</p>
          </label>
        </div>
      </div>
    </section>
  )
}