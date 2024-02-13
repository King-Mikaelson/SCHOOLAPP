"use client"

import { Dialog } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  modalOpen: boolean,
  setModalOpen :React.Dispatch<React.SetStateAction<boolean>>
}

export default function SuccessModal ({ modalOpen, setModalOpen }:TProps):JSX.Element {

  const handleModalClose = ():void =>{
    setModalOpen(false)
  }

  return(
    <Dialog 
        open={modalOpen}
        // style={{maxWidth: "1500px", backgroundColor: "red"}}
        className="[&>*>*]:p-3 lg:[&>*>*]:p-4 [&>*>*]:rounded-xl [&>*]:!backdrop-blur-[3px]"        
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {/* <button onClick={handleModalClose} className="" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}

          <li className="card min-h-[350px] snap-start snap-always h-full duration-300 min-w-[270px] max-w-[350px] grid grid-rows-[5fr_4fr] rounded-md overflow-hidden">
            <figure className="relative rounded-md overflow-hidden bg-test">
              <Image fill alt="success modal" className="object-cover object-center" src="/images/study-abroad/success-image.png" />
            </figure>

            <div className="self-end flex text-center flex-col gap-y-2 justify-between gap-1 bg-white">
              <h3 className="font-semibold text-md mt-2 mb-1 text-stone-600">Congratulations 🎉🎉🎉</h3>
              <p className="text-stone-500 text-sm">You have taken the first big step towards studying abroad by submitting your application to us. Keep an eye on your email as we process your application</p>
             
              <Link href={`/`} className="text-blue-500 mt-2 font-medium text-md">Go Home</Link>
            </div>
          </li>
    </Dialog>
  )
}