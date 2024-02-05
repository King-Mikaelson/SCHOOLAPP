import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

type TProps = {
  modalOpen: { name: string, url: string, isOpen: boolean},
  setModalOpen: React.Dispatch<React.SetStateAction<{ name: string, url: string, isOpen: boolean }>>,
}

export default function ViewDocumentModal ({ modalOpen, setModalOpen }:TProps):JSX.Element {

  const handleModalClose = ():void =>{
    setModalOpen({ ...modalOpen, isOpen: false })
  }

  console.log(modalOpen);

  return(
      <Dialog 
        open={modalOpen.isOpen}
        // style={{maxWidth: "1500px", backgroundColor: "red"}}
        className="[&>div>div]:!max-w-[900px] [&>div>div]:w-full relative min-h-[60vh]"        
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >


        {/*==========================*/}
        {/* Button For Closing Modal */}
        {/*==========================*/}
        <button onClick={handleModalClose} className="absolute top-3 right-3" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={`  h-full`}>
          {/* <h2 className="capitalize p-l-20 p-r-20">{modalOpen?.name?.replace(/_/ig, " ").toLowerCase()}</h2> */}
          {/* <iframe className="fullwidth fullheight" sandbox="allow-same-origin allow-scripts" style={{ height: "calc(70vh - 120px)"}} src={modalOpen.url} frameBorder={0}></iframe> */}
          <object className="h-full w-full" style={{ height: "calc(70vh - 120px)"}} width="100%" height="725"  data={modalOpen.url} type="application/pdf"></object>
        </div>
    </Dialog>
  )
}