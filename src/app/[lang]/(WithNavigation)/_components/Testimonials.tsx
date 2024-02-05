"use client"

// Testimonials.js
import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import { testimonies } from "../data";
import langs from "@dictionaries/langs";
import { useRef } from "react";

interface IProps {
  params: {
    lang: string;
  };
}

export default function Testimonials({ params }: IProps) {
  const imageContainerRef = useRef<HTMLDivElement|null>(null);

  const scrollContainerBy = (value: number) => {
    // Check if the ref is defined
    if (imageContainerRef.current) {
      console.log("it exists")
      // Get the current scroll position
      const currentScrollLeft = imageContainerRef.current.scrollLeft;

      // Calculate the new scroll position
      const newScrollLeft = currentScrollLeft + value;

      // Scroll the container horizontally to the new position
      imageContainerRef.current.scrollBy({
        left: value,
        behavior: 'smooth', // You can use 'auto' for instant scrolling
      });
    }
  };
  // const dict = await getDictionary(params.lang);

  return (
    <div className="justify-center items-center bg-white flex flex-col px-16 md:py-12 max-md:px-5">
      <div className="w-full max-w-screen-xl mt-5 mb-5 max-md:max-w-full">
        <div className="gap-y-8 gap-x-[clamp(1rem,4vw,4rem)] grid grid-cols-[max-content_5fr] max-md:grid-cols-1">
          <div className="flex  flex-col max-w-lg items-stretch max-md:w-full max-md:ml-0">
            <div className="flex flex-col my-auto items-start max-md:max-w-full max-md:mt-10">
              <div className="text-black text-3xl lg:text-4xl font-semibold leading-10 tracking-tighter self-stretch max-md:max-w-full">
                {/* {dict.testimonials.heading} */}
                {langs[params.lang as keyof typeof langs].testimonials.heading}
              </div>
              <div className="text-neutral-600 text-md font-light lg:text-lg leading-7 self-stretch mt-6 max-md:max-w-full">
                {/* {dict.testimonials.description} */}
                {langs[params.lang as keyof typeof langs].testimonials.description}
              </div>
              <div className="items-stretch flex gap-2 mt-4">
                <button onClick={() => scrollContainerBy(-310)} className="justify-center items-center border-[color:var(--monochrome-white,#FFF)] bg-rose-100 flex aspect-square flex-col h-9 flex-1 px-2 rounded-lg border-0 border-solid">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="red" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>                  
                </button>
                <button onClick={() => scrollContainerBy(310)} className="justify-center items-center border-[color:var(--monochrome-white,#FFF)] bg-rose-100 flex aspect-square flex-col h-9 flex-1 px-2 rounded-lg border-0 border-solid">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="red" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={imageContainerRef} className="flex  snap-x snap-mandatory rounded-lg no-scrollbar flex-col overflow-y-auto items-stretch max-md:w-full max-md:ml-0">
            <ul  className="flex h-full  flex-row gap-2 md:gap-3 lg:gap-4">
              {
                testimonies.map((testimony: typeof testimonies[0], index: number) => (
                  <li className="card min-h-[400px] snap-start snap-always  p-2 h-full relative md:p-3 min-w-[300px] flex flex-row rounded-lg overflow-hidden">
                    {/* <figure className="relative bg-test top-0 right-0"> */}
                      <Image fill alt="testimony" className="object-cover object-center" src={testimony.image} />
                    {/* </figure> */}
                    <div />
                    <div className="p-3 z-[1] self-end h-[50%] flex flex-col justify-between gap-2 bg-stone-200/80 backdrop-blur-sm rounded">
                      <p className="leading-4 text-xs font-light overflow-ellipsis  overflow-hidden text-stone-700">{testimony.text}</p>
                      <span className="">
                        <h3 className="font-semibold text-sm">{testimony.name}</h3>
                        <p className=" font-normal text-sm text-stone-600 uppercase">{testimony.university}</p>
                      </span>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
