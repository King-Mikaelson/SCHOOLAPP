"use client";

import Image from "next/image";
import { useState } from "react";
import langs from "@dictionaries/langs";
import { howWeWork } from "../data";

interface IProps {
  params: {
    lang: string;
  };
}

export default function Services({ params }: IProps) {
  const [ isViewed, setIsViewed ] = useState({
    index: 0,
    title: langs[params.lang as keyof typeof langs].services.steps[0].title,
    text: langs[params.lang as keyof typeof langs].services.steps[0].text
  });

  return (
    <section className="justify-center items-center flex flex-col px-16 md:py-12 max-md:px-5">
      <div className="content container overflow-hidden max-w-screen-xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] mt-[clamp(4rem,10%,6rem)] gap-y-[clamp(1rem,2vmax,4rem)] max-md:items-stretch max-md:gap-0">
          <h1 className="text-neutral-800 text-5xl font-semibold mt max-md:max-w-full max-md:text-4xl max-md:leading-10">
            {langs[params.lang as keyof typeof langs].services.heading}
          </h1>

          <div className="hidden lg:block" />

          <div className="flex flex-col z-[1] items-stretch max-w-lg max-md:w-full max-md:ml-0 mb-[clamp(2rem,4vmax,4rem)]">
            <div className="items-stretch z-[1] relative flex flex-col max-md:max-w-full max-md:mt-10">
              <div className="button-container flex flex-col py-2 mt-4 md:py-3 lg:py-4">
                {langs[params.lang as keyof typeof langs].services.steps.map((each: any, index: number) => (
                  <div
                    onClick={() => setIsViewed({ title: each.title, text: each.text, index })}
                    key={index}
                    className={`${isViewed.title === each.title ? " border-l-primary-red" : "border-l-neutral-200"} text-stone-600 border-l-2 [&[open]_summary_svg.opened]:hidden [&:not([open])_summary_svg.closed]:hidden hover:cursor-pointer select-none lg:rouded-lg px-4 py-2.5`}
                  >
                    <span className="[&::-webkit-details-marker]:hidden flex flex-row items-center text-lg font-meduim justify-between">
                      {each.title}
                    </span>
                    { isViewed.title === each.title && <div className="select-none font-light text-md rounded-md bg-white mt-3">{each.text}</div> }
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch z-[1] h-full">
            <figure className="image-container overflow-hidden relative h-full w-full">
              <Image fill className="object-cover object-center h-full w-auto" alt="tablet banner" src={`/images/home/services/${isViewed.index+1}.png`} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
