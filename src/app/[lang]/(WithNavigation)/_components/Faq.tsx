
import { getDictionary } from "../../dictionaries";

interface IProps {
  params: {
    lang: string;
  };
}

export default async function FAQ({ params }: IProps) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="justify-center items-center bg-white flex flex-col px-16 py-12 max-md:px-5">
      <div className="flex w-[800px] max-w-full flex-col mt-4 mb-1.5">
        <div className="text-black text-center text-4xl font-semibold leading-10 tracking-tighter self-center max-w-[520px] max-md:max-w-full">
          {dict.faq.heading}
        </div>
        <div className="self-center text-neutral-600 text-center text-sm md:text-md leading-5 max-w-[520px] mt-5 max-md:max-w-full">
          {dict.faq.subheading}
        </div>
        <div className="items-stretch gap-2 flex flex-col justify-center mt-8 rounded-lg border-solid max-md:max-w-full">
          {dict.faq.details.map((each, index) => (
            <details key={index} className="[&[open]_summary_svg.opened]:hidden [&:not([open])_summary_svg.closed]:hidden rounded-md text-neutral-700 lg:rouded-lg xl:rounded-xl border border-sky-200 p-3 lg:p-4">
              <summary className="[&::-webkit-details-marker]:hidden cursor-pointer flex outline-none flex-row items-center text-lg font-medium justify-between">
                <span className="">{each.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 opened">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7 closed">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </summary>
              <div className="p-3 rounded-md bg-stone-50 mt-3">
                {each.text}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
