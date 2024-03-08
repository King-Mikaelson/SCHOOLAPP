"use client";

import { useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { schoolInformationInitialState } from "../data";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  isSubmitting: boolean
  handleInputChange: (e: any, property: keyof typeof schoolInformationInitialState) => void
  handleFlatArrayInputChange: (e: any, index: number, property: keyof typeof schoolInformationInitialState, nestedProperty: string) => void
}

export default function OtherInformation({ formData, setFormData, isLoading, isSubmitting, handleInputChange, handleFlatArrayInputChange }: IProps) {
  const action = useSearchParams().get("action");

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, []);

  const handleTextInput = ( e: any, field: keyof typeof formData, index: number): void => {
    const { value } = e.target;
    const temp = { ...formData };
    temp[field][index] = value
    setFormData(temp);
  }

  const addField = (field: any): void => {
    const temp = { ...formData };
    temp.other[field].push("");
    setFormData(temp);
  };

  const removeField = (field: keyof typeof formData, selectedIndex: number): void => {
    if (formData.other[field].length > 1) {
      const temp = { ...formData, other: { ...formData?.other, [field]: formData?.other[field].filter((each: any, index: number) => index != selectedIndex)} }
      setFormData(temp);
    }
  }

  return (
    <section className="[scroll-behaviour:smooth] ">
      <div className="items-start flex flex-col  rounded-xl max-md:px-4 max-w-screen-md">

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-8 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="availableInternshipOpportunities" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">available internship opportunities?</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      itemID="availableInternshipOpportunities"
                      defaultValue={10}
                      className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view" || isSubmitting}
                      name="availableInternshipOpportunities"
                      value={formData?.other?.availableInternshipOpportunities || 10}
                      onChange={(e) => handleInputChange(e, "other")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value="RESEARCHER">Researcher</MenuItem>
                      <MenuItem value="LAB_INTERN">Lab Intern</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
            
          <label htmlFor="formOfAssement" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">Form of assessment</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      itemID="formOfAssement"
                      defaultValue={10}
                      className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view" || isSubmitting}
                      name="formOfAssement"
                      value={formData?.other?.formOfAssement || 10}
                      onChange={(e) => handleInputChange(e, "other")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value="Aptitute Test">Aptitude Test</MenuItem>
                      <MenuItem value="Exams">Exams</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="availableInternationalStudentSupport" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">available international student support?</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      itemID="availableInternationalStudentSupport"
                      defaultValue={10}
                      className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view" || isSubmitting}
                      name="availableInternationalStudentSupport"
                      value={formData?.other?.availableInternationalStudentSupport}
                      onChange={(e) => handleInputChange(e, "other")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value="YES">Yes</MenuItem>
                      <MenuItem value="NO">No</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
            
          <label htmlFor="availableStudentArrivalSupport" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">available student ARRIVAL support?</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      itemID="availableStudentArrivalSupport"
                      defaultValue={10}
                      className="[&>*]:!py-3 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view" || isSubmitting}
                      name="availableStudentArrivalSupport"
                      value={formData?.other?.availableStudentArrivalSupport}
                      onChange={(e) => handleInputChange(e, "other")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value="YES">Yes</MenuItem>
                      <MenuItem value="NO">No</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
        </div>

        {/* Academic Requirements */}
        <div className="mt-6  w-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">ACADEMIC REQUIREMENTS</p>
          <div className="flex gap-y-2 gap-x-4 mt-1 max-md:max-w-full flex-wrap ">
            {
              !isLoading
                ? (
                  formData?.other?.academicRequirements.map((each: string, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_max-content]">
                      <input id="startDate" onChange={(e) => handleFlatArrayInputChange(e, index, "other", "academicRequirements")} value={each} name="startDate" disabled={action == "view" || isSubmitting} type="text" placeholder="Enter here" className="w-full px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5  text-neutral-500 text-md placeholder:text-neutral-400 border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90" />
                      <button type="button" disabled={action === "view" || isSubmitting} onClick={() => removeField("academicRequirements", index)} className="text-stone-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 4 }).map((each: any, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_40px]">
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    </div>
                  ))
                )
            }
          </div>
          <button type="button" disabled={action === "view" || isSubmitting} onClick={() => addField("academicRequirements")} className="rounded-md mt-4 flex items-center gap-x-1.5 px-4 font-medium shadow-lg py-1.5 bg-primary-red text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add More
          </button>
        </div>

        {/* Required Documents */}
        <div className="mt-6  w-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">REQUIRED DOCUMENTS</p>
          <div className="flex gap-y-2 gap-x-4 mt-1 max-md:max-w-full flex-wrap ">
            {
              !isLoading
                ? (
                  formData?.other?.requiredDocuments.map((each: string, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_max-content]">
                      <input id="startDate" onChange={(e) => handleFlatArrayInputChange(e, index, "other", "requiredDocuments")} value={each} name="startDate" type="text" disabled={action == "view" || isSubmitting} placeholder="Enter here" className="w-full px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5  text-neutral-500 text-md placeholder:text-neutral-400 border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90" />
                      <button type="button" disabled={action === "view" || isSubmitting} onClick={() => removeField("requiredDocuments", index)} className="text-stone-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 4 }).map((each: any, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_40px]">
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    </div>
                  ))
                )
            }
          </div>
          <button type="button" disabled={action === "view" || isSubmitting} onClick={() => addField("requiredDocuments")} className="rounded-md mt-4 flex items-center gap-x-1.5 px-4 font-medium shadow-lg py-1.5 bg-primary-red text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add More
          </button>
        </div>
       
      </div>
    </section>
  )
}