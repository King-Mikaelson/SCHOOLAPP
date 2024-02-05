"use client"

import { useState } from "react"
import { applicationHistory, statusColor } from "../applications/_components/data";
import { FormControl, MenuItem, Select } from "@mui/material";
import TableLoader from "@SharedComponents/TableLoader";
import Link from "next/link";
import { formatDate } from "@utils/miscelaneous";
import ErrorBlock from "@SharedComponents/ErrorBlock";

interface IProps {
  data: any,
  isLoading: boolean,
  isFetching: boolean,
  isError: boolean,
  error: any
  getPreviousPage: () => void
  getNextPage: () => void
  paginationData: any
  handleToggleDeleteModalOpen: (id: string, name: string, type: string) => void
}
type TView = ("all"|"IN_PROGRESS"|"COMPLETED"|"assessment"|"offered"|"REJECTED");

export default function ApplicationHistory({ data, isLoading, isFetching, isError, error, getPreviousPage, getNextPage, paginationData, handleToggleDeleteModalOpen }:IProps) {
  const views = ["all","IN_PROGRESS","COMPLETED"]
  
  const [ currentView, setCurrentView ] = useState<TView>("all")
  console.log(data);
  return (
    <section className="">
      {/* <div className="overflow-x-auto max-w-[calc(100vw-1.5rem)]">
        <ul className="grid grid-flow-col gap-x-[1vw] max-w-max">
          {
            views.map((view: typeof views[0], index: number) => (
              <li key={index} className={`border-4 border-white duration-300 ${view === currentView && " border-b-primary"}`}>
                <button onClick={() => setCurrentView(view as TView)} className="font-medium text-slate-500 min-w-max px-1 py-2 capitalize">{view.replace(/-/g, " ")}</button>
              </li>
            ))
          }
        </ul>
      </div> */}
      
      {/* <div className="h-[1px] liner bg-zinc-300 fullwidth" /> */}

      <div className="">
        <div className="flex flex-row gap-x-2 justify-between my-6">
          <h3 className="text-slate-600 text-xl font-medium">Application History</h3>
          <div className="flex flex-row gap-x-2 h-max">
            {/* <button className="flex flex-row items-center gap-x-1.5 px-4 py-1.5 border border-slate-300 text-zinc-500 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M2.5 8.33268H17.5M4.16667 3.33268H15.8333C16.7538 3.33268 17.5 4.07887 17.5 4.99935V16.666C17.5 17.5865 16.7538 18.3327 15.8333 18.3327H4.16667C3.24619 18.3327 2.5 17.5865 2.5 16.666V4.99935C2.5 4.07887 3.24619 3.33268 4.16667 3.33268Z" stroke="#818181" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Select Dates
            </button> */}
            <label htmlFor="location" className="text-neutral-400 text-sm flex flex-row border border-zinc-300 rounded-md items-center gap-1.5 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#818181" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <Select
                itemID="location"
                defaultValue={10}
                className="[&>*]:!py-1.5 [&>*]:!px-0 capitalize [&>*]:!border-none font-medium text-zinc-500 min-w-[50px]"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => setCurrentView(e.target.value as TView)}
              >
                <MenuItem className="!p-0 !hidden" value={10}>Apply Filter</MenuItem>
                {
                  views.map((view: string, index: number) => (
                    <MenuItem className="capitalize" key={index} value={view}>{view.replace(/_/g, " ").toLowerCase()}</MenuItem>
                  ))
                }
              </Select>
              
          </label>
            {/* <button className="flex flex-row items-center gap-x-1 px-4 py-1.5 border border-slate-300 text-slate-700 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#818181" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Apply Filter
            </button> */}
          </div>
        </div>

        <div className="table_container overflow-auto relative max-h-[calc(100vh-250px)]">
          <table className="w-full ]" cellPadding={16}>
            <thead className="w-full z-[1] sticky top-0 border-b bg-white border-y-zinc-200">
              <tr className="grid grid-cols-3 w-full md:table-row text-slate-500 font-bold">
                {/* <td>#</td> */}
                <td style={{ minWidth: "100px"}}>Date</td>
                <td>Name of Client</td>
                <td>Contact Number</td>
                <td>Category</td>
                <td>Status</td>
                <td style={{ width: "100px"}}>Action</td>
              </tr>
            </thead>

            <tbody className="">
              {
                (
                  !isLoading
                    ? (
                      data?.data && data?.data?.filter((arg: typeof applicationHistory[0]) => currentView === "all" ? arg : arg.status.includes(currentView)).map((each: any, index: number) => (
                        <tr key={index} className="text-slate-500 border-b border-b-zinc-200/70 w-full grid md:table-row grid-cols-3 font-semi-bold">
                          <td>{formatDate(each?.createdAt?.split("T")[0])}</td>
                          {/* <td>{String(new Date(each?.createdAt)).split(" ").slice(0, 4).join(" ")}</td> */}
                          <td className="flex flex-col">
                            <span className="text-zinc-600 tracking-wide font-medium">{each?.fullName}</span>
                            <span className="text-zonc-500 text-sm">{each?.email}</span>
                          </td>
                          <td>{each?.phone}</td>
                          <td className="capitalize">{each?.category?.replace(/_/g, " ")?.toLowerCase()}</td>
                          <td className="min-w-max"><span className={`${statusColor[each.status as keyof typeof statusColor]} min-w-max px-3 p-0.5 text-xs capitalize rounded-full`}>{each.status?.replace(/_/g, " ")}</span></td>
                          <td className="flex flex-row gap-1.5 lg:gap-2 xl:gap-2.5" style={{ width: "110px"}}>
                            <Link href={`/backoffice/applications/${each?.category?.split("_")[0].toLowerCase()}/add?id=${each?.applicationId}&action=view`} className="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M18.167 7.5L18.167 2.5M18.167 2.5H13.167M18.167 2.5L11.5003 9.16667M9.00033 4.16667H7.16699C5.76686 4.16667 5.0668 4.16667 4.53202 4.43915C4.06161 4.67883 3.67916 5.06129 3.43948 5.53169C3.16699 6.06647 3.16699 6.76654 3.16699 8.16667V13.5C3.16699 14.9001 3.16699 15.6002 3.43948 16.135C3.67916 16.6054 4.06161 16.9878 4.53202 17.2275C5.0668 17.5 5.76686 17.5 7.16699 17.5H12.5003C13.9005 17.5 14.6005 17.5 15.1353 17.2275C15.6057 16.9878 15.9882 16.6054 16.2278 16.135C16.5003 15.6002 16.5003 14.9001 16.5003 13.5V11.6667" stroke="#818181" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </Link>
                            <Link href={`/backoffice/applications/${each?.category?.split("_")[0].toLowerCase()}/add?id=${each?.applicationId}&action=update`} className="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M3.06337 15.0973C3.10165 14.7527 3.1208 14.5804 3.17293 14.4194C3.21918 14.2765 3.28453 14.1405 3.3672 14.0152C3.46038 13.8739 3.58296 13.7513 3.82811 13.5061L14.8334 2.5009C15.7538 1.58043 17.2462 1.58043 18.1667 2.5009C19.0872 3.42138 19.0872 4.91376 18.1667 5.83424L7.16144 16.8395C6.91629 17.0846 6.79371 17.2072 6.65241 17.3004C6.52704 17.383 6.39108 17.4484 6.2482 17.4946C6.08717 17.5468 5.91488 17.5659 5.57031 17.6042L2.75 17.9176L3.06337 15.0973Z" stroke="#818181" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </Link>
                            <button onClick={() => handleToggleDeleteModalOpen(each?.applicationId, each?.fullName, each?.category)} className="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M14.0003 4.99935V4.33268C14.0003 3.39926 14.0003 2.93255 13.8187 2.57603C13.6589 2.26243 13.4039 2.00746 13.0903 1.84767C12.7338 1.66602 12.2671 1.66602 11.3337 1.66602H10.0003C9.0669 1.66602 8.60019 1.66602 8.24367 1.84767C7.93007 2.00746 7.6751 2.26243 7.51531 2.57603C7.33366 2.93255 7.33366 3.39926 7.33366 4.33268V4.99935M9.00033 9.58268V13.7493M12.3337 9.58268V13.7493M3.16699 4.99935H18.167M16.5003 4.99935V14.3327C16.5003 15.7328 16.5003 16.4329 16.2278 16.9677C15.9882 17.4381 15.6057 17.8205 15.1353 18.0602C14.6005 18.3327 13.9005 18.3327 12.5003 18.3327H8.83366C7.43353 18.3327 6.73346 18.3327 6.19868 18.0602C5.72828 17.8205 5.34583 17.4381 5.10614 16.9677C4.83366 16.4329 4.83366 15.7328 4.83366 14.3327V4.99935" stroke="#818181" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <TableLoader cols={6} />
                    )
                )
              }
            </tbody>
          </table>
          {
            (!(isLoading||isFetching) && data?.data?.length === 0)
              && (
                <div className="px-2 py-4 text-center">
                  <h2 className="text-xl font-semibold">No result found</h2>
                </div>
              )
          }
          <ErrorBlock error={error} />
        </div>

        <div className="flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
          <button onClick={getPreviousPage} disabled={data?.previousCursor ? false : true} className={`${data?.previousCursor ? "text-stone-700" : "text-stone-300"} border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Previous
          </button>
          <div className=" text-ellipsis text-slate-500  max-w-none sm:max-w-[180px] md:max-w-none whitespace-nowrap overflow-hidden">
            {
              Array.from({ length: paginationData?.data?.numPages }).map((_, index: number) => (
                <button key={index} className="bg-primary-pale/30 border border-white hover:border-primary-red rounded-md duration-300 text-primary/90 px-3 py-1">{index+1}</button>
              ))
            }
          </div>
          <button onClick={getNextPage} disabled={data?.nextCursor ? false : true} className={`${data?.nextCursor ? "text-stone-700" : "text-stone-300"} border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}>
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}