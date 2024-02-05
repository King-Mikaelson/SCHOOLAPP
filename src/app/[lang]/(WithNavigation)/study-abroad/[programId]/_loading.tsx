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
    <main className="bg-white flex flex-col justify-center items-center mb-[4vmin]">

      <section className="flex-col w-full relative overflow-hidden flex min-h-[491px] justify-center px-3 py-12 items-start after:bg-black/60 after:absolute after:top-0 after:left-0 after:h-full after:w-full">
        <Image fill src="/images/home/hero.png" alt="university" loading="lazy"  className="absolute h-full w-full object-cover object-center inset-0" />
        <div className="relative flex z-[1] flex-col md:ml-[1vmax] items-stretch  mt-64 mb-1 max-md:max-w-full max-md:mt-30">
          <h2 className="text-white text-6xl font-semibold leading-[56px] tracking-tighter whitespace-nowrap max-md:max-w-full max-sm:text-4xl max-lg:text-5xl max-md:leading-10" aria-label="University Name">
            {/* The University of Hong Kong */}
            {selectedData?.info?.name}
          </h2>
          <h3 className="text-white capitalize text-5xl font-medium leading-10 tracking-tighter whitespace-nowrap mt-5 max-md:max-w-full max-sm:text-xl max-lg:text-4xl max-md:leading-10" aria-label="Degree">
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
                {selectedData?.info?.about}
                <br />
                {/* The courses in the computer science program are designed to
                teach the foundations of computing rather than a particular
                technology. This way, students are prepared to change with
                evolving technology. Courses use a variety of programming
                languages, with introductory courses using Java and further
                coursework that can include C++, PHP, and other languages. */}
                {selectedData?.program?.about}
              </div>

              <section className="mt-3">
                <h2 className="text-black text-xl mt-5 font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">Tuition and Fees</h2>
                <div className="grid grid-cols-[2fr_3.2fr] mt-3 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Semester Tuition Fees:
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch whitespace-nowrap">
                    {/* $3,616.00 */}
                    {}
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Accomodation:
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">$600.00</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Cost of Living:
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">$600.00</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">Food</div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">$600.00</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Transportation
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap">
                    <span className="text-neutral-700">Free </span>
                    <span className="text-neutral-400">
                      (University offers shuttle)
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr]  mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">Others</div>
                  <div className="text-neutral-600 text-base text-justify text-left leading-6 self-stretch grow shrink basis-auto">
                    The tuition fees reflected above already includes VAT and may
                    vary with faculty . In case of extension, extra fees will be
                    charged. Please pay attention to the acceptance letter for
                    actual amounts to be paid.
                  </div>
                </div>
              </section>
              
              <section className="mt-3">
                <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap mt-8 max-md:max-w-full">
                  Admission Requirements
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] gap-2 lg:gap-3 mt-3 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Language Requirements:
                  </div>
                  <div className="text-neutral-700 text-base leading-6 self-stretch whitespace-nowrap">
                    English Proficiency Test
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] gap-2 lg:gap-3 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-neutral-400 text-sm leading-5">
                    Academic Requirement:
                  </div>
                  <div className="text-neutral-700 text-base leading-6">
                    <ul>
                      <li>O Level Result</li>
                      <li>Transcript</li>
                      <li>Standardised Test Result</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_3.2fr] gap-2 lg:gap-3 mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-neutral-400 text-sm leading-5">
                    Documents
                  </div>
                  <div className="text-neutral-400 text-base leading-6 self-stretch grow shrink basis-auto">
                    <ul>
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
                    </ul>
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
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      Degree Type
                    </div>
                    <div className="text-neutral-700 text-base leading-6 whitespace-nowrap mt-1">
                      Bachelor&apos;s Degree
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      Class Type
                    </div>
                    <div className="text-neutral-700 text-base leading-6 whitespace-nowrap mt-1">
                      In-Person
                    </div>
                  </div>
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      Program Type
                    </div>
                    <div className="text-neutral-700 text-base leading-6 whitespace-nowrap mt-1">
                      Major
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col pr-16 max-md:pr-5">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      Admission Semester
                    </div>
                    <div className="text-neutral-700 text-base leading-6 whitespace-nowrap mt-1">
                      Fall (Sept.)/Spring (Jan.)
                    </div>
                  </div>
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5">
                      Program Language
                    </div>
                    <div className="text-neutral-700 text-base leading-6 mt-1">
                      English{" "}
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col pr-9 max-md:pr-5">
                    <div className="text-neutral-400 text-sm leading-5 whitespace-nowrap">
                      College/ School
                    </div>
                    <div className="text-neutral-700 text-base leading-6 mt-1">
                      College of Arts and Sciences
                    </div>
                  </div>
                </div>
                <div className="items-stretch grid grid-cols-2 gap-2 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5">
                      Program Duration
                    </div>
                    <div className="text-neutral-700 text-base leading-6 mt-1">
                      8 Semesters
                    </div>
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col">
                    <div className="text-neutral-400 text-sm leading-5">
                      Start Date
                    </div>
                    <div className="text-neutral-700 text-base leading-6 mt-1">
                      8 Semesters
                    </div>
                  </div>
                </div>
                <Link href={"F787IJ/apply"} className="text-white text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-orange-600 hover:bg-orange-500 active:bg-orange-700 duration-300 mt-6 px-16 py-3 rounded-lg max-md:max-w-full max-md:px-5">
                  Apply Here
                </Link>
              </div>
              <div className="bg-neutral-50 flex flex-col mt-8 p-4 rounded-xl items-start max-md:max-w-full">
                <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
                  About School
                </div>
                <div className="text-neutral-600 text-base leading-6 self-stretch mt-6 max-md:max-w-full">
                  UNC-Chapel Hill is at the heart of what&apos;s next, preparing
                  talented students from different perspectives and life
                  experiences to become creators, explorers, entrepreneurs and
                  leaders. Tar Heels develop a voice for critical thought and
                  the courage to guide change.Carolina&apos;s nationally recognised
                  teaching, groundbreaking research and dedication to public
                  service continue a legacy that began when the University was
                  chartered in 1789 and opened to students four years later.
                </div>
                <div className="justify-center items-stretch flex gap-2 mt-6">
                  <button className="text-orange-600 text-center text-base font-medium leading-6 grow whitespace-nowrap">
                    Learn More
                  </button>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/846cbf7fad412b2c7d2835ef8da732816ad10a3277954d3520cc2a68e69036b2?apiKey=0ce679486ae447bd8ce08b2cc2263e2e&"
                    className="aspect-square object-contain object-center w-5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


