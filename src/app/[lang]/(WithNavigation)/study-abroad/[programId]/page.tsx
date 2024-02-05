"use client";
import api from "@redux/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { schoolInformationInitialState } from "../../../../(Dashboard)/backoffice/schools/add/data";
import { splitInThousand } from "@utils/miscelaneous";

interface IProps {
  params: { lang: string, programId: string }
}

export default function ProgramDetails({ params }: IProps) {
  const router = useRouter();

  const [ isSchoolDetailsTruncated, setIsSchoolDetailsTruncated ] = useState<boolean>(true);

  const objectState = { ...schoolInformationInitialState, images: [ { url: "" }]}
  const [ triggerGetSchools, { isLoading, data }] = api.adminApis.useLazyClientGetSchoolsQuery();
  const selectedData: typeof objectState = data?.data?.filter((each: any) => each?.schoolId === params?.programId)[0];
  // let selectedData: typeof objectState = objectState;

  useEffect(() => {
    if (!data && params.programId) {
      triggerGetSchools("");
    }
  }, [ selectedData, params ]);

  console.log(selectedData);

  return (
    <main className="bg-white flex flex-col justify-center items-center mb-[4vmin] animate-fade-in">

      <section className={`${ selectedData ? "after:bg-black/50": "bg-neutral-200 animate-pulse"} flex-col w-full relative overflow-hidden flex min-h-[491px] justify-center px-3 py-12 items-start  after:absolute after:top-0 after:left-0 after:h-full after:w-full`}>
        <div className=""></div>
        <Image fill src={selectedData?.images[0]?.url} alt="university" loading="lazy"  className="absol ute h-full w-full object-cover object-center inset-0" />
        {/* <Image fill src="/images/home/hero.png" alt="university" loading="lazy"  className="absolute h-full w-full object-cover object-center inset-0" /> */}
        <div className="relative flex z-[1] flex-col md:ml-[1vmax] items-stretch  mt-64 mb-1 max-md:max-w-full max-md:mt-30">
          <h2 className="text-white text-6xl font-semibold leading-[56px] tracking-tighter whitespace-nowrap max-md:max-w-full max-sm:text-4xl max-lg:text-5xl max-md:leading-10" aria-label="University Name">
            {/* The University of Hong Kong */}
            {selectedData?.info?.name}
          </h2>
          <h3 className="text-white capitalize break-word text-5xl font-medium leading-10 tracking-tighter mt-5 max-md:max-w-full max-sm:text-xl max-lg:text-4xl max-md:leading-10" aria-label="Degree">
            {/* B.Sc, Computer Science */}
            {selectedData?.program?.programType.toLowerCase()} {selectedData?.program?.name?.toLowerCase()}
          </h3>
        </div>
      </section>

      <section className="w-full container  max-w-screen-xl mx-auto p-[clamp(1rem,2vmax,3rem)]">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[54%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
              <div className="items-stretch flex gap-0 py-2.5 self-start max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                <div className="items-stretch text-sm text-neutral-400 flex justify-between gap-0">
                  Home <button onClick={() => router.back()} className="">/ Study Abroad </button> / Universities / {selectedData?.info?.name}
                </div>
              </div>
              <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap mt-8 max-md:max-w-full">
                About Program
              </div>
              <div className="self-stretch text-neutral-600 text-justify text-base leading-6 mt-4 max-md:max-w-full">

                {/* UNC Greensboro&apos;s Bachelor of Science in Computer Science is a
                popular and thriving program, one of the largest in the state.
                Despite its large size, the program maintains modest class sizes
                and a strong tradition of one-on-one faculty mentorship. */}
                
                <br />
                {/* The courses in the computer science program are designed to
                teach the foundations of computing rather than a particular
                technology. This way, students are prepared to change with
                evolving technology. Courses use a variety of programming
                languages, with introductory courses using Java and further
                coursework that can include C++, PHP, and other languages. */}
                {
                  selectedData?.program?.about
                  ? selectedData?.program?.about
                  : <div className="flex flex-col gap-y-2">
                      <div className="h-3 w-[90%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[78%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[82%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[78%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[90%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[75%] bg-neutral-200 animate-pulse rounded-md" />
                      <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />

                    </div>
                }
              </div>

              <section className="mt-3">
                <h2 className="text-black text-xl mt-5 font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">Tuition and Fees</h2>
                <div className="grid grid-cols-[2fr_3.2fr] mt-3 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Semester Tuition Fees:
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch whitespace-nowrap">
                    {/* $3,616.00 */}
                    { selectedData?.tuition.currency && selectedData?.tuition.tuitionFee
                       ? <>{selectedData?.tuition?.currency} {splitInThousand(String(selectedData?.tuition?.tuitionFee))}</>
                       : <div className="h-4 w-[30%] bg-neutral-200 animate-pulse rounded-lg" />
                    }
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Other Fees:
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    {/* <span className="text-neutral-700">$600.00</span> */}
                    {
                      !isLoading
                      ? selectedData?.tuition.otherFee && <span className="text-neutral-700">{selectedData?.tuition?.currency} {splitInThousand(String(selectedData?.tuition?.otherFee))}</span>
                      :  <div className="h-4 w-[30%] bg-neutral-200 animate-pulse rounded-lg" />
                    }
                    
                    {/* <span className="text-neutral-400">/month</span> */}
                  </div>
                </div>
                {/* <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Cost of Living:
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">{selectedData?.tuition?.currency} {splitInThousand(String(selectedData?.tuition?.avgLivingCost))}</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">Food</div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">{selectedData?.tuition?.currency} {splitInThousand(String(selectedData?.tuition?.avgFeedingCost))}</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Transportation
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">{selectedData?.tuition?.currency} {splitInThousand(String(selectedData?.tuition?.avgTransportationCost))}</span>
                  </div>
                </div> */}
                {
                  selectedData?.tuition.otherInformation
                  && (
                    <div className="grid grid-cols-[2fr_3.2fr]  mt-4 max-md:max-w-full max-md:flex-wrap">
                      <div className="text-neutral-400 text-sm leading-5">Others</div>
                      <div className="text-neutral-600 text-base text-justify leading-6 self-stretch grow shrink basis-auto">
                        {selectedData?.tuition.otherInformation}
                      </div>
                    </div>
                  )
                }
                
              </section>
              
              <section className="mt-3">
                <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap mt-8 max-md:max-w-full">
                  Admission Requirements
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] gap-2 lg:gap-3 mt-3 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    {/* Language Requirements: */}
                    Financial Aid:
                  </div>
                  <div className="text-neutral-700 flex flex-wrap w-full text-base leading-6 self-stretch whitespace-nowrap">
                    {/* English Proficiency Test */}
                    {
                      selectedData
                      ? <p className="break-word w-full flex flex-wrap">{selectedData?.admissionRequirement?.financialAid?.join(", ")}</p>
                      : <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />
                    }
                    
                    
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] gap-2 lg:gap-3 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    {/* Academic Requirement: */}
                    Accomodation Options:
                  </div>
                  <div className="text-neutral-700 text-base leading-6">
                    <ul>
                      {/* <li>O Level Result</li>
                      <li>Transcript</li>
                      <li>Standardised Test Result</li> */}
                    </ul>
                    {
                      selectedData
                      // ? <p className="break-word w-full flex flex-wrap">{selectedData?.admissionRequirement?.accomodationOptions?.map((each: string, index: number) => <><span>{each}</span> {(selectedData?.admissionRequirement?.accomodationOptions?.length - 1) > index && <pre>, </pre>}</>)}</p>
                      ? <p className="break-word w-full flex flex-wrap">{selectedData?.admissionRequirement?.accomodationOptions?.join(", ")}</p>
                      : <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />
                    }
                    
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] gap-2 lg:gap-3 mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Required Documents
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch grow shrink basis-auto">
                    {/* <ul>
                      <li>
                        <span className="text-neutral-700">O Level Result</span>
                      </li>
                      <li>Transcript</li>
                      <li>Evidence of English Proficiency </li>
                      <li>
                        <span className="text-neutral-400">(If applicable)</span>
                      </li>
                      <li>
                        <span className="text-neutral-700">Passport copies</span>
                      </li>
                    </ul> */}
                    {
                      selectedData
                      ? <p className="break-word w-full flex flex-wrap">{selectedData?.admissionRequirement?.requiredDocuments?.join(", ")}</p>
                      : <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />
                    }
                    
                  </div>
                </div>
              </section>
             
              {/* Other Section */}
              {/* <section className="mt-3">
                <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap mt-4 max-md:max-w-full">
                  Others
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-3 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    Internships
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch whitespace-nowrap">
                    Internship Opportunities Available
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Form of Assessment
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch whitespace-nowrap">
                    cGPA Grade
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    ECTS Credits
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch grow shrink basis-auto">
                    Each course in the program (Electives & Prerequisites)
                    commands a certain amount of credit points.
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    Scholarships
                  </div>
                  <div className="text-neutral-700 text-base leading-6">
                    <ul>
                      <li>Merit-based Scholarships</li>
                      <li>Need-based Financial Aid</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    Work-Study
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch grow shrink basis-auto">
                    Part-time jobs for students are competitive throughout the
                    town.These part-time jobs usually pay from 500 to 800 euros
                    depending on the type of work.
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    Accommodation Options
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch grow shrink basis-auto">
                    <ul>
                      <li>On-campus </li>
                      <li>Off-campus</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    International Student Support
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch grow shrink basis-auto">
                    Support Available - Provided by the university
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.3fr] gap-3 lg:gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    Student Arrival Support
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch grow shrink basis-auto">
                    Support Available - Provided by the university
                  </div>
                </div>
              </section> */}

            </div>
          </div>

          {/* Page Right Section */}
          <div className="flex flex-col items-stretch w-[46%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch mt-16 max-md:max-w-full max-md:mt-10">
              <div className="items-stretch bg-neutral-50 flex flex-col p-4 rounded-xl max-md:max-w-full">
                <div className="text-black text-xl font-medium leading-6 tracking-tight whitespace-nowrap max-md:max-w-full">
                  Program Details
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-6 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400  text-sm leading-5 word-break">
                      Degree Type
                     
                    </div>
                    <div className="text-neutral-700 capitalize text-base leading-6 word-break mt-1">
                      {/* Bachelor&apos;s Degree */}
                      {selectedData?.program?.degreeType.toLowerCase()}
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      Class Type
                    </div>
                    <div className="text-neutral-700 capitalize text-base leading-6 whitespace-nowrap mt-1">
                      {/* In-Person */}
                      {selectedData?.program?.classType.toLowerCase()}
                    </div>
                  </div>
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      Program Type
                    </div>
                    <div className="text-neutral-700 capitalize text-base leading-6 whitespace-nowrap mt-1">
                      {/* Major */}
                      {selectedData?.program?.programType.toLowerCase()}
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col pr-16 max-md:pr-5">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                     Duration
                    </div>
                    <div className="text-neutral-700 text-base leading-6 whitespace-nowrap mt-1">
                      {/* Fall (Sept.)/Spring (Jan.) */}
                      {selectedData?.program?.duration.toLowerCase()}
                    </div>
                  </div>
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5">
                      {/* Program Language */}
                      Program Type
                    </div>
                    <div className="text-neutral-700 capitalize text-base leading-6 mt-1">
                      {/* English */}
                      {selectedData?.program?.name.toLowerCase()}
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col pr-9 max-md:pr-5">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      College/ School
                    </div>
                    <div className="text-neutral-700 capitalize text-base leading-6 mt-1">
                      {/* College of Arts and Sciences */}
                      {selectedData?.info?.name.toLowerCase()}
                    </div>
                  </div>
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5">
                      Start Date
                    </div>
                    <div className="text-neutral-700 text-base leading-6 mt-1">
                    {selectedData?.program?.startDate?.split("T")[0]?.toLowerCase()}
                    </div>
                  </div>
                  {/* <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5">
                      Start Date
                    </div>
                    <div className="text-neutral-700 text-base leading-6 mt-1">
                      8 Semesters
                    </div>
                  </div> */}
                </div>
                <Link href={`${params?.programId}/apply`} className="text-white text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-orange-600 hover:bg-orange-500 active:bg-orange-700 duration-300 mt-6 px-16 py-3 rounded-lg max-md:max-w-full max-md:px-5">
                  Apply Here
                </Link>
              </div>
              <div className="bg-neutral-50 flex flex-col mt-8 p-4 rounded-xl items-start max-md:max-w-full">
                <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
                  About School
                </div>
                <div className="text-neutral-600 text-base leading-6 self-stretch mt-6 max-md:max-w-full">
                  {/* UNC-Chapel Hill is at the heart of what&apos;s next, preparing
                  talented students from different perspectives and life
                  experiences to become creators, explorers, entrepreneurs and
                  leaders. Tar Heels develop a voice for critical thought and
                  the courage to guide change.Carolina&apos;s nationally recognised
                  teaching, groundbreaking research and dedication to public
                  service continue a legacy that began when the University was
                  chartered in 1789 and opened to students four years later. */}
                  {
                    selectedData?.info?.about
                    ? selectedData?.info.about
                    : <div className="flex flex-col gap-y-2">
                        <div className="h-3 w-[90%] bg-neutral-200 animate-pulse rounded-md" />
                        <div className="h-3 w-[78%] bg-neutral-200 animate-pulse rounded-md" />
                        <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />
                        <div className="h-3 w-[82%] bg-neutral-200 animate-pulse rounded-md" />
                        <div className="h-3 w-[78%] bg-neutral-200 animate-pulse rounded-md" />
                        <div className="h-3 w-[90%] bg-neutral-200 animate-pulse rounded-md" />
                        <div className="h-3 w-[65%] bg-neutral-200 animate-pulse rounded-md" />
                      </div>
                  }
                </div>

                <a href={selectedData?.info.url} rel="no-referrer" target="_blank" className="justify-center items-stretch flex gap-2 mt-6">
                  <span  className="text-orange-600 text-center text-base font-medium leading-6 grow whitespace-nowrap">
                    Learn More
                  </span>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/846cbf7fad412b2c7d2835ef8da732816ad10a3277954d3520cc2a68e69036b2?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
                    className="aspect-square object-contain object-center w-5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                  />
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


