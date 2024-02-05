"use client";
import api from "@redux/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  params: { lang: string, programId: string }
}

export default function ProgramDetailsLoader({ params }: IProps) {
  const router = useRouter();

  const{ isLoading, data } = api.adminApis.useClientGetSchoolsQuery("")
  const selectedData = data?.data?.filter((each: any) => each?.schoolId === params?.programId)[0];
  console.log(selectedData)

  return (
    <main className="bg-white h-screen relative z-[-3] flex flex-col justify-center items-center mb-[4vmin]">
      <div className="w-max z-[-2] h-auto aspect-square relative flex items-center justify-center p-3">
        <div className="absolute p-3 z-[-1] flex animate-spin bg-primary-red h-full w-full aspect-square rounded-full after:w-[98%] after:h-[98%] after:bg-white after:absolute after:my-auto after:mx-auto after:rounded-full after:top-0 after:bottom-0 after:left-0 after:right-0" style={{ background: "conic-gradient(#FF4512 0.55% 50.08%, #eef2ff 60.08% 200.68%)"}}>

        </div>
        <Image width={300}  height={100} src="/images/logo-and-text.svg" alt="logo" className="animate-none z-[8] my-auto top-0 bottom-0" />
      </div>
    </main>
  );
}


