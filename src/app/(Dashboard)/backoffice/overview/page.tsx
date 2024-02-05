"use client";
import api from "@redux/api";
import ApplicationHistory from "../_components/ApplicationHistory";
import { splitInThousand } from "@utils/miscelaneous";
import { ChangeEvent, use, useEffect, useState } from "react";
import DeleteModal from "../applications/_components/DeleteModal";

export default function DashboardOverview() {
  const [ searchData, setSearchData ] = useState({ fullName: "", from: "", to: "", status: "" });
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);
  const [ itemToDelte, setItemToDelete ] = useState({ id: "", name: "", type: "" });

  const { data: visaData, isLoading: visaIsLoading, isError: viaIsError, error: visaError } = api.adminApis.useGetVisaApplicationStatsQuery("")
  const { data: schoolData, isLoading: schoolIsLoading, isError: schoolIsError, error: schoolError } = api.adminApis.useGetSchoolApplicationStatsQuery("")
  const { data: applicationData, isLoading: applicationisLoading, isFetching: applicationsFetching, isError: applicationIsError, error: applicationError } = api.adminApis.useGetApplicationStatsQuery("")
  const [ getApplicationsTrigger, { data: allApplicationData, isFetching: allApplicationisLoading, isError: allApplicationIsError, error: allApplicationError }] = api.adminApis.useLazyGetApplicationsQuery()
  const [ deleteApplicationTrigger, { isLoading: isDeleting, reset: deleteReset, isSuccess: deleteSucessful }] = itemToDelte?.type === "SCHOOL_APPLICATION" ? api.adminApis.useDeleteSchoolApplicationMutation() : api.adminApis.useDeleteVisaApplicationMutation();

  useEffect(() => {
    getApplicationsTrigger("");
  }, []);

  const handleDelete = (id: string): void => {
   deleteApplicationTrigger(id);
  }

  const handleToggleDeleteModalOpen = (id: string, name: string, type: string): void => {
    setItemToDelete({ id, name, type });
    setIsDeleteModalOpen(true);
  }
  // useEffect(() => {
  //   searchQuery ? getApplicationsTrigger(searchQuery) : getApplicationsTrigger("");
  // }, []);

  // useEffect(() => {
  //   searchQuery ? getApplicationsTrigger(searchQuery) : getApplicationsTrigger("");
  // }, [ searchQuery ]);

  // useEffect(() => {
  //   setSearchQuery(`${searchData.fullName && `fullName=${searchData.fullName}`}${searchData.from && `&from=${searchData.from}`}${searchData.to && `&to=${searchData.to}`}${searchData.status && `&status=${searchData.status}`}`)
  // }, [ searchData ]);

  // const handleTextInput = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|any>|any): void => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setSearchData({ ...searchData, [name]: value });
  // }

  const getNextPage = (): void => {
    setSearchQuery("");
    getApplicationsTrigger({ direction: "forward", cursor: allApplicationData?.data?.nextCursor})
  }

  const getPreviousPage = (): void => {
    setSearchQuery("");
    getApplicationsTrigger({ direction: "backward", cursor: allApplicationData?.data?.previousCursor})
  }
  console.log(allApplicationData)

  return (
    <main className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="">
        <ul className="flex flex-row flex-wrap gap-2 md:gap-3 lg:gap-4 xl:gap-6">          
          {
            !applicationisLoading
              ? (
                <li className="p-[clamp(0.5rem,1.4vw,2.5rem)] grow min-w-[250px] rounded-lg flex flex-col gap-3 bg-zinc-50 shadow">
                  <p className="font-medium text-zinc-600 tracking-wide">Total Applicants</p>
                    <div className="">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-semibold">{splitInThousand(applicationData?.data?.count)}</h2>
                        <p className="flex flex-row items-center gap-2">
                          <span className={`${Number(applicationData?.data?.monthCountDifference) > 0 ? "text-green-600" : "text-red-500"} flex flex-row gap-1`}>
                            {
                              Number(applicationData?.data?.monthCountDifference) > 0
                              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                </svg>
                              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                </svg>
                            }
                            {applicationData?.data?.monthCountDifference}%
                          </span>
                          <span className="text-stone-400">vs last month</span>
                        </p>
                      </div>
                      <div className="">
                        {/* Position for chart */}
                      </div>
                    </div>
                  </li>
              ) : (
                <li className=" grow min-w-[250px] rounded-lg flex min-h-[130px] bg-zinc-200/80 animate-pulse flex-col gap-3 shadow" />
              )
          }
            
          {
          !schoolIsLoading
            ? (
              <li className="p-[clamp(0.5rem,1.4vw,2.5rem)] grow min-w-[250px] rounded-lg flex flex-col gap-3 bg-zinc-50 shadow">
                <p className="font-medium text-zinc-600 tracking-wide">Total School Applications</p>
                <div className="">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-semibold">{splitInThousand(schoolData?.data?.count)}</h2>
                    <p className="flex flex-row items-center gap-2">
                      <span className={`${Number(schoolData?.data?.monthCountDifference) > 0 ? "text-green-600" : "text-red-500"} flex flex-row gap-1`}>
                        {
                          Number(schoolData?.data?.monthCountDifference) > 0
                          ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                            </svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                        }
                        {schoolData?.data?.monthCountDifference}%
                      </span>
                      <span className="text-stone-400">vs last month</span>
                    </p>
                  </div>
                  <div className="">
                    {/* Position for chart */}
                  </div>
                </div>
              </li>
            ) : (
              <li className=" grow min-w-[250px] rounded-lg flex min-h-[130px] bg-zinc-200/80 animate-pulse flex-col gap-3 shadow" />
            )
        }

        {
          !visaIsLoading
            ? (
              <li className="p-[clamp(0.5rem,1.4vw,2.5rem)] grow min-w-[250px] rounded-lg flex flex-col gap-3 bg-zinc-50 shadow">
                <p className="font-medium text-zinc-600 tracking-wide">Total Visa Applications</p>
                <div className="">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-semibold">{splitInThousand(visaData?.data?.count)}</h2>
                    <p className="flex flex-row items-center gap-2">
                      <span className={`${Number(visaData?.data?.monthCountDifference) > 0 ? "text-green-600" : "text-red-500"} flex flex-row gap-1`}>
                        {
                          Number(visaData?.data?.monthCountDifference) > 0
                          ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                            </svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                        }
                        {visaData?.data?.monthCountDifference}%
                      </span>
                      <span className="text-stone-400">vs last month</span>
                    </p>
                  </div>
                  <div className="">
                    {/* Position for chart */}
                  </div>
                </div>
              </li>
            ) : (
              <li className=" grow min-w-[250px] rounded-lg flex min-h-[130px] bg-zinc-200/80 animate-pulse flex-col gap-3 shadow" />
            )
          }
        </ul>
      </section>

      <ApplicationHistory data={allApplicationData?.data} isLoading={allApplicationisLoading} isFetching={applicationsFetching} isError={allApplicationIsError} error={allApplicationError} getNextPage={getNextPage} getPreviousPage={getPreviousPage} paginationData={applicationData} handleToggleDeleteModalOpen={handleToggleDeleteModalOpen} />
      <DeleteModal modalOpen={isDeleteModalOpen} setModalOpen={setIsDeleteModalOpen} handleDelete={handleDelete} itemToDelete={itemToDelte} loading={isDeleting} reset={deleteReset} isSucessful={deleteSucessful} />
    </main>
  )
}