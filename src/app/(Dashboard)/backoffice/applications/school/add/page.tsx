"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import PersonalInformation from "./_components/PersonalInformation";
import ContactInformation from "./_components/ContactInformation";
import SponsorInformation from "./_components/SponsorInformation";
import AcademicPlan from "./_components/AcademicPlan";
import UploadSupportingDocuments from "./_components/UploadDocuments";
import { useSearchParams } from "next/navigation";
import api from "@redux/api";
import { countryList } from "@SharedData/CountryList";
import { extractCountryCodeAndNumber } from "@utils/miscelaneous";
import LoadingButton from "@SharedComponents/LoadingButton";
import { useRouter } from "next/navigation";
import ErrorBlock from "@SharedComponents/ErrorBlock";

// const initialSchoolApplicationData = {
//   academicInformation: {
//     typeOfTestTaken: "TOEFL",
//     hasTakenEnglishProficiencyTest: true,
//     intendToStudyFullTime: true,
//     testScore: "100",
//     intendedProgramOfStudy: "Computer Science",
//     interestedInFinancialAid: true,
//     isEnglishNativeLanguage: true,
//     previousCollegeHistory: [{
//       degreeEarnedOnOrExpected: "Bachelor's",
//       expectedDateOfGraduation: "2022-05-15",
//       hasGraduatedFromInstitution: true,
//       major: "Computer Science",
//       previousInstitutionAttended: "ABC University"
//     }],
//     previousHighSchoolHistory: [{
//       expectedDateOfGraduation: "2018-06-30",
//       hasGraduatedFromInstitution: true,
//       previousInstitutionAttended: "XYZ High School"
//     }],
//     prospectiveUniversity: "University of XYZ",
//     startTermAndYear: "Fall - 2023",
//     degree: "Master's"
//   },
//   personalInformation: {
//     firstName: 'John',
//     lastName: 'Doe',
//     middleName: 'M',
//     dob: '1990-01-15',
//     gender: 'MALE',
//     nationality: 'US',
//   },
//   contactInformation: {
//     city: "Anytown",
//     country: "US",
//     email: "john.doe@example.com",
//     isMailingAddress: false,
//     phone: "+1 123-456-7890",
//     state: "CA",
//     streetAddress: "123 Main St",
//     zipCode: "12345",
//     mailingAddress: {
//       city: "Anytown",
//       country: "US",
//       email: "john.doe@example.com",
//       phone: "+1 123-456-7890",
//       state: "CA",
//       streetAddress: "123 Main St",
//       zipCode: "12345"
//     }
//   },
//   sponsorInformation: {
//     isSelfSponsored: false,
//     sponsors: [
//       {
//         city: "SponsorCity",
//         country: "NG",
//         email: "sponsor@example.com",
//         firstName: "SponsorFirst",
//         lastName: "SponsorLast",
//         phone: "+1 987-654-3210",
//         state: "Rivers State",
//         streetAddress: "456 Sponsor St",
//         zipCode: "54321",
//         shouldAddAnotherSponsor: false
//       }
//     ]
//   },
//   others: "",
//   waecResult: "",
//   aLevelResult: "",
//   passportPhoto: "",
//   BACHELOR_DEGREE: "",
//   waecScratchCard: "",
//   unofficialTranscript: "",
//   MASTER_DEGREE: ""
// };

const initialSchoolApplicationData = {
  academicInformation: {
    typeOfTestTaken: "",
    hasTakenEnglishProficiencyTest: true,
    intendToStudyFullTime: true,
    testScore: "",
    intendedProgramOfStudy: "",
    interestedInFinancialAid: true,
    isEnglishNativeLanguage: true,
    previousCollegeHistory: [{
      degreeEarnedOnOrExpected: "",
      expectedDateOfGraduation: "",
      hasGraduatedFromInstitution: true,
      major: "",
      previousInstitutionAttended: ""
    }],
    previousHighSchoolHistory: [{
      expectedDateOfGraduation: "",
      hasGraduatedFromInstitution: false,
      previousInstitutionAttended: ""
    }],
    prospectiveUniversity: "",
    startTermAndYear: "",
    degree: ""
  },
  // Personal Information
  personalInformation: {
    firstName: '',
    lastName: '',
    middleName: '',
    dob: '',
    gender: '',
    nationality: '',
  },
  // Contact Information
  contactInformation: {
    city: "",
    country: "",
    email: "",
    isMailingAddress: true,
    phone: "",
    state: "",
    streetAddress: "",
    zipCode: "",
    mailingAddress: {
      city: "",
      country: "",
      email: "",
      isMailingAddress: true,
      phone: "",
      state: "",
      streetAddress: "",
      zipCode: ""
      }
  },
  // Sponsor Information
  sponsorInformation: {
    isSelfSponsored: false,
    sponsors: [
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
    ]
  },
  suportingDocuments: {},
  others: "",
  waecResult: "",
  aLevelResult: "",
  passportPhoto: "",
  waecScratchCard: "",
  unofficialTranscript: "",
  schoolApplicationId: "",
}

