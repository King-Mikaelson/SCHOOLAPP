"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { schoolInformationInitialState } from "../data";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  isSubmitting: boolean
  handleFlatArrayInputChange: (e: any, index: number, property: keyof typeof schoolInformationInitialState, nestedProperty: string) => void
}

export default function AcademinRequirement({ formData, setFormData, isLoading, isSubmitting, handleFlatArrayInputChange }: IProps) {
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

  const addField = (field: keyof typeof schoolInformationInitialState.admissionRequirement): void => {
    setFormData({ ...formData, admissionRequirement: { ...formData.admissionRequirement, [field]: [ ...formData.admissionRequirement[field], "" ]}});
  };

  const removeField = (field: keyof typeof formData, selectedIndex: number): void => {
    if (formData.admissionRequirement[field].length > 1) {
      const temp = { ...formData, admissionRequirement: { ...formData?.admissionRequirement, [field]: formData?.admissionRequirement[field].filter((each: any, index: number) => index != selectedIndex)} }
      setFormData(temp);
    }
  }

  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl max-md:px-4 max-w-screen-md">

        <div className="mt-6  w-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">REQUIRED DOCUMENTS</p>
          <div className="flex gap-y-2 gap-x-4 mt-1 max-md:max-w-full flex-wrap ">
            {
              !isLoading
                ? (
                  formData.admissionRequirement.requiredDocuments.map((each: string, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_max-content]">
                      <input id="startDate" onChange={(e) => handleFlatArrayInputChange(e, index, "admissionRequirement", "requiredDocuments" )} disabled={action == "view" || isSubmitting} value={each} name="startDate" type="text" placeholder="Enter here" className="w-full px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5  text-neutral-500 text-md placeholder:text-neutral-400 border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90" />
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
          <button type="button" disabled={action === "view" || isSubmitting} onClick={() => addField("requiredDocuments")} className="rounded-md mt-4 flex items-center gap-x-1.5 px-4 font-medium py-1.5 text-primary-red bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add More
          </button>
        </div>

        <div className="mt-6  w-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">Scholarships/financial aid</p>
          <div className="flex gap-y-2 gap-x-4 mt-1 max-md:max-w-full flex-wrap ">
            {
              !isLoading
                ? (
                  formData.admissionRequirement.financialAid.map((each: string, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_max-content]">
                      <input id="startDate" onChange={(e) => handleFlatArrayInputChange(e, index, "admissionRequirement", "financialAid")} value={each} disabled={action == "view" || isSubmitting} name="startDate" type="text" placeholder="Enter here" className="w-full px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5  text-neutral-500 text-md placeholder:text-neutral-400 border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90" />
                      <button type="button" disabled={action === "view" || isSubmitting} onClick={() => removeField("financialAid", index)} className="text-stone-500">
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
          <button type="button" disabled={action === "view" || isSubmitting} onClick={() => addField("financialAid")} className="rounded-md mt-4 flex items-center gap-x-1.5 px-4 font-medium py-1.5 text-primary-red bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add More
          </button>
        </div>

        <div className="mt-6  w-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">accommodation options</p>
          <div className="flex gap-y-2 gap-x-4 mt-1 max-md:max-w-full flex-wrap ">
            {
              !isLoading
                ? (
                  formData.admissionRequirement.accomodationOptions.map((each: string, index: number) => (
                    <div key={index} className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_max-content]">
                      <input id="startDate" onChange={(e) => handleFlatArrayInputChange(e, index, "admissionRequirement", "accomodationOptions")} value={each} disabled={action == "view" || isSubmitting} name="startDate" type="text" placeholder="Enter here" className="w-full px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5  text-neutral-500 text-md placeholder:text-neutral-400 border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90" />
                      <button type="button" disabled={action === "view" || isSubmitting} onClick={() => removeField("accomodationOptions", index)} className="text-stone-500">
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
          <button type="button" disabled={action === "view" || isSubmitting} onClick={() => addField("accomodationOptions")} className="rounded-md mt-4 flex items-center gap-x-1.5 px-4 font-medium py-1.5 text-primary-red bg-red-100">
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