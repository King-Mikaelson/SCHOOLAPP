// AboutUs.js
import Image from "next/image";
import { getDictionary } from "../../dictionaries";

interface IProps {
  params: {
    lang: string
  }
}

export default async function AboutUs({ params }: IProps) {
  const dict = await getDictionary(params.lang)

  return (
    <section className="justify-center items-center bg-white flex flex-col px-16 py-6 lg:py-12 max-md:px-5">
      <div className="w-full max-w-[1216px] mt-5 mb-6 max-md:max-w-full">
        <div className="gap-5 grid grid-cols-1 md:grid-cols-[1fr_1fr]">
          <div className="flex flex-col max-w-lg items-stretch max-md:w-full max-md:ml-0">
            <div className="flex flex-col py-8 items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <h2 className="text-black text-4xl font-semibold leading-10 tracking-tight max-md:max-w-full">
                {dict.aboutUs.heading}
              </h2>
              <div className="text-neutral-700 font-light text-md lg:text-lg leading-7 tracking-wide mt-6 max-md:max-w-full">
                {dict.aboutUs.description}
              </div>
            </div>
          </div>
          <figure className="flex relative w-full aspect-[2/1.5] h-full overflow-hidden rounded-lg flex-col max-h-[60vh] my-auto items-center ml-5 max-md:w-full max-md:ml-0">
            <Image fill loading="lazy" alt="managers" src="/images/home/managers.png"className="object-cover object-center w-full max-md:max-w-full" />
          </figure>
        </div>
      </div>
    </section>
  );
}
