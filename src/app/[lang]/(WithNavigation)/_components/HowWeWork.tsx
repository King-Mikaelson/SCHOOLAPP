"use client";

import Image from "next/image";
import { howWeWork } from "../data";
import { getDictionary } from "../../dictionaries";
import langs from "../../dictionaries/langs";
import { useState } from "react";
import StudyAbroad from "../study-abroad/page";
import VisaApplication from "../visa-application/page";

interface IProps {
  params: {
    lang: string;
  };
}

export default function HowWeWork({ params }: IProps) {
  const [ isViewed, setIsViewed ] = useState({
    index: 0,
    title: langs[params.lang as keyof typeof langs].howWeWork.steps[0].title,
    text: langs[params.lang as keyof typeof langs].howWeWork.steps[0].text
  });

  return (
    <section className="justify-center items-center flex flex-col py-12 max-md:px-5">
      <div className="content overflow-hidden max-w-screen-xl h-full mx-auto relative after:bg-[#0469D4] after:absolute after:h-full after:w-full after:top-[50px] after:skew-y-6 md:after:skew-y-[4deg]">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] mt-[clamp(4rem,10%,6rem)] gap-y-[clamp(1rem,2vmax,4rem)] max-md:items-stretch max-md:gap-0">
          <h1 className="text-white hidden lg:block px-[clamp(1rem,2.5vmax,4rem)] z-[1] tracking-wide text-5xl font-semibold leading-10 whitespace-nowrap mt max-md:max-w-full max-md:text-4xl max-md:leading-10">
            {langs[params.lang as keyof typeof langs].howWeWork.heading}
          </h1>

          <div className="hidden lg:block" />

          <div className="flex flex-col z-[1] px-[clamp(1rem,2.5vmax,4rem)] items-stretch max-md:w-full max-md:ml-0 mb-[clamp(2rem,4vmax,4rem)]">
            <div className="items-stretch z-[1] relative flex flex-col max-md:max-w-full max-md:mt-10">
              {/* <div className="input-container mt-8 md:mt-10 bg-white rounded-lg p-4">
                <h2 className="text-2xl test-slate-700 text-[1.3rem] font-medium leading-7 tracking-tight whitespace-nowrap">
                  {isViewed.title}
                </h2>
                <p className="text-slate-500 tracking-wide text-sm leading-5 mt-3">
                  {isViewed.text}
                </p>
              </div> */}
              <div className="button-container flex flex-col py-2 mt-4 md:py-3 lg:py-4 gap-3 lg:gap-4">
                {langs[params.lang as keyof typeof langs].howWeWork.steps.map((each: typeof howWeWork[0], index: number) => (
                  <div
                    onClick={() => setIsViewed({ title: each.title, text: each.text, index })}
                    key={index}
                    // className={`${isViewed.title === each.title ? "bg-white text-stone-600" : "text-white bg-transparent max-h-[60px]"} [&_*]:animate-none flex flex-col group  hover:max-h-full hover:bg-white hover:text-stone-600 transition-all !duration-500 [&[open]_summary_svg.opened]:hidden [&:not([open])_summary_svg.closed]:hidden hover:cursor-pointer select-none lg:rouded-lg rounded-xl border border-white p-4`}
                    className={`${isViewed.title === each.title ? "bg-white text-stone-600" : "text-white bg-transparent max-h-[60px]"} [&_*]:animate-none flex flex-col group hover:bg-white hover:text-stone-600 transition-all !duration-500 [&[open]_summary_svg.opened]:hidden [&:not([open])_summary_svg.closed]:hidden hover:cursor-pointer select-none lg:rouded-lg rounded-xl border border-white p-4`}
                    // className={`select-none text-white lg:rouded-lg rounded-xl border border-white p-4`}
                  >
                    <span className="[&::-webkit-details-marker]:hidden flex flex-row items-center text-lg font-semibold justify-between">
                      <span className="">{each.title}</span>
                      {
                        isViewed.title !== each.title
                          ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                              className="w-6 h-6 opened"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-7 h-7 closed text-white"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                              </svg>
                          )
                      }
                    </span>
                    {/* { isViewed.title === each.title && <div className="select-none rounded-md bg-white mt-3">{each.text}</div> } */}
                   <div className={`${isViewed.title === each.title ? "max-h-full mt-2" : "group-hover:max-h-full"} select-none group-hover:max-h-full max-h-0 duration-500 overflow-hidden rounded-md bg-white group-hover:mt-2`}>{each.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch z-[1] h-full">
            {/* <div className="bg-white  w-[1000px] h-full rounded-xl [transform:rotateY(-5deg)rotateX(2deg)] max-h-[500px] overflow-hidden">
              <StudyAbroad params={params} />
              <VisaApplication params={params} />
            </div> */}
            <figure className="image-containe translate-x-[4vw] overflow-hidden relative h-auto aspect-[1.5/1] w-full">
              <Image fill className="object-contain object-left-top  w-full h-auto" alt="tablet banner" src={`/images/home/how-we-work/${isViewed.index+1}.png`} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
