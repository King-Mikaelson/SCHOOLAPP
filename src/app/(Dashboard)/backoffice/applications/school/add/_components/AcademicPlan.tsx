"use client";

import { degreeList } from "@SharedData/degreeList";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, Fragment } from "react";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleInputChange: (e: any, property: string) => void
  handleNestedInputChange: (e: any, property: string, nestedProperty: string) => void
  handleArrayInputChange: (e: any, index: number, property: string, nestedProperty: string) => void
  isLoading: boolean
}

export default function AcademicPlan({ formData, setFormData, handleInputChange, handleArrayInputChange, handleNestedInputChange, isLoading }: IProps) {
  const action = useSearchParams().get("action");

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, []);

  useEffect(() => {
    if (!formData.academicInformation.hasTakenEnglishProficiencyTest) {
      if (formData.academicInformation.typeOfTestTaken) delete formData.academicInformation.typeOfTestTaken;
      if (formData.academicInformation.testScore) delete formData.academicInformation.testScore;
    }
  }, [ formData?.academicInformation?.hasTakenEnglishProficiencyTest ]);

  const addHighSchool = () => {
    setFormData({ ...formData, academicInformation: { ...formData.academicInformation, previousHighSchoolHistory: [ ...formData?.academicInformation?.previousHighSchoolHistory, {
      previousInstitutionAttended: '',
      hasGraduatedFromInstitution: false,
      expectedDateOfGraduation: '',
    }]}})
  }

  const removeHigherSchool = (index: number): void => {
    if (formData?.academicInformation?.previousHighSchoolHistory?.length > 1) {
      const temp = { ...formData };
      temp?.academicInformation?.previousHighSchoolHistory?.splice(index, 1);
      setFormData(temp)
    }
  }

  const addCollege = () => {setFormData({ ...formData, academicInformation: { ...formData.academicInformation, previousCollegeHistory: [ ...formData?.academicInformation?.previousCollegeHistory, {
    previousInstitutionAttended: '',
    major: '',
    hasGraduatedFromInstitution: false,
    degreeEarnedOnOrExpected: '',
    expectedDateOfGraduation: '',
  }]}})}

  const removeCollege = (index: number): void => {
    if (formData?.academicInformation?.previousCollegeHistory?.length > 1) {
      const temp = { ...formData };
      temp?.academicInformation?.previousCollegeHistory?.splice(index, 1);
      setFormData(temp)
    }
  }

  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl max-md:px-4 max-w-screen-lg">
        <h2 className="text-black text-xl font-medium mt-5 leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          Academic Plan
        </h2>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="prospectiveUniversity" className="grow basis-full">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">PROSPECTIVE UNIVERSITY</p>
            {
              !isLoading
                ?  <input id="prospectiveUniversity" disabled={action == "view"} value={formData?.academicInformation?.prospectiveUniversity} onChange={(e) => handleInputChange(e, "academicInformation")} name="prospectiveUniversity" type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="email" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">COURSE OF STUDY</p>
            {
              !isLoading
                ?
                <input name="intendedProgramOfStudy" disabled={action == "view"} value={formData?.academicInformation?.intendedProgramOfStudy} onChange={(e) => handleInputChange(e, "academicInformation")} type="text" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                // <FormControl fullWidth>
                //     <Select
                //       itemID="location"
                //       defaultValue={10}
                //       className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                //       disabled={action == "view"}
                //       name="intendedProgramOfStudy"
                //       value={formData?.academicInformation?.intendedProgramOfStudy}
                //       onChange={(e) => handleInputChange(e, "academicInformation")}
                //     >
                //       <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                //       <MenuItem value="B_ENGR">Bachelor's Degree</MenuItem>
                //       <MenuItem value="M_SC">Master's Degree</MenuItem>
                //     </Select>
                //   </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
            
          <label htmlFor="mobileNumber" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">start term and year</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      id="startTermAndYear"
                      disabled={action == "view"}
                      displayEmpty
                      value={formData?.academicInformation?.startTermAndYear}
                      onChange={(e) => handleInputChange(e, "academicInformation")}
                      name="startTermAndYear"
                      defaultValue=""
                      sx={{ '& > *': { border: 'none', padding: "0.5rem 0", fontWeight: "500", color: "rgb(120 113 108)" } }}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                    >
                      <MenuItem className="!p-0 !hidden" value="">Select Timeframe</MenuItem>
                      <MenuItem value="Dec 2023 - March 2024">Dec 2023 - March 2024</MenuItem>
                      <MenuItem value="April - July 2024">April - July 2024</MenuItem>
                      <MenuItem value="Aug - Nov 2024">Aug - Nov 2024</MenuItem>
                      <MenuItem value="Dec 2024 to Mar 2025">Dec 2024 to Mar 2025</MenuItem>
                    </Select>
                  </FormControl>
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
            {/* <FormControl fullWidth>
              <Select
                itemID="location"
                defaultValue={10}
                className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                disabled={action == "view"}
                name="startTermAndYear"
                value={formData?.academicInformation?.startTermAndYear}
                onChange={(e) => handleInputChange(e, "academicInformation")}
              >
                <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                <MenuItem value="">Nigeria</MenuItem>
                <MenuItem value={30}>Others</MenuItem>
              </Select>
            </FormControl> */}
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="streetAddress" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SELECT DEGREE</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                    <Select
                      // displayEmpty
                      itemID="location"
                      defaultValue={10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="degree"
                      value={formData?.academicInformation?.degree}
                      onChange={(e) => handleInputChange(e, "academicInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      {
                        degreeList.map((degType: string) => (
                          <MenuItem key={degType} value={degType}>{degType}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
            
          <label htmlFor="city" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">do you intend to attend full-time</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                    <Select
                      // displayEmpty
                      itemID="location"
                      defaultValue={false}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      name="intendToStudyFullTime"
                      disabled={action == "view"}
                      value={formData?.academicInformation?.intendToStudyFullTime}
                      onChange={(e) => handleInputChange(e, "academicInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value={true as any}>Yes</MenuItem>
                      <MenuItem value={false as any}>No</MenuItem>
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <div className="grow basis-1/2 flex flex-col justify-around">
            <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">INTERESTED IN SCHOLARSHIPS/FINANCIAL AID?</p>
            <ul className="flex flex-col gap-6 mt-2 text-stone-500">
              <li className="">
                <label className="flex flex-row items-center gap-2.5">
                  <input type="radio" disabled={action == "view"} checked={formData?.academicInformation?.interestedInFinancialAid} onChange={(e) => setFormData({ ...formData, academicInformation: {...formData.academicInformation, interestedInFinancialAid: true}})} name="interestedInFinancialAid" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">YES</p>
                </label>
              </li>
              <li className="">
                <label className="flex flex-row items-center gap-2.5">
                  <input type="radio" disabled={action == "view"} checked={!formData?.academicInformation?.interestedInFinancialAid} onChange={(e) => setFormData({ ...formData, academicInformation: {...formData.academicInformation, interestedInFinancialAid: false}})} name="interestedInFinancialAid" className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">NO</p>
                </label>
              </li>
            </ul>
          </div>
        </div>


        {/* Test Scores Section */}
        <h2 className="text-black text-xl font-medium leading-6 mt-10 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          Test Scores
        </h2>

        <div className="items-end self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="email" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">IS ENGLISH YOUR NATIVE LANGUAGE?</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                    <Select
                      // displayEmpty
                      itemID="location"
                      defaultValue={false}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      name="isEnglishNativeLanguage"
                      disabled={action == "view"}
                      value={formData?.academicInformation?.isEnglishNativeLanguage}
                      onChange={(e) => handleInputChange(e, "academicInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value={true as any}>Yes</MenuItem>
                      <MenuItem value={false as any}>No</MenuItem>
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
            
          <label htmlFor="mobileNumber" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">HAVE YOU TAKEN AN ENGLISH PROFICIENCY TEST?</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                    <Select
                      // displayEmpty
                      itemID="location"
                      defaultValue={false}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      name="hasTakenEnglishProficiencyTest"
                      disabled={action == "view"}
                      value={formData?.academicInformation?.hasTakenEnglishProficiencyTest}
                      onChange={(e) => handleInputChange(e, "academicInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem value={true as any}>Yes</MenuItem>
                      <MenuItem value={false as any}>No</MenuItem>
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        <div className="flex w-[50%] mb-3">
          <p className="text-xs basis-1/2 grow mt-3 tracking-wider leading-5 text-stone-500/90 ">Any applicant whose native language is not English is required to demonstrate English language proficiency.</p>
        </div>

        {/* DO NOT REMOVE THIS SECTION YET */}

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="streetAddress" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">TYPE OF TEST TAKEN</p>
            {
              !isLoading
                ?
                  <input name="typeOfTestTaken" disabled={action == "view"} value={formData?.academicInformation?.typeOfTestTaken} onChange={(e) => handleInputChange(e, "academicInformation")} type="text" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                // <FormControl fullWidth>
                //     <Select
                //       itemID="location"
                //       defaultValue={false}
                //       className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                //       name="typeOfTestTaken"
                //       disabled={action == "view"}
                //       value={formData?.academicInformation?.typeOfTestTaken}
                //       onChange={(e) => handleInputChange(e, "academicInformation")}
                //     >
                //       <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                //       <MenuItem value={true as any}>Yes</MenuItem>
                //       <MenuItem value={false as any}>No</MenuItem>
                //     </Select>
                //   </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
            
          <label htmlFor="city" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SCORE</p>
            {
              !isLoading
                ?
                  <input name="testScore" disabled={action == "view"} value={formData?.academicInformation?.testScore?.replace(/[^0-9]/g, "")} onChange={(e) => handleInputChange(e, "academicInformation")} type="text" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                  // <FormControl fullWidth>
                  //   <Select
                  //     itemID="location"
                  //     defaultValue={false}
                  //     className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                  //     name="testScore"
                  //     disabled={action == "view"}
                  //     value={formData?.academicInformation?.testScore}
                  //     onChange={(e) => handleInputChange(e, "academicInformation")}
                  //   >
                  //     <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                  //     <MenuItem value={true as any}>Yes</MenuItem>
                  //     <MenuItem value={false as any}>No</MenuItem>
                  //   </Select>
                  // </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>

        {/* ============================ */}
        {/* Previous High School Section */}
        {/* ============================ */}
        <h2 className="text-black text-xl font-medium leading-6 mt-10 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          Previous High School History
        </h2>
        <p className="text-sm mt-3 tracking-wide text-stone-500 max-w-[400px]">Starting with the current or most recent, list ALL schools you have attended or are currently attending.</p>
          {
          !isLoading
            ? (
              formData?.academicInformation?.previousHighSchoolHistory && formData?.academicInformation?.previousHighSchoolHistory?.map((school: any, index: number) => (
                <Fragment key={index}>
                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="previousInstitutionAttended" className="grow basis-full">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">previous institution attended</p>
                      <input id="previousInstitutionAttended" disabled={action == "view"} value={school?.previousInstitutionAttended} onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousHighSchoolHistory")} name="previousInstitutionAttended" type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                  </div>
    
                  <div className="items-end self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="email" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">have you graduated from this institution?</p>
                      <FormControl fullWidth>
                        <Select
                          itemID="location"
                          defaultValue={school.hasGraduatedFromInstitution || 10}
                          className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                          name="hasGraduatedFromInstitution"
                          disabled={action == "view"}
                          value={school?.hasGraduatedFromInstitution}
                          onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousHighSchoolHistory")}
                        >
                          <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                          <MenuItem value={true as any}>Yes</MenuItem>
                          <MenuItem value={false as any}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </label>
                      
                    <label htmlFor="expectedDateOfGraduation" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">expected date of graduation</p>
                      <input id="expectedDateOfGraduation" disabled={action == "view"} value={school?.expectedDateOfGraduation?.split("T")[0]} onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousHighSchoolHistory")} name="expectedDateOfGraduation" type="date" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-2.5 rounded-md items-start max-md:pr-5" />
                    </label>
                  </div>
    
                  <div className="flex flex-row w-full items-center justify-between">
                    {
                      index === formData?.academicInformation?.previousHighSchoolHistory?.length - 1
                      && (
                        <button type="button" onClick={(e) => addHighSchool()} className="flex flex-row items-center gap-1 py-2  mt-3 rounded-md text-primary-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add Another High School
                        </button>
                      )
                    }
                    {
                      formData?.academicInformation?.previousHighSchoolHistory?.length > 1
                      && (
                        <button type="button" onClick={(e) => removeHigherSchool(index)} className="ml-auto flex flex-row items-center gap-1 px-3 py-2  mt-3 rounded-md text-primary-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                          Remove High School
                        </button>
                      )
                    }
                  </div>
                </Fragment>
              ))
            ) : (
                <>
                  {/* High School Section Skeleton Loader */}
                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="email" className="grow basis-full">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">previous institution attended</p>
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    </label>
                  </div>
    
                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="email" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">have you graduated from this institution?</p>
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    </label>
                      
                    <label htmlFor="dateOfGraduation" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">expected date of graduation</p>
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />                    </label>
                  </div>
    
                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                    <div className="grow basis-1/2 flex flex-col justify-around">
                      <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">Do you want to add another institution?</p>
                      <ul className="flex flex-col gap-6 mt-2 text-stone-500">
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
            )
        }
       
        {/* ================================ */}
        {/* Previous College History Section */}
        {/* ================================ */}
        <h2 className="text-black text-xl font-medium leading-6 tracking-tight mt-9 self-stretch whitespace-nowrap max-md:max-w-full">
          Previous College History
        </h2>
        <p className="text-sm mt-3 tracking-wide text-stone-500 max-w-[400px]">Starting with the current or most recent, list ALL schools you have attended or are currently attending.</p>

        {
          !isLoading
            ? (
              formData?.academicInformation.previousCollegeHistory && formData?.academicInformation.previousCollegeHistory?.map((college: any, index: number) => (
                <Fragment key={index}>
                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="previousInstitutionAttended" className="grow basis-full">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">previous institution attended</p>
                      <input id="previousInstitutionAttended" disabled={action == "view"} value={college?.previousInstitutionAttended} onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")} name="previousInstitutionAttended" type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                    </label>
                  </div>

                  <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                    <label htmlFor="email" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">COURSE OF STUDY</p>
                      <input name="major" disabled={action == "view"} value={college?.major} onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")} type="text" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                      {/* <FormControl fullWidth>
                        <Select
                          itemID="location"
                          defaultValue={college?.major || 10}
                          className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                          name="major"
                          disabled={action == "view"}
                          value={college?.major}
                          onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")}
                        >
                          <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                          {
                            [
                              "High school", "Undergraduate Diploma", "U.G Advanced Diploma", "Associate Degree",
                              "Bachelor’s Degree", "PostGraduate Certificate", "Master’s Degree", "Doctoral Degree (Ph.D)"
                            ].map((course: string) => (
                              <MenuItem key={course} value={course}>{course}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl> */}
                    </label>
                      
                    <label htmlFor="degreeEarnedOnOrExpected" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">degree earned / expected?</p>
                      <FormControl fullWidth>
                        <Select
                          itemID="location"
                          defaultValue={college?.major || 10}
                          className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                          name="degreeEarnedOnOrExpected"
                          disabled={action == "view"}
                          value={college?.degreeEarnedOnOrExpected}
                          onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")}
                        >
                          <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                          {
                            degreeList.map((course: string) => (
                              <MenuItem key={course} value={course}>{course}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                      {/* <input id="degreeEarnedOnOrExpected" disabled={action == "view"} value={college?.degreeEarnedOnOrExpected?.split("T")[0]} onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")} name="degreeEarnedOnOrExpected" type="date" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-2.5 rounded-md items-start max-md:pr-5" /> */}
                    </label>
                  </div>

                  <div className="self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap items-end">
                    <label htmlFor="email" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">have you graduated from this institution?</p>
                      <FormControl fullWidth>
                        <Select
                          itemID="location"
                          defaultValue={college?.hasGraduatedFromInstitution || 10}
                          className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                          name="hasGraduatedFromInstitution"
                          disabled={action == "view"}
                          value={college?.hasGraduatedFromInstitution}
                          onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")}
                        >
                          <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                          <MenuItem value={true as any}>Yes</MenuItem>
                          <MenuItem value={false as any}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </label>
                      
                    <label htmlFor="expectedDateOfGraduation" className="grow basis-1/2">
                      <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">expected date of graduation</p>
                      <input id="expectedDateOfGraduation" disabled={action == "view"} value={college?.expectedDateOfGraduation?.split("T")[0]} onChange={(e) => handleArrayInputChange(e, index, "academicInformation", "previousCollegeHistory")} name="expectedDateOfGraduation" type="date" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-2.5 rounded-md items-start max-md:pr-5" />
                    </label>
                  </div>

                  <div className="flex flex-row w-full items-center justify-between">
                    {
                      index === formData?.academicInformation?.previousCollegeHistory?.length - 1
                      && (
                        <button onClick={(e) => addCollege()} className="flex flex-row items-center gap-1 py-2  mt-3 rounded-md text-primary-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add Another College
                        </button>
                      )
                    }
                    {
                      formData?.academicInformation?.previousCollegeHistory?.length > 1
                      && (
                        <button onClick={(e) => removeCollege(index)} className="ml-auto flex flex-row items-center gap-1 px-3 py-2  mt-3 rounded-md text-primary-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                          Remove College
                        </button>
                      )
                    }
                  </div>

                  {/* {
                    index === formData?.academicInformation?.previousCollegeHistory?.length - 1
                      && (
                        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                          <div className="grow basis-1/2 flex flex-col justify-around">
                            <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">Do you want to add another institution?</p>
                            <ul className="flex flex-col gap-6 mt-2 text-stone-500">
                              <li className="">
                                <button onClick={(e) => addCollege()} disabled={action == "view"} className="flex flex-row items-center gap-2.5">
                                  <input type="radio" disabled className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">YES</p>
                                </button>
                              </li>
                              <li className="">
                                <button onClick={(e) => removeCollege()} disabled={action == "view"} className="flex flex-row items-center gap-2.5">
                                  <input type="radio" disabled className="outline outline-2 outline-zinc-300 rounded-full outline-offset-2"/>
                                  <p className="text-neutral-700 text-xs font-medium leading-4 tracking-widest uppercase">NO</p>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )
                  } */}
                </Fragment>
              ))
            ) : (
              <>
                <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="email" className="grow basis-full">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">previous institution attended</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="email" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">MAJOR</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                    
                  <label htmlFor="degreeEarned" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">degree earned / expected?</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <label htmlFor="email" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">have you graduated from this institution?</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                    
                  <label htmlFor="degreeEarned" className="grow basis-1/2">
                    <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">expected date of graduation</p>
                    <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                  </label>
                </div>

                <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                  <div className="grow basis-1/2 flex flex-col justify-around">
                    <p className="text-neutral-500 text-xs leading-4 tracking-widest uppercase">Do you want to add another institution?</p>
                    <ul className="flex flex-col gap-5 mt-2 text-stone-500">
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
            )
        }
      </div>
    </section>
  )
}