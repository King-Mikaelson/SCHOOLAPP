"use client";

import Image from "next/image";
import Link from "next/link";
import langs from "@dictionaries/langs"
import { usePathname } from "next/navigation";


interface IProps {
  params: {
    lang: string
  }
}
export default function Footer({ params }: IProps) {
  const pathname = usePathname();

  const returnDiction = (arg: keyof typeof langs.en.footer): any => {
    return langs[params.lang as keyof typeof langs].footer[arg]
  }

  return (
    <footer className="bg-[#0469D4] flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <div className="flex w-full max-w-[1216px] flex-col items-stretch my-1.5 max-md:max-w-full">
        <div className="border-b-slate-300 pb-3 border-b-[0.5px] border-solid max-md:max-w-full">
          <div className="grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-[1fr_1.7fr_1fr]">

            <div className="flex flex-col order-2 col-span-2  md:col-span-1 lg:order-1">
              <div className="items-start h-full border-none md:border-r-slate-300 flex flex-col py-3 border-r-[0.5px] md:border-solid max-md:mt-10">
                <figure className="relative h-10 -ml-2 w-32 flex justify-start">
                  <Image loading="lazy" fill alt="Logo" className="object-contain left-0" src="/images/logo-and-text.png" />
                </figure>
                {/* <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c91d410ebae8601ee531e92c5a7b26e02e0c1f3bfc324e9c43603b6ea454fe4?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"className="aspect-[5.19] object-contain object-center w-[280px] overflow-hidden self-center"
                /> */}
                <Link href={`/${pathname.split("/")[1]}/study-abroad`} className="text-white text-left text-base font-medium leading-6 self-stretch whitespace-nowrap mt-5">
                  {returnDiction("studyAbroad")}
                </Link>
                <Link href={`/${pathname.split("/")[1]}/visa-application`} className="text-white text-left text-base font-medium leading-6 self-stretch whitespace-nowrap mt-5">
                  {returnDiction("applyForVisa")}
                </Link>
                <Link href={`/${pathname.split("/")[1]}/book-flight`} className="text-white text-left text-base font-medium leading-6 self-stretch whitespace-nowrap mt-5">
                  {returnDiction("bookFlight")}
                </Link>
                <Link href={`/${pathname.split("/")[1]}/contact-us`} className="text-white text-left text-base font-medium leading-6 self-stretch whitespace-nowrap mt-5">
                  {returnDiction("contactUs")}
                </Link>
                <Link href={`/${pathname.split("/")[1]}/book-consultation`} className="text-white text-left text-base font-medium leading-6 self-stretch whitespace-nowrap mt-5">
                  {returnDiction("bookFreeConsultation")}
                </Link>

                <div className="items-stretch flex gap-5 mt-6 pr-20 max-md:pr-5">
                  <Link target="_blank" rel="no-referrer" href="https://www.instagram.com/gtwhubb">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/633fa3225b5e9c5907558882faa3d2ad8c4320eeb23344142fd8625c66cfd0e8?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                    />
                  </Link>
                  <Link target="_blank" rel="no-referrer" href="https://www.facebook.com/GTWHUB">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d145a965c0714cbb38c7630751ecfd6df9eaa1489d7d4bf219195fae05b5444d?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                    />
                  </Link>
                  <Link target="_blank" rel="no-referrer" href="https://x.com/gtwhub">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a665bc76b8a742c6af2bd5014c4b214afb3a556b25c333574bacadabd4555083?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-3 lg:mb-0 order-1 col-span-2 lg:order-2 lg:col-span-1 ml-5">
              <div className="items-stretch flex flex-col my-auto max-md:max-w-full max-md:mt-10">
                <div className="text-white text-center text-5xl font-semibold tracking-tighter max-md:max-w-full max-md:text-4xl max-md:leading-10">
                  {returnDiction("catchCaption")}
                </div>
                <Link href={`/${pathname.split("/")[1]}/study-abroad`} className="text-white text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch  hover:bg-red-400 bg-[#FF4512] active:bg-red-600 duration-300 self-center mt-6 px-5 py-3.5 rounded-md">
                  {returnDiction("findYourPreferredProgram")}
                </Link>
              </div>
            </div>

            <div className="flex flex-col order-3 items-stretch">
              <div className="items-stretch text-slate-200 text-md font-light border-none md:border-l-slate-300 flex flex-col md:pl-4 pt-3 pb-12 border-l-[0.5px] md:border-solid max-md:mt-10">
                <div className=" text-left md:text-right leading-6 justify-center items-stretch border-[color:var(--grey-100,#FAFAFA)] pb-3 border-0 border-solid">
                  Abuja, Nigeria
                  <br />
                  ANON Plaza BS, Second Floor
                  <br />
                  Plot 1085 Joseph Gomwalk Way, Gudu, Abuja Opposite Ajuji Hotel
                  <br />
                  +2347039978563
                </div>
                <div className="text-left md:text-right leading-6 justify-center items-stretch border-[color:var(--grey-100,#FAFAFA)] mt-4 mb-3.5 pb-3 border-0 border-solid">
                  Owerri, Nigeria
                  <br />
                  Silas PlazaLevel 2, Unit 7, KM 6 Owerri-Orlu RoadOwerri, Imo State (After Akwakuma Junction)
                  <br />
                  +2347031918634
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-center text-sm leading-5 self-center whitespace-nowrap mt-7">
        {returnDiction("rightsReserved")}
      </div>
      {/* <div className="items-stretch self-center flex gap-3 mt-1.5">
        <a href="#" className="text-white text-center text-sm leading-5 whitespace-nowrap">
        {returnDiction("termsAndConditions")}
        </a>
        <a href="#" className="text-white text-center text-sm leading-5 whitespace-nowrap">
          {returnDiction("privacyPolicy")}
        </a>
      </div> */}
  </footer>
  );
}