type TView = ("Personal Information"|"Contact Information"|"Sponsor Information"|"Academic Information"|"Supporting Documents");

export interface IFormData {
  firstname: string, lastname: string, middlename: string, gender: "MALE"|"FEMALE", dob: string, nationality: string
}

export default function AddSchoolApplications() {
  const router = useRouter();
  const action = useSearchParams().get("action");
  const id = useSearchParams().get("id");

  const views = ["Personal Information","Contact Information","Sponsor Information","Academic Information","Supporting Documents"]
  const [ currentView, setCurrentView ] = useState<TView>("Personal Information");

  const [ addSchoolApplication, { data: submitData, isLoading: isSubmitting, isSuccess: submitSuccess, error: submitError, reset } ] = action === "update" ? api.adminApis.useUpdateSchoolApplicationMutation() : api.adminApis.useAddSchoolapplicationMutation()
  // const [ addSchoolApplication, { isLoading: isSubmitting, isSuccess: submitSuccess, error: submitError, reset } ] = api.adminApis.useAddSchoolapplicationMutation()
  const [ fetchSchoolApplications, { data, isLoading, error }] = api.adminApis.useLazyGetSchoolApplicationsQuery();
  const selectedData = data?.data?.filter((each: any) => each?.schoolApplicationId === id)[0];

  const [ formData, setFormData ] = useState(initialSchoolApplicationData);
  const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" });
  const [ mailingPhoneDetails, setMailingPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" });
  const [ phoneDetailsArray, setPhoneDetailsArray ] = useState([ { countryCode: String(countryList[170].phone), number: "" } ])

  console.log(data?.data)
  /* ======= */
  /* Effects */
  /* ======= */
  useEffect(() => {
    if (["view", "update"].includes(action as string)) {
      fetchSchoolApplications("");
    }
  }, []);

  /** */
  // useEffect(() => {

  //   async function* fetchImagesGenerator(image: any) {
  //     try {
  //       const response = await fetch(image?.url);
  //       const data = await response.blob();
  //       const fileName = image?.url.substring(image?.url.lastIndexOf('/') + 1);
  //       const imageFile = new File([data], fileName, { type: data?.type });
  //       yield imageFile;
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     }
  //   }

  //   let transformed: any = {};
  //   if (selectedData) {
  //     Object.entries(selectedData?.suportingDocuments).forEach((each) => {
  //       console.log(fetchImagesGenerator(each[1]))
  //         transformed[each[0]] = fetchImagesGenerator(each[1])      
  //     })
  //     console.log(transformed);
  //   }

  // }, [ selectedData ]);
  /** */
  useEffect(() => {
    async function fetchImages(image: any) {
      try {
        const response = await fetch(image?.url);
        const data = await response.blob();
        const fileName = image?.url.substring(image?.url.lastIndexOf('/') + 1);
        return new File([data], fileName, { type: data?.type });
      } catch (error) {
        console.error("Error fetching image:", error);
        throw error; // Rethrow the error for Promise.all to catch
      }
    }
  
    const transformImages = async () => {
      let transformed = {};
      if (selectedData) {
        try {
          const promises = Object.entries(selectedData?.suportingDocuments).map(async ([key, value]) => {
            // @ts-ignore
            if (value) transformed[key] = await fetchImages(value);
          });
  
          await Promise.all(promises);
          console.log(transformed);
        } catch (error) {
          console.error("Error transforming images:", error);
        }
      }
      setFormData({ ...selectedData, ...transformed });
      console.log(transformed);

    };
    transformImages();
  }, [ selectedData, data ]);



  /* Propopulate Sponsor Application Phone Number fields */
  useEffect(() => {
    if (selectedData && !isSubmitting) {
      console.log("Processing")
      setFormData({ ...selectedData });  
      setPhoneDetails({ ...extractCountryCodeAndNumber(selectedData?.contactInformation?.phone) });
      setMailingPhoneDetails({ ...extractCountryCodeAndNumber(selectedData?.contactInformation?.mailingAddress?.phone)})
      let temp = [];
      for (let i = 0; i < selectedData?.sponsorInformation?.sponsors?.length; i++) {
        temp.push({ ...extractCountryCodeAndNumber(selectedData?.sponsorInformation?.sponsors[i]?.phone) });       
      }
      setPhoneDetailsArray(temp);
    }
  }, [ data ]);

  /* Auto-populate contact application phone number field whenever the phone details object changes */
  useEffect(() => {
    if(phoneDetails.number.startsWith("0")){
      setFormData({ ...formData, contactInformation: { ...formData.contactInformation, phone: `+${phoneDetails.countryCode}${phoneDetails.number.slice(1, phoneDetails.number.length - 2)}`} });
    } else {
      setFormData({ ...formData, contactInformation: { ...formData.contactInformation, phone: `+${phoneDetails.countryCode}${phoneDetails.number }`} });
    }
  }, [ phoneDetails ]);

  /* Auto-populate Sponsor application phone number fields whenever the phone details object changes */
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < phoneDetailsArray?.length; i++) {
      let hold = {
        ...formData.sponsorInformation.sponsors[i],
        phone: phoneDetails.number.startsWith("0") ? `+${phoneDetailsArray[i]?.countryCode}${phoneDetailsArray[i]?.number.slice(1, phoneDetails.number.length - 2)}` : `+${phoneDetailsArray[i]?.countryCode}${phoneDetailsArray[i]?.number }`
      }
      temp.push(hold);
    }
    setFormData({ ...formData, sponsorInformation: { ...formData.sponsorInformation, sponsors: temp }});
  }, [ phoneDetailsArray ]);

  /* Susessful Submission Effect */
  useEffect(() => {
    if (submitSuccess) {
      if (action !== "update") {
        setFormData(initialSchoolApplicationData);
        setPhoneDetails({ ...phoneDetails, number: "" });
        setPhoneDetailsArray([ { ...phoneDetails, number: "" } ]);
      } else {
        const exitPageTimeout = setTimeout(() => {
          cancelForm();
          clearTimeout(exitPageTimeout);
        }, 1000);
      }
    };
  }, [ submitSuccess ]);

  const handleNestedPhoneNumberChange = (e: any, index: number, name: keyof typeof phoneDetailsArray[0]): void => {
    const temp = [ ...phoneDetailsArray ];
    if (name === "countryCode") {
      temp[index][name] = e.target.value;
    } else if (name === "number") {
      temp[index][name] = e?.target?.value?.replace(/[^0-9]/ig, "");
    }
    setPhoneDetailsArray(temp);
  };

  const handleInputChange = (e: any, property: string): void => {
    const { name, value } = e.target;
    // @ts-ignore
    setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [name]: value } });
    reset();
  }

  const handleNestedInputChange = (e: any, property: string, nestedProperty: string): void => {
    const { name, value } = e.target;
    // @ts-ignore;
    setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [nestedProperty]: { ...formData[property as keyof typeof formData][nestedProperty as ("previousCollegeHistory"|"previousHighSchoolHistory") ], [name]: value} } });
    if (submitSuccess) reset();
  }

  const handleArrayInputChange = (e: any, index: number, property: string, nestedProperty: string): void => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [property]: {
        // @ts-ignore
        ...prevFormData[property as keyof typeof formData],
        // @ts-ignore
        [nestedProperty]:prevFormData[property][nestedProperty].map((sponsor, i) =>
        i === index ? { ...sponsor, ...{[name]: value} } : sponsor
      )},
    }));
    if (submitSuccess) reset();
  }

  const cancelForm = (): void => {
    router.back()
  }

  /* Converting Form Object to FormData */
  function objectToFormData(obj: typeof initialSchoolApplicationData, formDataInstance: FormData, parentKey = '') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const propName = parentKey ? `${parentKey}[${key}]` : key;
        const value = obj[key as keyof typeof initialSchoolApplicationData];
  
        if (value instanceof Array) {
          value.forEach((item, index) => {
            objectToFormData(item, formDataInstance, `${propName}[${index}]`);
          });
        } else if (value instanceof Object && !(value instanceof File)) {
          objectToFormData(value as any, formDataInstance, propName);
        } else {
          // formDataInstance.append(propName, value);
          // @ts-ignore;
          if (value !== "") formDataInstance.append(propName, typeof value === 'boolean' ? String(value) : value);
        }
      }
    }
  }
  
  const convertToFormData = (data: typeof initialSchoolApplicationData) => {
    const formDataInstance = new FormData();
    objectToFormData(data, formDataInstance);
    return formDataInstance;
  };
  // console.log(convertToFormData(formData).get("academicInformation[intendToStudyFullTime]"))
  console.log(convertToFormData(formData).get("status"))
  

  console.log(selectedData);
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addSchoolApplication(convertToFormData(formData));
  }

  console.log(submitError)
  console.log(submitData)

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-col my-4">
        <button type="button" onClick={() => router.back()} className="text-stone-600 flex w-max font-medium flex-row items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Go Back
        </button>
        {
          action !== "view"
            && (
              <div className="flex flex-row items-center justify-between gap-3 mt-3 ml-auto w-full">
                <div className="invisible" />
                <span className="flex flex-row gap-x-2">
                  <LoadingButton loading={isSubmitting} sucess={submitSuccess} successText="Sucessful!" type="submit" className="rounded-md px-6 font-medium shadow-md py-1.5 bg-primary-red text-white">Save</LoadingButton>
                  <button type="button" onClick={cancelForm} className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600">Cancel</button>
                </span>
              </div>
            )
        }
      </section>
      <section className="">
        <div className="overflow-x-auto no-scrollbar grid">
          <ul className="grid grid-flow-col gap-3 w-max">
            {
              views.map((view: typeof views[0]) => (
                <li key={view} className={`border-b-[3px] duration-300 ${view === currentView ? "border-b-primary-red text-primary-red" : "border-b-white text-stone-600"}`}>
                  <button type="button" onClick={() => setCurrentView(view as TView)} className="font-medium min-w-max outline-none px-1 py-1 capitalize">{view?.replace(/-/g, " ")}</button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="mb-14">
          {
            currentView === "Personal Information"
            ? <PersonalInformation formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} isLoading={isLoading} />
            : currentView === "Contact Information" ? <ContactInformation formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} isLoading={isLoading} phoneDetails={phoneDetails} setPhoneDetails={setPhoneDetails} mailingPhoneDetails={mailingPhoneDetails} setMailingPhoneDetails={setMailingPhoneDetails} />
            : currentView === "Sponsor Information" ? <SponsorInformation formData={formData} setFormData={setFormData} phoneDetailsArray={phoneDetailsArray} setPhoneDetailsArray={setPhoneDetailsArray} handleInputChange={handleInputChange} handleArrayInputChange={handleArrayInputChange} handleNestedPhoneNumberChange={handleNestedPhoneNumberChange} isLoading={isLoading} />
            : currentView === "Academic Information" ? <AcademicPlan formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} handleArrayInputChange={handleArrayInputChange} handleNestedInputChange={handleNestedInputChange} isLoading={isLoading} />
            : currentView === "Supporting Documents" ? <UploadSupportingDocuments formData={formData} setFormData={setFormData} isLoading={isLoading} isSubmitting={isSubmitting} others={formData.others} waecResult={formData.waecResult} aLevelResult={formData.aLevelResult} passportPhoto={formData.passportPhoto} waecScratchCard={formData.waecScratchCard} unofficialTranscript={formData.unofficialTranscript} />
            : "hello"
          }
        </div>
        <ErrorBlock error={submitError} className="w-full mt-4 max-w-screen-lg" />

      </section>
    </form>
  )
}