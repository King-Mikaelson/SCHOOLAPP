"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { schoolInformationInitialState } from "../data";
import { degreeList } from "@SharedData/degreeList";
import { countryList } from "@SharedData/CountryList";
import { splitInThousand } from "@utils/miscelaneous";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

interface IProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  isSubmitting: boolean;
  handleInputChange: (
    e: any,
    property: keyof typeof schoolInformationInitialState
  ) => void;
  handleCheckBox: (
    e: any,
    property: keyof typeof schoolInformationInitialState
  ) => void;
  handleNumericInputChange: (
    e: any,
    property: keyof typeof schoolInformationInitialState
  ) => void;
  handleFlatArrayInputChange: (
    e: any,
    index: number,
    property: keyof typeof schoolInformationInitialState,
    nestedProperty: string
  ) => void;
}

export default function ProgramInformation({
  formData,
  setFormData,
  isLoading,
  isSubmitting,
  handleInputChange,
  handleNumericInputChange,
  handleFlatArrayInputChange,
  handleCheckBox,
}: IProps) {
  const action = useSearchParams().get("action");

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" });
  }, []);

  const addField = (
    field: string
  ): void => {
    setFormData({
      ...formData,
      program: {
        ...formData.program,
        [field]: [...formData.program[field], ""],
      },
    });
  };

  const removeField = (
    field: keyof typeof formData,
    selectedIndex: number
  ): void => {
    if (formData.program[field].length > 1) {
      const temp = {
        ...formData,
        program: {
          ...formData?.program,
          [field]: formData?.program[field].filter(
            (each: any, index: number) => index != selectedIndex
          ),
        },
      };
      setFormData(temp);
    }
  };

