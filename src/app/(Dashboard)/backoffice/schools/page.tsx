"use client";

import { MenuItem, Select } from "@mui/material";
import { applicationHistory, statusColor } from "./_components/data";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import api from "@redux/api";
import TableLoader from "@SharedComponents/TableLoader";
import { countryList, getCountryNameFromCode } from "@SharedData/CountryList";
import DeleteModal from "../applications/_components/DeleteModal";
import ErrorBlock from "@SharedComponents/ErrorBlock";
import { formatDate } from "@utils/miscelaneous";
import Image from "next/image";
import { degreeList } from "@SharedData/degreeList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import Pagination from "@material-ui/lab/Pagination";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

const List = styled("div")({
  padding: "1.5rem 0",
  margin: 0,
  display: "flex",
  listStyle: "none",
  alignSelf: "end",
  // position: "fixed",
  // right: "50%",
  // left: "50%",
  // transform: "translateX(50)",
  // gap: "0.5rem",
  // justifyContent: "space-between",
});

type TView =
  | "all"
  | "in-review"
  | "interviewing"
  | "assessment"
  | "offered"
  | "rejected";

export default function Schools() {
  const views = ["all", "in-progress", "completed", "suspended", "rejected"];

  const [currentView, setCurrentView] = useState<TView>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState({
    location: "",
    program: "",
    from: "",
    to: "",
    name: "",
    cursor: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState({ id: "", name: "" });

  const [getSchoolsTrigger, { isLoading, isFetching, data, error }] =
    searchQuery
      ? api.adminApis.useLazyFilterSchoolsQuery()
      : api.adminApis.useLazyGetSchoolsQuery();
  const [
    deleteTrigger,
    {
      isLoading: isDeleting,
      error: deleteError,
      isSuccess: isDeleteSuccess,
      reset,
    },
  ] = api.adminApis.useDeleteSchoolMutation();

  console.log(data);

  // useEffect(() => {
  //   searchQuery ? getSchoolsTrigger(searchQuery) : getSchoolsTrigger("");
  // }, []);



  useEffect(() => {
    searchQuery ? getSchoolsTrigger(searchQuery) : getSchoolsTrigger("");
  }, [searchQuery]);

  console.log(searchQuery);

  useEffect(() => {
    setSearchQuery(
      `${searchData.location && `location=${searchData.location}`}${
        searchData.program && `&program=${searchData.program}`
      }${searchData.name && `&name=${searchData.name}`}${
        searchData.from && searchData.to && `&from=${searchData.from}`
      }${searchData.to && searchData.from && `&to=${searchData.to}`}${
        searchData.cursor && `&cursor=${searchData.cursor}`
      }`
    );
  }, [searchData]);

  const handleFilterTextInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const initiateDelete = (item: any): void => {
    setItemToDelete({ id: item?.schoolId, name: `${item?.info?.name}` });
    setIsDeleteModalOpen(true);
  };
  const handleDelete = (id: string): void => {
    deleteTrigger(id);
  };

  const getNextPage = (): void => {
    setSearchQuery("");
    getSchoolsTrigger({ direction: "forward", cursor: data?.nextCursor });
  };

  const getPreviousPage = (): void => {
    setSearchQuery("");
    getSchoolsTrigger({ direction: "backward", cursor: data?.previousCursor });
  };

  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const rowsPerPage = 6;

  // console.log(page);

  const { items } = usePagination({
    count: Math.ceil(data?.length / rowsPerPage),
    onChange: (event, page) => handleChange(event, page),
    page: page,
  });



  return (
    <main className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-row gap-3  max-md:flex-wrap">
        <div className="right flex flex-col gap-3 lg:gap-4 w-full">
          <div className="flex w-full flex-col lg:flex-row gap-x-4 md:gap-3  lg:gap-4 h-max lg:items-center justify-between">
            <label htmlFor="name" className="lg:w-[60%] relative max-h-max">
              {/* <p className="text-xs text-stone-500 uppercase">SCHOOL</p> */}
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgba(129, 129, 129, 1)"
                  className={
                    searchData.name === ""
                      ? "w-6 h-6 absolute left-3 my-auto top-0 bottom-0"
                      : "!hidden"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  id="name"
                  name="name"
                  value={searchData.name}
                  onChange={handleFilterTextInput}
                  type="text"
                  placeholder="Search School"
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-sm placeholder:!px-6 placeholder:text-neutral-400 whitespace-nowrap border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 py-3.5 rounded-md items-start"
                />
              </span>
            </label>
            {/* <span className="grow basis-1/2">
              <p className="text-xs text-stone-500 uppercase">PROGRAMME</p>
              <label htmlFor="location" className="text-neutral-400  text-sm mt-1 flex flex-row border border-zinc-300 rounded-md items-center gap-1.5 ">
                <Select
                  defaultValue="completed"
                  className="[&>*]:!py-3 [&>*]:!px-0 px-3 lg:px-4 w-full capitalize [&>*]:!border-none font-medium text-zinc-500 min-w-[50px]"
                  value={searchData.program}
                  name="program"
                  onChange={handleFilterTextInput}
                >
                  {
                    degreeList.map((degType: string) => (
                      <MenuItem key={degType} value={degType}>{degType}</MenuItem>
                    ))
                  }
                </Select>
              </label>
            </span> */}

            <div className="lg:ml-auto">
              <Link
                href="/backoffice/schools/add"
                className="bg-[#FF4512] max-w-max  flex flex-row font-medium items-center gap-1.5 rounded-lg px-6 py-2.5 shadow-md text-white mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add New School
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-row gap-x-4 md:gap-3 lg:gap-4 h-max">
            {/* <span className="grow basis-2/4">
              <p className="text-xs text-stone-500 uppercase">COUNTRY</p>
              <label htmlFor="location" className="text-neutral-400  text-sm mt-1 flex flex-row border border-zinc-300 rounded-md items-center gap-1.5 ">
                <Select
                  defaultValue="completed"
                  className="[&>*]:!py-3 [&>*]:!px-0 px-3 lg:px-4 w-full capitalize [&>*]:!border-none font-medium text-zinc-500 min-w-[50px]"
                  value={searchData.location}
                  name="location"
                  onChange={handleFilterTextInput}
                >
                
                  {
                    countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                      <MenuItem key={country.name} className="" value={country.code}>{country.name}</MenuItem>
                    ))
                  }
                </Select>
              </label>
            </span> */}

            {/* <span className="grow basis-1/4">
              <label htmlFor="from" className="text-neutral-400 text-sm flex flex-col gap-1">
                <p className="text-xs text-stone-500 uppercase">FROM</p>
                <input id="from" name="from" value={searchData.from} onChange={handleFilterTextInput} type="date" placeholder="" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90  px-3 py-3 rounded-md" />
              </label>
            </span> */}

            {/* <span className="grow basis-1/4">
              <label htmlFor="to" className="text-neutral-400 text-sm flex flex-col gap-1">
                <p className="text-xs text-stone-500 uppercase">TO</p>
                <input id="to" name="to" value={searchData.to} onChange={handleFilterTextInput} type="date" placeholder="" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90  px-3 py-3 rounded-md" />
              </label>
            </span> */}
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="table_container overflow-auto relative max-h-[calc(100vh-210px)]">
          <TableContainer component={Paper}>
            <Table className="w-full" cellPadding={14}>
              <TableHead className="w-full sticky top-0 border-b bg-white border-y-zinc-200">
                <TableRow className="grid grid-cols-3 w-full md:table-row text-stone-600 font-medium">
                  <TableCell>S/N</TableCell>
                  <TableCell>Name Of School</TableCell>
                  <TableCell>State, Country</TableCell>
                  <TableCell>Available Programs</TableCell>
                  <TableCell></TableCell>
                  {/* Add more table header cells based on your data structure */}
                </TableRow>
              </TableHead>
              {isFetching ? (
                <TableLoader cols={5} />
              ) : (
                <TableBody>
                  {data
                    ?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((each: any, index: number) => (
                      <TableRow
                        key={index}
                        className="text-slate-500  font-semi-bold"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium">
                          {each.name}
                        </TableCell>
                        <TableCell className="flex !flex-col">
                          <p className="text-[#101828] tracking-wide  text-sm">
                            {each?.state}
                          </p>
                          <p className="text-[#667085] text-sm">
                            {(each?.country)}
                          </p>
                        </TableCell>
                        <TableCell className="capitalize">
                          {each?.programs.length}
                        </TableCell>
                        <TableCell className="gap-1.5 lg:gap-2 xl:gap-2.5">
                          <Link
                            href={`/backoffice/schools/add?id=${each.schoolId}&action=view`}
                            className="!inline mx-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className="!inline"
                            >
                              <path
                                d="M18.167 7.5L18.167 2.5M18.167 2.5H13.167M18.167 2.5L11.5003 9.16667M9.00033 4.16667H7.16699C5.76686 4.16667 5.0668 4.16667 4.53202 4.43915C4.06161 4.67883 3.67916 5.06129 3.43948 5.53169C3.16699 6.06647 3.16699 6.76654 3.16699 8.16667V13.5C3.16699 14.9001 3.16699 15.6002 3.43948 16.135C3.67916 16.6054 4.06161 16.9878 4.53202 17.2275C5.0668 17.5 5.76686 17.5 7.16699 17.5H12.5003C13.9005 17.5 14.6005 17.5 15.1353 17.2275C15.6057 16.9878 15.9882 16.6054 16.2278 16.135C16.5003 15.6002 16.5003 14.9001 16.5003 13.5V11.6667"
                                stroke="#818181"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </Link>
                          <Link
                            href={`/backoffice/schools/add?id=${each.schoolId}&action=update`}
                            className="!inline mx-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className="!inline"
                            >
                              <path
                                d="M3.06337 15.0973C3.10165 14.7527 3.1208 14.5804 3.17293 14.4194C3.21918 14.2765 3.28453 14.1405 3.3672 14.0152C3.46038 13.8739 3.58296 13.7513 3.82811 13.5061L14.8334 2.5009C15.7538 1.58043 17.2462 1.58043 18.1667 2.5009C19.0872 3.42138 19.0872 4.91376 18.1667 5.83424L7.16144 16.8395C6.91629 17.0846 6.79371 17.2072 6.65241 17.3004C6.52704 17.383 6.39108 17.4484 6.2482 17.4946C6.08717 17.5468 5.91488 17.5659 5.57031 17.6042L2.75 17.9176L3.06337 15.0973Z"
                                stroke="#818181"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => initiateDelete(each)}
                            className="!inline mx-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className="!inline"
                            >
                              <path
                                d="M14.0003 4.99935V4.33268C14.0003 3.39926 14.0003 2.93255 13.8187 2.57603C13.6589 2.26243 13.4039 2.00746 13.0903 1.84767C12.7338 1.66602 12.2671 1.66602 11.3337 1.66602H10.0003C9.0669 1.66602 8.60019 1.66602 8.24367 1.84767C7.93007 2.00746 7.6751 2.26243 7.51531 2.57603C7.33366 2.93255 7.33366 3.39926 7.33366 4.33268V4.99935M9.00033 9.58268V13.7493M12.3337 9.58268V13.7493M3.16699 4.99935H18.167M16.5003 4.99935V14.3327C16.5003 15.7328 16.5003 16.4329 16.2278 16.9677C15.9882 17.4381 15.6057 17.8205 15.1353 18.0602C14.6005 18.3327 13.9005 18.3327 12.5003 18.3327H8.83366C7.43353 18.3327 6.73346 18.3327 6.19868 18.0602C5.72828 17.8205 5.34583 17.4381 5.10614 16.9677C4.83366 16.4329 4.83366 15.7328 4.83366 14.3327V4.99935"
                                stroke="#818181"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}

              {/* <Pagination
                  className="!ml-auto !w-full"
                  count={Math.ceil(data?.data.length / rowsPerPage)}
                  page={page}
                  onChange={handleChange}
                /> */}
            </Table>
          </TableContainer>
          <div className=" !w-full">
            <List className="!flex-1 first-letter:flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
              {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;

                if (type === "start-ellipsis" || type === "end-ellipsis") {
                  children = "…";
                } else if (type === "page") {
                  children = (
                    <button
                      type="button"
                      style={{
                        fontWeight: selected ? "bold" : undefined,
                        padding: "0.5rem 1rem",
                        width: "100%",
                      }}
                      {...item}
                    >
                      {page}
                    </button>
                  );
                } else {
                  children =
                    // <button style={{
                    //   fontWeight: selected ? "bold" : undefined,
                    //   marginLeft:"auto",
                    //   padding:"8px 12px",
                    //   border:"1px solid #DEDEDE",
                    //   borderRadius: "8px"
                    // }} type="button" {...item}>
                    //   {type}
                    // </button>

                    type === "previous" ? (
                      <button
                        {...item}
                        disabled={item.disabled}
                        className={`${selected ? "font-bold" : undefined} ${
                          item.disabled === false ? "text-stone-700" : "text-stone-300"
                        } border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}
                      >
                        {type}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        {...item}
                        disabled={item.disabled}
                        className={`${selected ? "font-bold" : undefined} ${
                          item.disabled === false ? "text-stone-700" : "text-stone-300"
                        }  border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}
                      >
                        {type}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    );
                }

                return <div key={index}>{children}</div>;
              })}
            </List>
          </div>

          {/* <div className="flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
            <button
              onClick={getPreviousPage}
              disabled={data?.previousCursor ? false : true}
              className={`${
                data?.previousCursor ? "text-stone-700" : "text-stone-300"
              } border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Previous
            </button>
            <div className=" text-ellipsis text-slate-500  max-w-none sm:max-w-[180px] md:max-w-none whitespace-nowrap overflow-hidden">
              {Array.from({ length: paginationData?.data?.numPages }).map(
                (_, index: number) => (
                  <button
                    key={index}
                    className="bg-primary-pale/30 border border-white hover:border-primary-red rounded-md duration-300 text-primary/90 px-3 py-1"
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div> */}
          {/* <table className="w-full" cellPadding={14}>
            <thead className="w-full sticky top-0 border-b bg-white border-y-zinc-200">
              <tr className="grid grid-cols-3 w-full md:table-row text-stone-600 font-medium">
                <td>S/N</td>
                <td>Name Of School</td>
                <td>State, Country</td>
                <td>Available Programs</td>
              </tr>
            </thead>

            <tbody className="">
              {isFetching ? (
                <TableLoader cols={5} />
              ) : (
                data?.data &&
                data?.data.map((each: any, index: number) => (
                  <tr
                    key={index}
                    className="text-slate-500 border-b border-b-zinc-200/70 w-full grid md:table-row grid-cols-3 font-semi-bold"
                  >
                    <td>{index + 1}</td>
                    <td>
                      <span className="text-zinc-600 tracking-wide font-medium">
                        {each?.info?.name}
                      </span>
                    </td>
                    <td className="flex flex-col">
                      <span className="text-[#101828] tracking-wide  text-sm">
                        {each?.info?.state}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {getCountryNameFromCode(each?.info?.country)}
                      </span>
                    </td>
                    <td className="capitalize">
                      {each?.program?.programType
                        ?.replace(/_/g, " ")
                        ?.toLowerCase()}
                    </td>
                    <td
                      className="flex flex-row gap-1.5 lg:gap-2 xl:gap-2.5"
                      style={{ width: "110px" }}
                    >
                      <Link
                        href={`/backoffice/schools/add?id=${each.schoolId}&action=view`}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M18.167 7.5L18.167 2.5M18.167 2.5H13.167M18.167 2.5L11.5003 9.16667M9.00033 4.16667H7.16699C5.76686 4.16667 5.0668 4.16667 4.53202 4.43915C4.06161 4.67883 3.67916 5.06129 3.43948 5.53169C3.16699 6.06647 3.16699 6.76654 3.16699 8.16667V13.5C3.16699 14.9001 3.16699 15.6002 3.43948 16.135C3.67916 16.6054 4.06161 16.9878 4.53202 17.2275C5.0668 17.5 5.76686 17.5 7.16699 17.5H12.5003C13.9005 17.5 14.6005 17.5 15.1353 17.2275C15.6057 16.9878 15.9882 16.6054 16.2278 16.135C16.5003 15.6002 16.5003 14.9001 16.5003 13.5V11.6667"
                            stroke="#818181"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                      <Link
                        href={`/backoffice/schools/add?id=${each.schoolId}&action=update`}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M3.06337 15.0973C3.10165 14.7527 3.1208 14.5804 3.17293 14.4194C3.21918 14.2765 3.28453 14.1405 3.3672 14.0152C3.46038 13.8739 3.58296 13.7513 3.82811 13.5061L14.8334 2.5009C15.7538 1.58043 17.2462 1.58043 18.1667 2.5009C19.0872 3.42138 19.0872 4.91376 18.1667 5.83424L7.16144 16.8395C6.91629 17.0846 6.79371 17.2072 6.65241 17.3004C6.52704 17.383 6.39108 17.4484 6.2482 17.4946C6.08717 17.5468 5.91488 17.5659 5.57031 17.6042L2.75 17.9176L3.06337 15.0973Z"
                            stroke="#818181"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                      <button onClick={() => initiateDelete(each)} className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M14.0003 4.99935V4.33268C14.0003 3.39926 14.0003 2.93255 13.8187 2.57603C13.6589 2.26243 13.4039 2.00746 13.0903 1.84767C12.7338 1.66602 12.2671 1.66602 11.3337 1.66602H10.0003C9.0669 1.66602 8.60019 1.66602 8.24367 1.84767C7.93007 2.00746 7.6751 2.26243 7.51531 2.57603C7.33366 2.93255 7.33366 3.39926 7.33366 4.33268V4.99935M9.00033 9.58268V13.7493M12.3337 9.58268V13.7493M3.16699 4.99935H18.167M16.5003 4.99935V14.3327C16.5003 15.7328 16.5003 16.4329 16.2278 16.9677C15.9882 17.4381 15.6057 17.8205 15.1353 18.0602C14.6005 18.3327 13.9005 18.3327 12.5003 18.3327H8.83366C7.43353 18.3327 6.73346 18.3327 6.19868 18.0602C5.72828 17.8205 5.34583 17.4381 5.10614 16.9677C4.83366 16.4329 4.83366 15.7328 4.83366 14.3327V4.99935"
                            stroke="#818181"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table> */}
          {!(isLoading || isFetching) && data?.length === 0 && (
            <div className="px-2 py-4 text-center">
              <h2 className="text-xl font-semibold">No result found</h2>
            </div>
          )}
          <ErrorBlock error={error} />
        </div>

        {/* <div className="flex max-w-[calc(100vw-1.5rem)] w-max bottom-4 bg-white mb-4 ml-auto divide-x divide-dashed border md:max-w-max rounded-md border-primary/50  divide-blue-400 mt-6 p-1">
          <button className="bg-primary-pale/30 flex flex-row gap-1.5 hover:bg-primary-pale rounded-tl-md items-center rounded-bl-md text-stone-600 px-3 py-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous
          </button>
          <div className=" text-ellipsis whitespace-nowrap overflow-hidden">
            {
              Array.from({ length: 6}).map((_, index: number) => (
                <button key={index} className="bg-primary-pale/30 text-stone-500 duration-300 text-sm px-4 py-0.5">{index+1}</button>
              ))
            }
          </div>
          <button className="bg-primary-pale/30 flex flex-row items-center gap-1.5 hover:bg-primary-pale rounded-tr-md rounded-br-md text-stone-600 px-3 py-0.5">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div> */}

        {/* <div className="flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
          <button
            onClick={getPreviousPage}
            disabled={data?.previousCursor ? false : true}
            className={`${
              data?.previousCursor ? "text-stone-700" : "text-stone-300"
            } border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Previous
          </button>

          <button
            onClick={getNextPage}
            disabled={data?.nextCursor ? false : true}
            className={`${
              data?.nextCursor ? "text-stone-700" : "text-stone-300"
            } border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div> */}
      </section>

      <DeleteModal
        modalOpen={isDeleteModalOpen}
        setModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
        itemToDelete={itemToDelete}
        loading={isDeleting}
        isSucessful={isDeleteSuccess}
        reset={reset}
      />
    </main>
  );
}
