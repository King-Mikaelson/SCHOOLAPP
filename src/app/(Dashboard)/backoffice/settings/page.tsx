"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import PersonalProfile from "./_components/PersonalProfile";
import LoginDetails from "./_components/LoginDetails";
import TuitionAndFees from "./_components/TuitionAndFees";
import AdmissionRequirement from "./_components/AdmissionRequirement";
import OtherInformation from "./_components/OtherInformation";
import { useSearchParams } from "next/navigation";
import api from "@redux/api";
import LoadingButton from "@SharedComponents/LoadingButton";
import { useRouter } from "next/navigation";
import { schoolInformationInitialState } from "./data";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import SchoolImages from "./_components/Images";

type TView = ("Personal Profile"|"Log-in Details"|"Notifications"|"Security");



export default function AddSchoolApplications() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const action = searchParams.get("action");
  const id = searchParams.get("id");

  const views = ["Personal Profile","Log-in Details","Notifications","Security"]
  const [ currentView, setCurrentView ] = useState<TView>("Personal Profile");
  const [ formData, setFormData ] = useState(schoolInformationInitialState);
  const [ imageFiles, setImageFiles ] = useState<Array<any>>([]);
  const [ hasProcessedImages, setHasProcessedImages ] = useState<boolean>(false);



  const [ addSchool, { isLoading: isSubmitting, isSuccess: submitSuccess, data: submitData, error: submitError, reset } ] = action === "update" ? api.adminApis.useUpdateSchoolMutation() : api.adminApis.useAddSchoolMutation()
  // const [ addSchool, { isLoading: isSubmitting, isSuccess: submitSuccess, error: submitError, reset } ] = api.adminApis.useAddSchoolMutation()
  const [ getSchoolTrigger, { isLoading, data } ] = api.adminApis.useLazyGetSchoolsQuery()
  const selectedData = data?.data?.filter((each: any) => each?.schoolId === id)[0];
  console.log(selectedData)
  useEffect(() => {
    if (["view", "update"].includes(action as string)) {
      getSchoolTrigger("");
    }
  }, []);

  /* Propopulate Sponsor Application Phone Number fields */
  useEffect(() => {
    if (selectedData && !isSubmitting) {
      setFormData({ ...selectedData });
    }
  }, [ data ]);

  /* Susessful Submission Effect */
  useEffect(() => {
    if (submitSuccess) {
      if (action !== "update") {
        setFormData(schoolInformationInitialState);
        setCurrentView("Personal Profile");
      } else {
        const exitPageTimeout = setTimeout(() => {
          cancelForm();
          clearTimeout(exitPageTimeout);
        }, 1000);
      }
    };
  }, [ submitSuccess ]);

  const handleInputChange = (e: any, property: any): void => {
    const { name, value } = e.target;
    // @ts-ignore;
    setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [name]: value } });
    if (submitSuccess) reset();
  }

  const handleNumericInputChange = (e: any, property: any): void => {
    const { name, value } = e.target;
    // @ts-ignore;
    setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [name]: Number(value.replace(/,/g, "").replace(/[^0-9]/ig, ""))} });
    if (submitSuccess) reset();
  }

  const handleFlatArrayInputChange = (e: any, index: number, property: any, nestedProperty: string): void => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [property]: {
        // @ts-ignore;
        ...prevFormData[property as keyof typeof formData],
        // @ts-ignore
        [nestedProperty]:prevFormData[property][nestedProperty].map((sponsor, i) =>
        i === index ? value : sponsor
      )},
    }));
    if (submitSuccess) reset();
  }

  const cancelForm = (): void => {
    router.back()
  }

  /* Transforming To FormData Type Before Submission */
  /* =============================================== */
  // function convertStateToFormData(state: any) {
  //   const formData = new FormData();
  
  //   // Recursive function to flatten nested objects
  //   const flattenObject = (obj: any, prefix = "") => {
  //     for (const [key, value] of Object.entries(obj)) {
  //       const newKey = prefix ? `${prefix}.${key}` : key;
  
  //       if (value && typeof value === "object" && !Array.isArray(value)) {
  //         flattenObject(value, newKey);
  //       } else {
  //         formData.append(newKey, value as string);
  //       }
  //     }
  //   };
  
  //   // Start flattening from the top-level state object
  //   flattenObject(state);
  
  //   return formData;
  // }

  // function objectToFormData(obj: any, formDataInstance: FormData, parentKey = '') {
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       const propName = parentKey ? `${parentKey}[${key}]` : key;
  //       const value = obj[key as keyof any];
  
  //       if (value instanceof Array) {
  //         value.forEach((item, index) => {
  //           objectToFormData(item, formDataInstance, `${propName}`);
  //         });
  //       } else if (value instanceof Object && !(value instanceof File)) {
  //         objectToFormData(value as any, formDataInstance, propName);
  //       } else {
  //         // formDataInstance.append(propName, value);
  //         formDataInstance.append(propName, typeof value === 'boolean' ? String(value) : value);
  //       }
  //     }
  //   }
  // }
  
  // const convertToFormData = (data: any): FormData => {
  //   const formDataInstance = new FormData();
  //   objectToFormData(data, formDataInstance);
  //   return formDataInstance;
  // };

  const convertStateToFormData = (state: any) => {
    const formData = new FormData();
  
    const appendFields = (data: any, parentKey = "") => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          const fieldName = parentKey ? `${parentKey}[${key}]` : key;
  
          if (value instanceof Array) {
            // removing index number of images
            if (fieldName === "images"){
              value.forEach((item, index) => {
                formData.append(`${fieldName}`, item);
              });
            } else {
              // Handle arrays
              value.forEach((item, index) => {
                if (item !== "") formData.append(`${fieldName}[${index}]`, item);
              });
            }
          } else if (value instanceof Object && !(value instanceof FileList)) {
            // Recursively process nested objects
            appendFields(value, fieldName);
          } else {
            // Handle other values
            if (value !== "") formData.append(fieldName, value);
          }
        }
      }
    };
  
    appendFields(state);
  
    return formData;
  };

  
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    // addSchool(convertStateToFormData(formData));
  }

  var the: FormData = convertStateToFormData(formData);
  // @ts-ignore
  for (const [key, value] of the.entries()) {
    console.log(`${key}: ${value}`);
  }

  // console.log(convertStateToFormData(formData).get("program[degreeType]"))
  // console.log(convertStateToFormData(formData).get("admissionRequirement[accomodationOptions][0]"))
  // console.log(convertStateToFormData(formData).get("admissionRequirement[accomodationOptions][0]"))

  console.log(convertStateToFormData(formData).get("images"))
  console.log(typeof convertStateToFormData(formData).get("images[0]"))
  console.log(formData?.info?.name)

  // console.log(selectedData);
  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-col my-4">
        <button onClick={cancelForm} type="button" className="text-stone-600 w-max flex font-medium flex-row items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Go Back
        </button>
        {
          action !== "view"
            && (
              <div className="flex flex-row items-center gap-3 mt-3 ml-auto">
                <LoadingButton type="submit" loading={isSubmitting} sucess={submitSuccess} successText="Sucessful!" className="rounded-md px-6 font-medium shadow-md py-1.5 bg-primary-red text-white">Save</LoadingButton>
                <button onClick={cancelForm} type="button" className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600">Cancel</button>
              </div>
            )
        }
      </section>
      <section className="">
        <div className="overflow-x-auto no-scrollbar grid">
          <ul className="grid gap-x-2 lg:gap-x-3 2xl:gap-x-4 grid-flow-col w-max">
            {
              views.map((view: typeof views[0], index: number) => (
                <li key={index} className={`border-b-[3px] duration-300 ${view === currentView ? "border-b-primary-red text-primary-red" : "border-b-white text-stone-600"}`}>
                  <button type="button" onClick={() => setCurrentView(view as TView)} className="font-normal min-w-max outline-none px-1 py-1.5 capitalize">{view.replace(/-/g, " ")}</button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className=" mb-14">
          {
            currentView === "Personal Profile" ? <PersonalProfile />
            : currentView === "Log-in Details" && <LoginDetails />
            // : currentView === "Notifications" ? <TuitionAndFees formData={formData} setFormData={setFormData} isLoading={isLoading} isSubmitting={isSubmitting} handleInputChange={handleInputChange} handleNumericInputChange={handleNumericInputChange} />
            // : currentView === "Security" && <AdmissionRequirement formData={formData} setFormData={setFormData} isLoading={isLoading} isSubmitting={isSubmitting} handleFlatArrayInputChange={handleFlatArrayInputChange} />
          }
        </div>
        <ErrorBlock error={submitError} className="w-full mt-4 max-w-screen-md" />
      </section>
    </form>
  )
}