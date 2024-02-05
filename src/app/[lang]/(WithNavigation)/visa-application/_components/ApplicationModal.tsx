"use client"

import { Dialog, FormControl, MenuItem, Select } from "@mui/material";
import langs from "@dictionaries/langs"
import { useEffect, useState } from "react";
import api from "@redux/api";
import LoadingButton from "@SharedComponents/LoadingButton";
import { countryList } from "@SharedData/CountryList";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import Image from "next/image";
import SuccessModal from "./SuccessModal";

type TProps = {
  modalOpen: boolean,
  setModalOpen :React.Dispatch<React.SetStateAction<boolean>>
  params: {
    lang: string
  }
}

const initialFormData = {
  fullName: "", email: "", phone: "", nationality: "", destinationCountry: "", visaType: ""
};

export default function ApplicationModal ({ modalOpen, setModalOpen, params }:TProps):JSX.Element {
  const [ formData, setFormData ] = useState(initialFormData);
  const [ phoneDetails, setPhoneDetails ] = useState({ countryCode: String(countryList[170].phone), number: "" })

  const [ addVisaApplication, { data: addApplicationData, isLoading: isSubmitting, isError: submitIsError, error: submitError, isSuccess, reset } ] = api.adminApis.useAddVisaApplicationMutation()

  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (isSuccess) reset();
  }

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
      setFormData(initialFormData);
      setPhoneDetails({ ...phoneDetails, number: "" });
    };
  }, [ isSuccess ]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addVisaApplication(formData);
  }

  const handleModalClose = ():void => {
    reset();
    setModalOpen(false);
  }

  return(
    <Dialog
      open={modalOpen}
      className="[&>*>*]:p-4 animate-fade-in lg:[&>*>*]:p-5 xl:[&>*>*]:p-6 [&>*>*]:m-3 [&>*>*]:shadow-xl [&>*]:!backdrop-blur-[3px] [&>*>*]:w-[100%] [&>*>*]:rounded-xl"
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit} className="items-stretch flex flex-col my-auto max-md:max-w-full mt-1">
        <label htmlFor="fullName" className="grow basis-full">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].visa.modal.full_name}</p>
          <input id="fullName" name="fullName" value={formData.fullName} onChange={(e) => handleInputChange(e)} type="text" placeholder={langs[params.lang as keyof typeof langs].visa.modal.enter_name} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
        </label>

        <label htmlFor="email" className="grow basis-full mt-5">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].visa.modal.email_address}</p>
          <input id="name" name="email" value={formData.email} onChange={(e) => handleInputChange(e)} type="email" placeholder={langs[params.lang as keyof typeof langs].visa.modal.enter_email} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
        </label>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="email" className="grow basis-1/3">
            <p className="text-neutral-700 grow basis-full text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].visa.modal.mobile_number}</p>
            <span className="grid grid-cols-[max-content_3fr] gap-2">
              <FormControl fullWidth>
                <Select
                  itemID="location"
                  defaultValue="234"
                  className="[&>*]:!py-1.5 [&>*]:!px-2 [&>*]:!rounded-md mt-1 [&>*]:!flex [&>*]:!items-center !min-w-max placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                  value={phoneDetails.countryCode}
                  onChange={(e) => setPhoneDetails({ ...phoneDetails, countryCode: e.target.value })}
                >
                  <MenuItem className="!p-0 !hidden" value={10}>+234</MenuItem>
                  {
                    countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                      <MenuItem key={country.name} className="" value={country.phone}><Image className="mr-0.5" width={35} height={17} src={`/images/country-flag/${country?.code}.svg`} alt="flag" />({country.name?.slice(0,3)}) +{country.phone}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <input id="mobileNumber" value={phoneDetails.number} onChange={(e) => {setPhoneDetails({ ...phoneDetails, number: e.target.value.replace(/[^0-9]/ig, "") })}} name="mobileNumber" type="tel" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
            </span>
          </label>
        </div>

        <label htmlFor="nationality" className="text-neutral-400 text-sm flex mt-4 grow basis-1/2 flex-col">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].visa.modal.nationality}</p>
          <FormControl fullWidth>
            <Select
              itemID="nationality"
              defaultValue={formData.nationality || 10}
              className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
              name="nationality"
              value={formData?.nationality}
              onChange={handleInputChange}
            >
              <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].visa.modal.select_country}</MenuItem>
              {
                countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                  <MenuItem key={index} value={country.code}>{country?.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </label>

        <label htmlFor="destinationCountry" className="text-neutral-400 text-sm flex mt-4 grow basis-1/2 flex-col">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].visa.modal.travel_destination}</p>
          <FormControl fullWidth>
            <Select
              itemID="destinationCountry"
              defaultValue={formData.destinationCountry || 10}
              className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
              name="destinationCountry"
              value={formData?.destinationCountry}
              onChange={handleInputChange}
            >
              <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].visa.modal.select_country}</MenuItem>
              {
                countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                  <MenuItem key={index} value={country.code}>{country?.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </label>

        <label htmlFor="location" className="text-neutral-400 text-sm flex mt-4 grow basis-1/2 flex-col">
          <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].visa.modal.reason_for_travel}</p>
          <FormControl fullWidth>
            <Select
              itemID="location"
              defaultValue={formData.visaType || 10}
              className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
              name="visaType"
              value={formData?.visaType}
              onChange={handleInputChange}
            >
              <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].visa.modal.visa_type}</MenuItem>
              <MenuItem className="" value={`TOURIST_VISA`}>Tourism</MenuItem>
              <MenuItem className="" value={`SCHOOL_VISA`}>School</MenuItem>
              <MenuItem className="" value={`WORK_VISA`}>Work</MenuItem>
              <MenuItem className="" value={`OTHER`}>Other</MenuItem>
            </Select>
          </FormControl>
        </label>

        <ErrorBlock error={submitError} className="w-full mt-4" />

        <label htmlFor="name" className="grow mt-4 basis-full">
          <LoadingButton loading={isSubmitting} sucess={isSuccess} successText="Sucessful!" type="submit" className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-5 px-16 py-3 rounded-lg self-start max-md:px-5">
            {langs[params.lang as keyof typeof langs].visa.modal.submit_application}
          </LoadingButton>
        </label>
      </form>
      <SuccessModal reset={reset} modalOpen={isSuccess} handleParentModalClose={handleModalClose} params={params} />
    </Dialog>
  )
}