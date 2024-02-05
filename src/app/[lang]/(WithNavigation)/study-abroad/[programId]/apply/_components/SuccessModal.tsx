"use client"

import { Dialog } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import en from "../../../../../dictionaries/en.json"
import fr from "../../../../../dictionaries/fr.json"
import langs from "@dictionaries/langs";

type TProps = {
  modalOpen: boolean,
  reset: () => void
  params: {
    lang: string
  }
}

export default function SuccessModal ({ modalOpen, reset, params }:TProps):JSX.Element {

  const handleModalClose = ():void =>{
    reset()
  }

  return(
    <Dialog
      open={modalOpen}
      className="[&>*>*]:p-3 lg:[&>*>*]:p-4 [&>*>*]:rounded-xl [&>*]:!backdrop-blur-[3px]"
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <li className="card min-h-[350px] snap-start snap-always h-full duration-300 min-w-[270px] max-w-[350px] grid grid-rows-[5fr_4fr] rounded-md overflow-hidden">
        <figure className="relative rounded-md overflow-hiddent">
          <Image fill alt="success modal" loading="lazy" className="object-cover object-center" src="/images/study-abroad/success-image.png" />
        </figure>

        <div className="self-end flex text-center flex-col gap-y-2 justify-between gap-1 bg-white">
          <h3 className="font-semibold text-md mt-2 mb-1 text-stone-600">{langs[params.lang as keyof typeof langs].successModal.title}</h3>
          <p className="text-stone-500 text-sm">{langs[params.lang as keyof typeof langs].successModal.content}</p>

          <Link href={`/`} className="text-blue-500 mt-2 font-medium text-md">{langs[params.lang as keyof typeof langs].successModal.goHomeLink}</Link>
        </div>
      </li>
    </Dialog>
  )
}