"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { FileUploader } from "react-drag-drop-files"
import { IFormData } from "../page";
import { useEffect, useRef, useState } from "react";
import SuccessModal from "./SuccessModal";
import en from "../../../../../dictionaries/en.json"
import fr from "../../../../../dictionaries/fr.json"
import LoadingButton from "@SharedComponents/LoadingButton";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import langs from "@dictionaries/langs";

interface IProps {
  setFormSection: React.Dispatch<React.SetStateAction<number>>
  formSection: number
  formData: any 
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isSubmitting: boolean
  reset: () => void
  submitSuccess: boolean
  submitError: any
  params: {
    lang: string
  }
}

export default function UploadSupportingDocuments({ setFormSection, formSection, formData, setFormData, isSubmitting, submitSuccess, submitError, reset, params }: IProps) {

  const returnDiction = (arg: keyof typeof langs.en.uploadSupportDocuments): any => {
    return langs[params.lang as keyof typeof langs].uploadSupportDocuments[arg]
  }

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, [])

  const handleFileUpload = (selectedFile: any, fileName: string):void =>{
    setFormData({ ...formData, [fileName]: selectedFile })
  }

  console.log(formData);
  return (
    <section  style={{ scrollBehavior: "smooth"}} className="[scroll-behaviour:smooth] ">
      <div className="items-start mx-auto bg-white shadow-md flex flex-col px-6 py-7 rounded-xl max-md:px-4 max-w-screen-lg">
        <h2 className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          {returnDiction("title")}
        </h2>

        <div className="uploads-container w-full my-6 flex flex-col gap-4">
          <div className="w-full">
            <h4 className="text-xs text-stone-600 uppercase">{returnDiction("passportPhoto")}</h4>
            <FileUploader
              classes={`${formData?.passportPhoto && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "passportPhoto")} 
              onDrop={(e: any) => handleFileUpload(e, "passportPhoto")}
              name="file" 
              types={["PDF", "DOC", "DOCX"]}
            />   
          </div>
          <div className="w-full">
            <h4 className="text-xs text-stone-600 uppercase">WAEC {returnDiction("result")}</h4>
            <FileUploader
              classes={`${formData?.waecResult && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "waecResult")} 
              onDrop={(e: any) => handleFileUpload(e, "waecResult")}
              name="file" 
              types={["PDF", "DOC", "DOCX"]}
            />   
          </div>
          <div className="w-full">
            <h4 className="text-xs text-stone-600 uppercase">{returnDiction("unofficialTranscript")}</h4>
            <FileUploader
              classes={`${formData?.unofficialTranscript && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "unofficialTranscript")} 
              onDrop={(e: any) => handleFileUpload(e, "unofficialTranscript")}
              name="file" 
              types={["PDF", "DOC", "DOCX"]}
            />   
          </div>
          <div className="w-full">
            <h4 className="text-xs text-stone-600 uppercase">WAEC {returnDiction("scratchCard")} (OPTIONAL)</h4>
            <FileUploader
              classes={`${formData?.waecScratchCard && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "waecScratchCard")} 
              onDrop={(e: any) => handleFileUpload(e, "waecScratchCard")}
              name="file" 
              types={["PDF", "DOC", "DOCX"]}
            />   
          </div>
          
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">A-LEVEL RESULT (OPTIONAL)</h4>
            <FileUploader
              classes={`${formData?.aLevelResult && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "aLevelResult")} 
              onDrop={(e: any) => handleFileUpload(e, "aLevelResult")}
              name="file" 
              types={["PDF"]}
            />   
          </div>
          {/* <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">BACHELOR&amp;S DEGREE</h4>
            <FileUploader
              classes={`${formData?.BACHELOR_DEGREE && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "BACHELOR_DEGREE")} 
              onDrop={(e: any) => handleFileUpload(e, "BACHELOR_DEGREE")}
              name="file" 
              types={["PDF"]}
            />   
          </div>
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">MASTER&amp;S DEGREE</h4>
            <FileUploader
              classes={`${formData?.MASTER_DEGREE && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "MASTER_DEGREE")} 
              onDrop={(e: any) => handleFileUpload(e, "MASTER_DEGREE")}
              name="file" 
              types={["PDF"]}
            />   
          </div> */}
          {/* <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">RESUME (optional)</h4>
            <FileUploader
              classes={`${formData?.RESUME && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "RESUME")} 
              onDrop={(e: any) => handleFileUpload(e, "RESUME")}
              name="file" 
              types={["PDF"]}
            />   
          </div> */}
          {
            formData?.others
              && (
                <>
                  
                  <div className="w-full relative">
                    <h4 className="text-xs text-stone-600 uppercase">OTHER</h4>
                    <FileUploader
                      classes={`${formData?.others !== "^" && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
                      handleChange={(e: any) => handleFileUpload(e, "others")} 
                      onDrop={(e: any) => handleFileUpload(e, "others")}
                      name="file" 
                      types={["PDF"]}
                    />   
                  </div>
                </>
              )
          }
        </div>       
        {
          !formData?.others
            && (
              <button type="button" onClick={() => setFormData({ ...formData, others: "^" })} className="flex flex-row items-center gap-3 mt-4">
                <input id="additionalDocuments" type="checkbox" checked={formData?.OTHER} className="" />
                <p className="text-xs text-stone-600 uppercase">{returnDiction("uploadDocuments")}</p>
              </button>
            )
        }
        {/* <label htmlFor="additionalDocuments" className="flex flex-row items-center gap-3 mt-4">
          <input id="additionalDocuments" type="checkbox" className="" />
          <p className="text-xs text-stone-600 uppercase">{returnDiction("uploadDocuments")}</p>
        </label> */}
       
        <ErrorBlock error={submitError} className="w-full mt-4" />

        <div className="items-stretch self-stretch  flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400  text-sm flex  w-full md:basis-1/2 flex-col">
            <LoadingButton loading={isSubmitting} sucess={submitSuccess} successText="Sucessful!" type="submit" className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-8 px-16 py-3 rounded-lg self-start max-md:px-5">
              {returnDiction("submitApplication")}
            </LoadingButton>
          </label>
          <label htmlFor="" className="grow basis-1/2 w-full invisible" />
        </div>
       
      </div>
      <SuccessModal reset={reset} modalOpen={submitSuccess} params={params} />
    </section>
  )
}