"use client";

import { useEffect, useState } from "react";
import { applicationSections } from "./data";
import PersonalInformation from "./_components/PersonalInformation";
import ContactInformation from "./_components/ContactInformation";
import SectionSelector from "./_components/SectionSelector";
import SponsorInformation from "./_components/SponsorInformation";
import AcademicPlan from "./_components/AcademicPlan";
import UploadSupportingDocuments from "./_components/UploadDocuments";
import langs from "@dictionaries/langs"
import { useRouter, useSearchParams } from "next/navigation";
import api from "@redux/api";
import { countryList } from "@SharedData/CountryList";



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
      phone: "",
      state: "",
      streetAddress: "",
      zipCode: "",
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
  }
}

type TView = ("Personal Information"|"Contact Information"|"Sponsor Information"|"Academic Information"|"Supporting Documents");

export interface IFormData {
  firstname: string, lastname: string, middlename: string, gender: "MALE"|"FEMALE", dob: string, nationality: string
}

interface IProps {
  params: { lang: string, programId: string }
}

export default function VisaApplication({ params }: IProps) {
  const [ formSection, setFormSection ] = useState<number>(0);

  const router = useRouter();
  const action = useSearchParams().get("action");
  const id = useSearchParams().get("id");

  const views = ["Personal Information","Contact Information","Sponsor Information","Academic Information","Supporting Documents"]
  const [ currentView, setCurrentView ] = useState<TView>("Personal Information");

  const [ addSchoolApplication, { isLoading: isSubmitting, isSuccess: submitSuccess, error: submitError, reset } ] = api.adminApis.useAddSchoolapplicationMutation()
  const [ fetchSchoolApplications, { data, isLoading, error, isSuccess }] = api.adminApis.useLazyGetSchoolApplicationsQuery();
  // const selectedData = data?.data?.data?.filter((each: any) => each?.schoolApplicationId === id)[0];

  const [ formData, setFormData ] = useState(initialSchoolApplicationData);
  const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" });
  const [ phoneDetailsArray, setPhoneDetailsArray ] = useState([ { countryCode: String(countryList[170].phone), number: "" } ])


  /* ======= */
  /* Effects */
  /* ======= */
  // useEffect(() => {
  //   if (["view", "update"].includes(action as string)) {
  //     fetchSchoolApplications("");
  //   }
  // }, []);

  /* Propopulate Sponsor Application Phone Number fields */
  // useEffect(() => {
  //   if (selectedData) {
  //     setFormData({ ...selectedData });  
  //     setPhoneDetails({ ...extractCountryCodeAndNumber(selectedData?.contactInformation?.phone) })
  //     let temp = [];
  //     for (let i = 0; i < selectedData?.sponsorInformation?.sponsors?.length; i++) {
  //       temp.push({ ...extractCountryCodeAndNumber(selectedData?.sponsorInformation?.sponsors[i]?.phone) });       
  //     }
  //     setPhoneDetailsArray(temp);
  //   }
  // }, [ data ]);

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
        }, 2000);
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

  const handleInputChange = (e: any, property: string, componentValue?: string): void => {
    const { name, value, id, itemId } = e.target;
    setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [name]: value } });
    // if (["nationality", "country"].includes(id)) {
    //   setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [id]: value } });
    // } else {
    //   setFormData({ ...formData, [property]: { ...formData[property as keyof typeof formData], [name]: value } });
    // }
    if (submitSuccess) reset();
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
  
  const convertToFormData = (data: typeof initialSchoolApplicationData): FormData => {
    const formDataInstance = new FormData();
    objectToFormData(data, formDataInstance);
    return formDataInstance;
  };

  var theData: FormData = convertToFormData(formData);
  // @ts-ignore
  for (const [key, value] of theData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log("Submitted")
    addSchoolApplication(convertToFormData(formData));
  }
  console.log(submitError);
  console.log(formData.academicInformation)
  return (
    <main className="p-4 bg-[whitesmoke] min-h-[calc(100vh-80px)]">
      <div className="container max-w-screen-2xl mx-auto">
        <div className="md:mx-[clamp(1px,calc(1vw*2),50px)] 2xl:mx-auto max-w-screen-2xl">
          <div className="form-container my-[clamp(2rem,2vmax,4rem)] z-[1] mt-10 bg-whit rounded-lg w-full md:w-[95%]">
            <h1 className="text-3xl font-semibold text-stone-700 lg:text-4xl xl:text-5xl">{langs[params.lang as keyof typeof langs].studyAbroad.completeApplication.completeApplication}</h1>
            {/* <p className="text-sm text-stone-600 mt-3 w-[75%] min-w-[400px]">{langs[params.lang as keyof typeof langs].studyAbroad.completeApplication.startJourney}</p> */}
          </div>
        </div>

        {/* School List and Filters Section */}
        <section className="grid gap-x-2 lg:gap-x-3 relative md:mx-[clamp(1px,calc(1vw*2),50px)] 2xl:mx-auto max-w-screen-2xl xl:gap-x-4 sm:grid-cols-[1.3fr_5fr] h-full">
          <aside className="hidden bg-white sticky top-[100px] px-2 py-4 h-max rounded-xl shadow-md sm:block overflow-y-auto min-w-max">
            <div className="appearance-none mb-5">
              <SectionSelector reverse className="" formSection={formSection} setFormSection={setFormSection} filters={langs[params.lang as keyof typeof langs].applicationSections} />
            </div>
          </aside>

          {/* Application forms Section */}
          <form onSubmit={handleSubmit} className="mb-14">
            {formSection === 0 ? (
              <PersonalInformation formData={formData} setFormSection={setFormSection} handleInputChange={handleInputChange} isLoading={isLoading}  params={params} />
            ) : formSection === 1 ? (
              <ContactInformation formData={formData} setFormData={setFormData} formSection={formSection} setFormSection={setFormSection} handleInputChange={handleInputChange} isLoading={isLoading} phoneDetails={phoneDetails} setPhoneDetails={setPhoneDetails} params={params} />
            ) : formSection === 2 ? (
              <SponsorInformation formData={formData} setFormData={setFormData} formSection={formSection} setFormSection={setFormSection} handleArrayInputChange={handleArrayInputChange} handleInputChange={handleInputChange} handleNestedPhoneNumberChange={handleNestedPhoneNumberChange} phoneDetailsArray={phoneDetailsArray} setPhoneDetailsArray={setPhoneDetailsArray} isLoading={isLoading} params={params} />
            ) : formSection === 3 ? (
              <AcademicPlan formData={formData} setFormData={setFormData} formSection={formSection} setFormSection={setFormSection} handleArrayInputChange={handleArrayInputChange} handleInputChange={handleInputChange} handleNestedInputChange={handleNestedInputChange} isLoading={isLoading} params={params} />
            ) : formSection === 4 ? (
              <UploadSupportingDocuments formData={formData} setFormData={setFormData} formSection={formSection} setFormSection={setFormSection} isSubmitting={isSubmitting} submitSuccess={submitSuccess} reset={reset} params={params} submitError={submitError}/>
            ) : (
              "hello"
            )}
          </form>
        </section>
      </div>
    </main>
  )
}