console.log(formData)

  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl max-md:px-4 max-w-screen-md">
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="name" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              name OF PROGRAM
            </p>
            {!isLoading ? (
              <input
                id="name"
                name="name"
                disabled={action == "view" || isSubmitting}
                value={formData?.program?.name}
                onChange={(e) => handleInputChange(e, "program")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label
            htmlFor="location"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              PROGRAM TYPE
            </p>
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
                <MenuItem className="!p-0 !hidden" value={10}>
                  Select
                </MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Full Time">Full Time</MenuItem>
              </Select>
            </FormControl>
          </label>

          <label
            htmlFor="location"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              DEGREE TYPE
            </p>
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
                <MenuItem className="!p-0 !hidden" value={10}>
                  Select
                </MenuItem>
                {degreeList.map((degType: string) => (
                  <MenuItem key={degType} value={degType}>
                    {degType}
                  </MenuItem>
                ))}
                {/* <MenuItem value="BACHELOR'S_DEGREE">Bachelor's Degree</MenuItem>
                <MenuItem value="MASTERS_DEGREE">Masters Degree</MenuItem>
                <MenuItem value="PHD">PhD</MenuItem> */}
              </Select>
            </FormControl>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="duration" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              program duration
            </p>
            {!isLoading ? (
              <input
                id="duration"
                name="duration"
                disabled={action == "view" || isSubmitting}
                value={formData?.program?.duration}
                onChange={(e) => handleInputChange(e, "program")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="location"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              class type
            </p>
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
                <MenuItem className="!p-0 !hidden" value={10}>
                  Select
                </MenuItem>
                <MenuItem value="In-Person">In-Person</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="middlename" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              ABOUT PROGRAM (a brief information about the PROGRAM)
            </p>
            {!isLoading ? (
              <textarea
                id="about"
                maxLength={1000}
                name="about"
                disabled={action == "view" || isSubmitting}
                value={formData?.program?.about}
                onChange={(e) => handleInputChange(e, "program")}
                rows={8}
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
            <p className="text-stone-500/90 text-xs ml-auto w-max leading-4">
              1000 Characters
            </p>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="startDate" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              START DATE
            </p>
            {!isLoading ? (
              <input
                id="startDate"
                name="startDate"
                disabled={action == "view" || isSubmitting}
                value={formData?.program?.startDate?.split("T")[0]}
                onChange={(e) => handleInputChange(e, "program")}
                type="date"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="location"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              CURRENCY
            </p>
            <FormControl fullWidth>
              <Select
                itemID="location"
                defaultValue="USD"
                className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                disabled={action == "view" || isSubmitting}
                name="currency"
                value={formData?.program?.currency || "USD"}
                onChange={(e) => handleInputChange(e, "program")}
              >
                {countryList
                  .sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
                  ?.map(
                    (country: (typeof countryList)[0], index: number) =>
                      country.currency
                  )
                  .filter(
                    (currency, index, array) =>
                      array.indexOf(currency) === index
                  )
                  .map((each: string, innestIndex: number) => (
                    <MenuItem value={each}>{each}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="tuitionFee" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              ANNUAL TUITION
            </p>
            {!isLoading ? (
              <input
                id="tuitionFee"
                name="tuitionFee"
                disabled={action == "view" || isSubmitting}
                value={splitInThousand(formData?.program?.tuitionFee)}
                onChange={(e) => handleNumericInputChange(e, "program")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label htmlFor="otherFee" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Other Fees
            </p>
            {!isLoading ? (
              <input
                id="otherFee"
                name="otherFee"
                disabled={action == "view" || isSubmitting}
                value={splitInThousand(formData?.program?.otherFee)}
                onChange={(e) => handleNumericInputChange(e, "program")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>

        <div className="mt-6  w-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
            REQUIRED DOCUMENTS
          </p>
          <div className="flex gap-y-2 gap-x-4 mt-1 max-md:max-w-full flex-wrap ">
            {!isLoading
              ? formData?.program?.requiredDocuments?.map(
                  (each: string, index: number) => (
                    <div
                      key={index}
                      className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_max-content]"
                    >
                      <input
                        id="startDate"
                        onChange={(e) =>
                          handleFlatArrayInputChange(
                            e,
                            index,
                            "program",
                            "requiredDocuments"
                          )
                        }
                        disabled={action == "view" || isSubmitting}
                        value={each}
                        name="startDate"
                        type="text"
                        placeholder="Enter here"
                        className="w-full px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5  text-neutral-500 text-md placeholder:text-neutral-400 border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90"
                      />
                      <button
                        type="button"
                        disabled={action === "view" || isSubmitting}
                        onClick={() => removeField("requiredDocuments", index)}
                        className="text-stone-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )
                )
              : Array.from({ length: 4 }).map((each: any, index: number) => (
                  <div
                    key={index}
                    className="grow  min-w-[300px] justify-center mt-1 rounded-md grid gap-x-2 grid-cols-[1fr_40px]"
                  >
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </div>
                ))}
          </div>
          <button
            type="button"
            disabled={action === "view" || isSubmitting}
            onClick={() => addField("requiredDocuments")}
            className="rounded-md mt-4 flex items-center gap-x-1.5 px-4 font-medium py-1.5 text-primary-red bg-red-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add More
          </button>
        </div>

        <div className="mt-6  w-full flex flex-col">
          <FormControl component="fieldset" className="flex flex-col gap-3">
            <div>
              <FormLabel
                component="legend"
                className="uppercase !text-[rgba(60,60,60,1)] text-xs"
              >
                AVAILABLE scholarships and financial aid
              </FormLabel>
              <FormGroup aria-label="position">
                <FormControlLabel
                  value="MERIT-BASED SCHOLARSHIPS"
                  control={
                    <Checkbox
                      name="meritBasedScholarships"
                      checked={formData?.program?.meritBasedScholarships}
                      value={formData?.program?.meritBasedScholarships}
                      onChange={(e) => handleCheckBox(e, "program")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="MERIT-BASED SCHOLARSHIPS"
                  labelPlacement="end"
                  className="uppercase !text-[rgba(129,129,129,1)] text-sm"
                />
                <FormControlLabel
                  value="NEED-BASED SCHOLARSHIPS"
                  control={
                    <Checkbox
                      name="needBasedScholarships"
                      checked={formData?.program?.needBasedScholarships}
                      value={formData?.program?.needBasedScholarships}
                      onChange={(e) => handleCheckBox(e, "program")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="NEED-BASED SCHOLARSHIPS"
                  labelPlacement="end"
                  className="uppercase !text-[rgba(129,129,129,1)] text-sm"
                />
              </FormGroup>
            </div>
            <div>
              <FormLabel
                component="legend"
                className="uppercase !text-[rgba(60,60,60,1)] text-xs"
              >
                ACCOMMODATION OPTIONS
              </FormLabel>
              <FormGroup aria-label="position">
                <FormControlLabel
                  value="ON-CAMPUS"
                  control={
                    <Checkbox
                      name="OnCampus"
                      checked={formData?.program?.OnCampus}
                      value={formData?.program?.OnCampus}
                      onChange={(e) => handleCheckBox(e, "program")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="OnCampus"
                  labelPlacement="end"
                  className="uppercase !text-[rgba(129,129,129,1)] text-sm"
                />
                <FormControlLabel
                  value="OFF-CAMPUS"
                  control={
                    <Checkbox
                      name="OffCampus"
                      checked={formData?.program?.OffCampus}
                      onChange={(e) => handleCheckBox(e, "program")}
                      inputProps={{ "aria-label": "controlled" }}
                      value={formData?.program?.OffCampus}
                    />
                  }
                  label="OFF-CAMPUS"
                  labelPlacement="end"
                  className="uppercase !text-[rgba(129,129,129,1)] text-sm"
                />
              </FormGroup>
            </div>
          </FormControl>
        </div>
      </div>
    </section>
  );
}
