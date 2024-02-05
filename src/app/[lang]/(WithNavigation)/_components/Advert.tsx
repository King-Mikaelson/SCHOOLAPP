"use client";
import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import langs from "@dictionaries/langs";

interface IProps {
  params: {
    lang: string;
  };
}

export default function Advert({ params }: IProps) {
  const pathname = usePathname();

  // const dict = await getDictionary(params.lang);

  return (
    <section className="flex-col overflow-hidden w-full relative flex min-h-[660px] justify-center px-16 py-12 items-center max-md:px-5">
      {/* <Image fill loading="lazy" className="object-cover" alt="banner" src="/images/home/VIDEO.png" /> */}
      <video className="absolute max-lg:h-full lg:w-full object-cover" autoPlay loop muted src="/images/home/video.mp4"></video>
      <div className="container mx-auto max-w-screen-xl flex justify-end w-full">
        <div className="flex-col relative overflow-hidden rounded-xl flex gap-3 min-h-[464px] w-[592px] max-w-full mt-2 mb-1.5 pl-6 pr-7 py-12 items-start max-md:px-5  after:bg-red-600 after:absolute after:left-0 after:h-full after:w-full after:top-[10%] after:skew-y-6 md:after:skew-y-[4deg] after:rounded-xl">
          <h2 className="relative z-[1] text-white text-4xl font-semibold leading-10 tracking-tighter self-stretch mt-[16%] max-md:max-w-full max-md:mt-10">
            {/* {dict.advert.heading} */}
            {langs[params.lang as keyof typeof langs].advert.heading}
          </h2>
          <div className="relative z-[1] text-white text-sm lg:text-md leading-6 self-stretch mt-2 max-md:max-w-full">
            {/* {dict.advert.description} */}
            {langs[params.lang as keyof typeof langs].advert.description}
          </div>
          <Link
            // onClick={(e) => e.currentTarget.scrollTo({ top: 0 })}
            href={`/${pathname.split("/")[1]}/study-abroad`}
            // href="#hero"
            className="relative z-[1] hover:bg-red-700 active:bg-red-500 duration-300 text-white text-center font-medium leading-6 whitespace-nowrap justify-center items-stretch border-[color:var(--monochrome-white,#FFF)] px-6 py-2 text-sm rounded-lg border-[1.5px] border-solid max-md:px-5"
            // aria-label={dict.advert.buttonText}
            arua-label={langs[params.lang as keyof typeof langs].advert.buttonText}
            aria-role="button"
          >
            {/* {dict.advert.buttonText} */}
            {langs[params.lang as keyof typeof langs].advert.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
