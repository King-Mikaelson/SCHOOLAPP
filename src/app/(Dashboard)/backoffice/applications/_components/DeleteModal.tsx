"use client"

import LoadingButton from "@SharedComponents/LoadingButton";
import { Dialog } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type TProps = {
  modalOpen: boolean,
  setModalOpen :React.Dispatch<React.SetStateAction<boolean>>
  itemToDelete: { id: string, name: string }
  handleDelete: (id: string) => void
  loading: boolean
  reset: () => void
  isSucessful?: boolean
}

export default function DeleteModal ({ modalOpen, setModalOpen, itemToDelete, handleDelete, loading, isSucessful, reset }:TProps):JSX.Element {

  const handleModalClose = ():void => {
    reset()
    setModalOpen(false)
  }

  useEffect(() => {
    if (isSucessful) {
      const timeout = setTimeout(() => {
        handleModalClose();
        clearTimeout(timeout);
      }, 1000);
    }
  }, [ isSucessful ])

  return(
    <Dialog 
      open={modalOpen}
      className="[&>*>*]:p-3 lg:[&>*>*]:p-4 [&>*>*]:rounded-xl [&>*]:!backdrop-blur-[3px]"        
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <button onClick={handleModalClose} className="ml-auto" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

        <div className="card min-h-[350px] snap-start snap-always h-full duration-300 min-w-[270px] max-w-[350px] grid grid-rows-[5fr_4fr] rounded-md overflow-hidden">
          {/* <figure className="relative rounded-md overflow-hidden bg-test">
            <Image fill alt="success modal" className="object-cover object-center" src="/images/study-abroad/success-image.png" />
          </figure> */}

          <div className="self-end flex text-center flex-col gap-y-2 justify-between gap-1 bg-white">
            <h3 className="font-semibold text-md mt-2 mb-1 text-stone-600">Attention</h3>
            <p className="text-stone-500 text-sm">Are you sure you want to delete {itemToDelete?.name}?</p>
            
            <LoadingButton onClick={() => handleDelete(itemToDelete.id)} loading={loading} sucess={isSucessful} successText="Sucessful!" className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-5 px-16 py-3 rounded-lg self-start max-md:px-5">
              Delete
            </LoadingButton>
          </div>
        </div>
    </Dialog>
  )
}