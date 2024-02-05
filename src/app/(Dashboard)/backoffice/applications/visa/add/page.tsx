"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import PersonalInformation from "./_components/PersonalInformation";
import { useSearchParams } from "next/navigation";
import api from "@redux/api";
import { countryList } from "@SharedData/CountryList";
import { extractCountryCodeAndNumber } from "@utils/miscelaneous";
import LoadingButton from "@SharedComponents/LoadingButton";
import { useRouter } from "next/navigation";
import ErrorBlock from "@SharedComponents/ErrorBlock";

const initialFormData = {
  fullName: "", email: "", phone: "", nationality: "", destinationCountry: "", visaType: ""
};

type TView = ("Personal Information"|"Contact Information"|"Sponsor Information"|"Academic Information"|"Supporting Documents");

export default function AddSchoolApplications() {
  const router = useRouter();
  const action = useSearchParams().get("action");
  const id = useSearchParams().get("id");
  const views = ["Personal Information"]
  const [ currentView, setCurrentView ] = useState<TView>("Personal Information");

  const [ addVisaApplication, { data: addApplicationData, isLoading: isSubmitting, isError: submitIsError, error: submitError, isSuccess, reset } ] = action === "update" ? api.adminApis.useUpdateVisaApplicationMutation() : api.adminApis.useAddVisaApplicationMutation()
  const [ fetchVisaApplications, { data, isLoading, isError, error }] = api.adminApis.useLazyGetVisaApplicationsQuery();
  const selectedData = data?.data?.filter((each: any) => each?.visaApplicationId === id)[0];

  const [ formData, setFormData ] = useState(initialFormData);
  const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" })

  useEffect(() => {
    if (["view", "update"].includes(action as string)) {
      fetchVisaApplications("");
    }
  }, []);

  useEffect(() => {
    if (selectedData) {
      setFormData({ ...selectedData });
      setPhoneDetails({ ...extractCountryCodeAndNumber(selectedData?.phone) })
    };
  }, [ data ]);

  useEffect(() => {
    if(phoneDetails.number.startsWith("0")){
      setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number.slice(1, phoneDetails.number.length - 2)}`})
    } else {
      setFormData({ ...formData, phone: `+${phoneDetails.countryCode}${phoneDetails.number }`})
    }
  }, [ phoneDetails ]);

  /* Susessful Submission Effect */
  useEffect(() => {
    if (isSuccess) {
      if (action !== "update") {
        setFormData(initialFormData);
        setPhoneDetails({ ...phoneDetails, number: "" });
      } else {
        const exitPageTimeout = setTimeout(() => {
          cancelForm();
          clearTimeout(exitPageTimeout);
        }, 1000);
      }
    };
  }, [ isSuccess ]);

  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (isSuccess) reset();
  }

  const cancelForm = (): void => {
    router.back()
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addVisaApplication(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-col my-4">
        <button type="button" onClick={() => router.back()} className="text-stone-600 w-max hover:text-primary-red duration-300 flex font-medium flex-row items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Go Back
        </button>
        {
          action !== "view"
            && (
              <div className="flex flex-row items-center gap-3 mt-3 ml-auto">
                <LoadingButton loading={isSubmitting} successText="Sucessful" sucess={isSuccess} type="submit" className="rounded-md px-6 font-medium shadow-md py-1.5 bg-primary-red text-white">Save</LoadingButton>
                <button onClick={cancelForm} type="button" className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600">Cancel</button>
              </div>
            )
        }
      </section>
      <section className="">
        <div className="overflow-x-auto max-w-[calc(100vw-1.5rem)]">
          <ul className="grid grid-flow-col gap-x-[1vw] max-w-max">
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
          { currentView === "Personal Information" && <PersonalInformation formData={formData} handleInputChange={handleInputChange} isLoading={isLoading} phoneDetails={phoneDetails} setPhoneDetails={setPhoneDetails} /> }
        </div>
        <ErrorBlock error={submitError} className="w-full mt-4 max-w-screen-md" />
      </section>
    </form>
  )
}