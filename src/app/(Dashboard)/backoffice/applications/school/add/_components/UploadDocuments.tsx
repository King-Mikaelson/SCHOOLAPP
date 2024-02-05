"use client";

import { FileUploader } from "react-drag-drop-files"
import { useEffect, useRef, useState } from "react";
import SuccessModal from "./SuccessModal";
import ViewDocumentModal from "@SharedComponents/ViewDocumentModal";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean,
  isSubmitting: boolean
  others: any
  waecResult: any
  aLevelResult: any
  passportPhoto: any
  waecScratchCard: any
  unofficialTranscript: any
}

export default function UploadSupportingDocuments({ formData, setFormData, isLoading, isSubmitting, others, waecResult, aLevelResult, passportPhoto, waecScratchCard, unofficialTranscript }: IProps) {
  const [ modalOpen, setModalOpen ] = useState<boolean>(true);
  const [ documentInView, setDocumentInView ] = useState({ name: "", url: "", isOpen: false })

  useEffect(() => {
    document.documentElement.scrollTo({ top: 150, behavior: "smooth" })
  }, [])

  const handleFileUpload = (selectedFile: any, fileName: string):void =>{
    console.log(selectedFile)
    setFormData({ ...formData, [fileName]: selectedFile })
  }

  console.log(formData);
  return (
    <section style={{ scrollBehavior: "smooth"}} className="[scroll-behaviour:smooth] ">
      <div className="items-start flex flex-col  rounded-xl max-md:px-4 max-w-screen-lg">
        {/* <h2 className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          Upload Supporting Documents
        </h2> */}

        <div className="uploads-container w-full my-6 flex flex-col gap-4">
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">PASSPORT PHOTO</h4>
            <FileUploader
              classes={`${formData?.passportPhoto && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "passportPhoto")} 
              onDrop={(e: any) => handleFileUpload(e, "passportPhoto")}
              name="file" 
              types={["PDF"]}
            />
            { formData?.suportingDocuments?.passportPhoto && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.passportPhoto?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
          </div>
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">WAEC RESULT</h4>
            <FileUploader
              classes={`${formData?.waecResult && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "waecResult")} 
              onDrop={(e: any) => handleFileUpload(e, "waecResult")}
              name="file" 
              types={["PDF"]}
            />
            { formData?.suportingDocuments?.waecResult && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.waecResult?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
          </div>
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">UNOFFICIAL TRANSCRIPT</h4>
            <FileUploader
              classes={`${formData?.unofficialTranscript && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "unofficialTranscript")} 
              onDrop={(e: any) => handleFileUpload(e, "unofficialTranscript")}
              name="file" 
              types={["PDF"]}
            />
            { formData?.suportingDocuments?.unofficialTranscript && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.unofficialTranscript?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
          </div>
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">WAEC SCRATCH CARD (OPTIONAL)</h4>
            <FileUploader
              classes={`${formData?.waecScratchCard && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "waecScratchCard")} 
              onDrop={(e: any) => handleFileUpload(e, "waecScratchCard")}
              name="file" 
              types={["PDF"]}
            />
            { formData?.suportingDocuments?.unofficialTranscript && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.unofficialTranscript?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
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
            { formData?.suportingDocuments?.aLevelResult && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.aLevelResult?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
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
            { formData?.suportingDocuments?.masterDegree && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.masterDegree?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
          </div> */}
          <div className="w-full relative">
            <h4 className="text-xs text-stone-600 uppercase">RESUME (optional)</h4>
            <FileUploader
              classes={`${formData?.others && "bg-green-100"} !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
              handleChange={(e: any) => handleFileUpload(e, "RESUME")} 
              onDrop={(e: any) => handleFileUpload(e, "RESUME")}
              name="file" 
              types={["PDF"]}
            />
            { formData?.suportingDocuments?.resume && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.resume?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
          </div>
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
                  { formData?.suportingDocuments?.others && <button onClick={() => setDocumentInView({ ...documentInView, url: formData?.suportingDocuments?.others?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
                </div>
               </>
              )
            }
            {
              formData?.suportingDocuments?.others && formData?.suportingDocuments?.others?.map((each: any, index: number) => (
                <div key={each?.content} className="w-full relative border-dashed border rounded-md border-neutral-400 p-4 h-[160px]">
                  <h4 className="text-xs text-stone-600 uppercase">SHOWING OTHER {index + 1}</h4>
                  {/* <FileUploader
                    classes={`!border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
                    // handleChange={(e: any) => handleFileUpload(e, "others")} 
                    // onDrop={(e: any) => handleFileUpload(e, "others")}
                    name="file" 
                    types={["PDF"]}
                  /> */}
                  { formData?.suportingDocuments?.others && <button onClick={() => setDocumentInView({ ...documentInView, url: each?.url, isOpen: true })} type="button" className="font-semibold bg-blue-500 text-white absolute bottom-[1px] right-[1px] rounded-br px-5 py-2">View</button> }
                </div>
              ))
            }
        </div>
        {
          !formData?.others
            && (
              <button type="button" onClick={() => setFormData({ ...formData, others: "^" })} className="flex flex-row items-center gap-3 mt-4">
                <input id="additionalDocuments" type="checkbox" checked={formData?.OTHER} className="" />
                <p className="text-xs text-stone-600 uppercase">UPLOAD ADDITIONAL DOCUMENTS</p>
              </button>
            )
        }

       
        {/* <div className="items-stretch self-stretch  flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400  text-sm flex  w-full md:basis-1/2 flex-col">
            <button onClick={() => handleContinue()} className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-8 px-16 py-3 rounded-lg self-start max-md:px-5">
              Submit Application
            </button>
          </label>
          <label htmlFor="" className="grow basis-1/2 w-full invisible" />
        </div> */}
       
      </div>
      {/* <SuccessModal setModalOpen={setModalOpen} modalOpen={modalOpen} /> */}
      <ViewDocumentModal modalOpen={documentInView} setModalOpen={setDocumentInView} />
    </section>
  )
}