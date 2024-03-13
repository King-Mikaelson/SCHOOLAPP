"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SchoolInformation from "./_components/SchoolInformation";
import ProgramInformation from "./_components/ProgramInformation";
import TuitionAndFees from "./_components/TuitionAndFees";
import AdmissionRequirement from "./_components/AdmissionRequirement";
import OtherInformation from "./_components/OtherInformation";
import { useSearchParams } from "next/navigation";
import api from "@redux/api";
import LoadingButton from "@SharedComponents/LoadingButton";
import { useRouter } from "next/navigation";
import { schoolInformationInitialState, schoolInitialState } from "./data";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import SchoolImages from "./_components/Images";
import ProgramTable from "./_components/ProgramTable";

type TView =
  | "School Information"
  | "Program Information"
  | "Tuition and Fees"
  | "Admission Requirement"
  | "Other Information"
  | "Image";
// type TView = "School Information" | "Program Information";
type PView = "Table" | "Form";

export default function AddSchoolApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const id = searchParams.get("id");

  // const views = [
  //   "School Information",
  //   "Program Information",
  //   "Tuition and Fees",
  //   "Admission Requirement",
  //   "Image",
  // ];
  const views = ["School Information", "Program Information"];
  const [currentView, setCurrentView] = useState<TView>("School Information");
  const [programView, setProgramView] = useState<PView>("Table");
  const [formData, setFormData] = useState(schoolInformationInitialState);
  const [schoolFormData, setSchoolFormData] = useState(schoolInitialState);
  const [imageFiles, setImageFiles] = useState<Array<any>>([]);
  const [hasProcessedImages, setHasProcessedImages] = useState<boolean>(false);

  useEffect(() => {
    setProgramView("Table");
  }, [currentView]);

  const [
    addSchool,
    {
      isLoading: isSubmitting,
      isSuccess: submitSuccess,
      data: submitData,
      error: submitError,
      reset,
    },
  ] =
    action === "update"
      ? api.adminApis.useUpdateSchoolMutation()
      : api.adminApis.useAddSchoolMutation();
  // const [ addSchool, { isLoading: isSubmitting, isSuccess: submitSuccess, error: submitError, reset } ] = api.adminApis.useAddSchoolMutation()
  const [getSchoolTrigger, { isLoading, data }] =
    api.adminApis.useLazyGetSchoolsQuery();

  let selectedData: Partial<{
    info?: {
      name: string;
      schoolType: string;
      state: string;
      country: string;
      url: string;
      about: string;
      programs?:never[],
      _id?:string | number,
      __v?:string
    };
    schoolId: string;
  }>  = {
    info: {
      name: "",
      schoolType: "",
      state: "",
      country: "",
      url: "",
      about: "",
      _id: "",
      __v: "",
      programs: [],
    },
  };

  selectedData.info = data?.data?.find((each: any) => each?.schoolId === id);
  console.log("this is an exampkeeee", id, data?.data?.find((each: any) => each?.schoolId === "SC0BBZW8UQ2V50K"))

  console.log("this is an exampkeeeeiddd", id, data?.data?.find((each: any) => each?.schoolId === "SC4RG0L5MF7OZ3I"))

  console.log("this is an exampkeeee666666", id, data?.data?.find((each: any) => each?.name=== "Metropolitan University College of Medicine"))

  if (
    isLoading === false &&
    (selectedData?.info?._id || selectedData?.info?.__v)
  ) {
    const { _id, __v, programs, ...restOfInfo } = selectedData.info;
    selectedData.info = restOfInfo;
  }

  useEffect(() => {
    if (["view", "update"].includes(action as string)) {
      getSchoolTrigger("");
    }
  }, []);

  /* Propopulate Sponsor Application Phone Number fields */
  useEffect(() => {
    if (selectedData && !isSubmitting) {
      setFormData({
        info: selectedData.info,
        program: {
          name: "",
          programType: "",
          duration: "",
          degreeType: "",
          startDate: "",
          classType: "",
          about: "",
          currency: "USD",
          tuitionFee: "",
          otherFee: "",
          requiredDocuments: ["", "", "", ""],
          needBasedScholarships: false,
          meritBasedScholarships: false,
          OnCampus: false,
          OffCampus: false,
        },
      });
      // setSchoolFormData({ ...selectedData });
    }
  }, [data]);

  /* Susessful Submission Effect */
  // useEffect(() => {
  //   if (submitSuccess) {
  //     if (action !== "update") {
  //       setFormData(schoolInformationInitialState);
  //       setCurrentView("School Information");
  //     } else {
  //       const exitPageTimeout = setTimeout(() => {
  //         cancelForm();
  //         clearTimeout(exitPageTimeout);
  //       }, 1000);
  //     }
  //   }
  // }, [submitSuccess]);
  useEffect(() => {
    if (submitSuccess) {
      if (action !== "update") {
        setFormData(schoolInformationInitialState);
        setSchoolFormData(schoolInitialState);
        setCurrentView("School Information");
      } else {
        const exitPageTimeout = setTimeout(() => {
          cancelForm();
          clearTimeout(exitPageTimeout);
        }, 1000);
      }
    }
  }, [submitSuccess]);

  // @ts-ignore
  const handleInputChange = (e: any, property: any): void => {
    const { name, value } = e.target;
    // @ts-ignore;
    setFormData({
      ...formData,
      [property]: {
        // @ts-ignore
        ...formData[property as keyof typeof formData],
        [name]: value,
      },
    });
    setSchoolFormData({
      ...schoolFormData,
      [property]: {
        // @ts-ignore
        ...schoolFormData[property as keyof typeof schoolFormData],
        [name]: value,
      },
    });
    if (submitSuccess) reset();
  };

  const handleCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    // console.log(event.target.name)
    // setChecked(event.target.checked);
    const { name, checked } = event.target;
    // @ts-ignore;
    setFormData({
      ...formData,
      [property]: {
        // @ts-ignore
        ...formData[property as keyof typeof formData],
        [name]: checked,
      },
    });
     // @ts-ignore;
    setSchoolFormData({
      ...schoolFormData,
      [property]: {
        // @ts-ignore
        ...schoolFormData[property as keyof typeof schoolFormData],
        [name]: checked,
      },
    });
    if (submitSuccess) reset();
  };

  const handleNumericInputChange = (e: any, property: any): void => {
    const { name, value } = e.target;
    // @ts-ignore;
    setFormData({
      ...formData,
      [property]: {
        // @ts-ignore
        ...formData[property as keyof typeof formData],
        [name]: Number(value.replace(/,/g, "").replace(/[^0-9]/gi, "")),
      },
    });
    setSchoolFormData({
      ...formData,
      [property]: {
        // @ts-ignore
        ...schoolFormData[property as keyof typeof schoolFormData],
        [name]: Number(value.replace(/,/g, "").replace(/[^0-9]/gi, "")),
      },
    });
    if (submitSuccess) reset();
  };

  const handleFlatArrayInputChange = (
    e: any,
    index: number,
    property: any,
    nestedProperty: string
  ): void => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [property]: {
        // @ts-ignore;
        ...prevFormData[property as keyof typeof formData],
        // @ts-ignore
        [nestedProperty]: prevFormData[property][nestedProperty].map(
           // @ts-ignore
          (sponsor, i) => (i === index ? value : sponsor)
        ),
      },
    }));

    if (submitSuccess) reset();
  };

  const cancelForm = (): void => {
    router.back();
  };

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

  // const convertStateToFormData = (state: any) => {
  //   const formData = new FormData();

  //   const appendFields = (data: any, parentKey = "") => {
  //     for (const key in data) {
  //       if (data.hasOwnProperty(key)) {
  //         const value = data[key];
  //         const fieldName = parentKey ? `${parentKey}[${key}]` : key;

  //         if (value instanceof Array) {
  //           // removing index number of images
  //           if (fieldName === "images") {
  //             value.forEach((item, index) => {
  //               formData.append(`${fieldName}`, item);
  //             });
  //           } else {
  //             // Handle arrays
  //             value.forEach((item, index) => {
  //               if (item !== "")
  //                 formData.append(`${fieldName}[${index}]`, item);
  //             });
  //           }
  //         } else if (value instanceof Object && !(value instanceof FileList)) {
  //           // Recursively process nested objects
  //           appendFields(value, fieldName);
  //         } else {
  //           // Handle other values
  //           if (value !== "") formData.append(fieldName, value);
  //         }
  //       }
  //     }
  //   };

  //   appendFields(state);

  //   return formData;
  // };

  // const convertStateToFormData = (state: any) => {
  //   const formData = new FormData();

  //   const appendFields = (data: any, parentKey = "") => {
  //     for (const key in data) {
  //       if (data.hasOwnProperty(key)) {
  //         const value = data[key];
  //         const fieldName = key;

  //         if (value instanceof Array) {
  //           // removing index number of images
  //           if (fieldName === "images") {
  //             value.forEach((item, index) => {
  //               formData.append(`${fieldName}`, item);
  //             });
  //           } else {
  //             // Handle arrays
  //             value.forEach((item, index) => {
  //               if (item !== "")
  //                 formData.append(`${fieldName}[${index}]`, item);
  //             });
  //           }
  //         } else if (value instanceof Object && !(value instanceof FileList)) {
  //           // Recursively process nested objects
  //           appendFields(value, fieldName);
  //         } else {
  //           // Handle other values
  //           if (value !== "") formData.append(fieldName, value);
  //         }
  //       }
  //     }
  //   };

  //   appendFields(state);

  //   return formData;
  // };


  const convertStateToFormData = (state: any) => {
    const formData = new FormData();
  
    const appendFields = (data: any, parentKey = "") => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          // Construct field name with hierarchy for nested objects
          const fieldName = parentKey !== "[info]" ? `${parentKey}[${key}]` : key;
  
          if (value instanceof Array) {
            // Special handling for image arrays or general arrays
            value.forEach((item, index) => {
              // If it's an array of files/images, just append them without index
              if (item instanceof File || fieldName === "images") {
                formData.append(fieldName, item);
              } else if (typeof item === 'object') {
                // For nested objects within arrays, call recursively
                appendFields(item, `${fieldName}[${index}]`);
              } else {
                // Append other array values with indices
                formData.append(`${fieldName}[${index}]`, item?.toString());
              }
            });
          } else if (value instanceof FileList) {
            // Append all files from a FileList
            for (let i = 0; i < value.length; i++) {
              formData.append(fieldName, value[i]);
            }
          } else if (value instanceof Object) {
            // Recursively process nested objects
            appendFields(value, fieldName);
          } else {
            // Append non-object and non-array values directly
            if (value !== "") formData.append(fieldName, value?.toString());
          }
        }
      }
    };
  
    appendFields(state);
    return formData;
  };
  
  // const extractkeyAndValues = (value) => {
  //     // Extract keys and values
  // const keys = Object.keys(value);
  // const values = Object.values(value);

  // // Create a new object with key-value pairs
  // const newObject = {};

  // keys.forEach((key, index) => {
  //   newObject[key] = values[index];
  // });
  // setFormData({...newObject, program:formData.program});
  // setSchoolFormData({...newObject});
  // }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    // addSchool(convertStateToFormData(formData));
  
    addSchool(
      convertStateToFormData(
        ["view", "update"].includes(action as string)
          ?  formData
          :  schoolFormData
      )
    );
  };

  var the: FormData = convertStateToFormData(formData);
  // @ts-ignore
  for (const [key, value] of the.entries()) {
    console.log(`${key}: ${value}`);
  }
  var the: FormData = convertStateToFormData(schoolFormData);
  // @ts-ignore
  for (const [key, value] of the.entries()) {
    console.log(`${key}: ${value}`);
  }

  // console.log(convertStateToFormData(formData).get("program[degreeType]"))
  // console.log(convertStateToFormData(formData).get("admissionRequirement[accomodationOptions][0]"))
  // console.log(convertStateToFormData(formData).get("admissionRequirement[accomodationOptions][0]"))

  console.log(convertStateToFormData(formData).get("images"));
  console.log(typeof convertStateToFormData(formData).get("images[0]"));
  console.log(formData)

  // console.log(selectedData);
  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-col my-4">
        <button
          onClick={cancelForm}
          type="button"
          className="text-stone-600 w-max flex font-medium flex-row items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Go Back
        </button>
        {action !== "view" && (
          <div className="flex flex-row items-center gap-3 mt-3 ml-auto">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              sucess={submitSuccess}
              successText="Sucessful!"
              className="rounded-md px-6 font-medium shadow-md py-1.5 bg-primary-red text-white"
            >
              Save
            </LoadingButton>
            <button
              onClick={cancelForm}
              type="button"
              className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
      <section className="">
        <div className="overflow-x-auto no-scrollbar grid">
          <ul className="grid gap-x-2 lg:gap-x-3 2xl:gap-x-4 grid-flow-col w-max">
            {views.map((view: (typeof views)[0], index: number) => (
              <li
                key={index}
                className={`border-b-[3px] duration-300 ${
                  view === currentView
                    ? "border-b-primary-red text-primary-red"
                    : "border-b-white text-stone-600"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCurrentView(view as TView)}
                  className="font-normal min-w-max outline-none px-1 py-1.5 capitalize"
                >
                  {view.replace(/-/g, " ")}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className=" mb-14">
          {currentView === "School Information" ? (
            <SchoolInformation
              formData={
                ["view", "update"].includes(action as string)
                  ? formData
                  : schoolFormData
              }
              setFormData={
                ["view", "update"].includes(action as string)
                  ? setFormData
                  : setSchoolFormData
              }
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleInputChange={handleInputChange}
              selectedData={selectedData}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              hasProcessedImages={hasProcessedImages}
              setHasProcessedImages={setHasProcessedImages}
            />
          ) : currentView === "Program Information" &&
            programView === "Table" ? (
            <ProgramTable setProgramView={setProgramView} action={action}/>
          ) : currentView === "Program Information" &&
            programView === "Form" ? (
            <ProgramInformation
              formData={formData}
              setFormData={setFormData}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleInputChange={handleInputChange}
              handleNumericInputChange={handleNumericInputChange}
              handleFlatArrayInputChange={handleFlatArrayInputChange}
              handleCheckBox={handleCheckBox}
            />
             // @ts-ignore
          ) : currentView === "Tuition and Fees" ? (
            <TuitionAndFees
              formData={formData}
              setFormData={setFormData}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleInputChange={handleInputChange}
              handleNumericInputChange={handleNumericInputChange}
            />
             // @ts-ignore
          ) : currentView === "Admission Requirement" ? (
            <AdmissionRequirement
              formData={formData}
              setFormData={setFormData}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleFlatArrayInputChange={handleFlatArrayInputChange}
            />
             // @ts-ignore
          ) : currentView === "Image" ? (
            <SchoolImages
              formData={schoolFormData}
              setFormData={setSchoolFormData}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleFlatArrayInputChange={handleFlatArrayInputChange}
              selectedData={selectedData}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              hasProcessedImages={hasProcessedImages}
              setHasProcessedImages={setHasProcessedImages}
            />
             // @ts-ignore
          ) : currentView === "Other Information" ? (
            <OtherInformation
              formData={formData}
              setFormData={setFormData}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleFlatArrayInputChange={handleFlatArrayInputChange}
              handleInputChange={handleInputChange}
            />
          ) : (
            "hello"
          )}
        </div>
        <ErrorBlock
          error={submitError}
          className="w-full mt-4 max-w-screen-md"
        />
      </section>
    </form>
  );
}
