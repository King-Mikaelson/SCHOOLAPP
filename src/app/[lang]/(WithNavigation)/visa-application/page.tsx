"use client";

// VisaApplication.js
import { useEffect, useState } from "react";
import ApplicationModal from "./_components/ApplicationModal";
import Image from "next/image";
import langs from "@dictionaries/langs"

interface IProps {
  params: {
    lang: string;
  };
}
export default function VisaApplication({ params }: IProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const totalImages = 2;
      setCurrentImage((prevImage) => (prevImage % totalImages) + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="items-stretch bg-white flex flex-col pb-12 min-h-[calc(100vh-80px)] animate-fade-in">
      <section className="self-center w-full lg:container 2xl:max-w-screen-2xl mt-[clamp(8rem,6%,13rem)] mb-24 max-md:max-w-full max-md:my-10">
        <div className="gap-5 flex px-5 items-center  max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[53%] max-md:w-full max-md:ml-0   duration-700">
            <div className="flex flex-col max-md:max-w-full max-md:mt-10">
              <h1 className="text-zinc-800 text-[clamp(20px,5vw,70px)] max-w-[700px] font-semibold leading-[50px] lg:leading-[63px] xl:leading-[72px] self-stretch max-md:max-w-full max-md:text-4xl">
                {langs[params.lang as keyof typeof langs].visa.heading}
              </h1>
              <p className="text-zinc-600 text-lg leading-7 self-stretch mt-5 max-md:max-w-full">
                {langs[params.lang as keyof typeof langs].visa.description}
              </p>
              <div className="items-stretch self-stretch flex justify-between gap-2 mt-8 max-md:max-w-full">
                <figure className="relative aspect-[2.8] object-contain object-center w-28 items-start overflow-hidden shrink-0 max-w-ful">
                  <Image
                    fill
                    loading="lazy"
                    src="/images/visa-application/countries-flag.svg"
                    className=""
                    alt="Visa Countries"
                  />
                </figure>
                <p className="text-neutral-600 text-xs leading-4 self-center grow shrink basis-auto my-auto max-md:max-w-full">
                  {langs[params.lang as keyof typeof langs].visa.countries}
                </p>
              </div>
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                type="submit"
                className="text-white mt-10 text-center mx-auto md:mx-0 hover:bg-red-400 bg-primary-red active:bg-red-600 duration-300 text-base font-medium leading-6 whitespace-nowrap justify-center items-center max-w-full px-16 py-3 rounded-lg self-start max-md:px-5"
              >
                {langs[params.lang as keyof typeof langs].visa.startApplication}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[47%] ml-5 max-md:w-full max-md:ml-0   duration-1000">
            <figure className="relative aspect-square object-contain object-center w-full overflow-hidden max-md:max-w-full max-md:mt-10">
              {[1, 2].map((imageNumber) => (
                <Image
                  key={imageNumber}
                  fill
                  loading="lazy"
                  src={`/images/visa-application/${currentImage}.png`}
                  className={` absolute top-0 left-0 opacity-${currentImage === imageNumber ? '100' : '0'} transition-opacity duration-1000`}
                  alt="Visa Application"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              ))}
            </figure>
          </div>
        </div>
      </section>
      <ApplicationModal modalOpen={isApplicationModalOpen} setModalOpen={setIsApplicationModalOpen} params={params} />
    </div>
  );
}
