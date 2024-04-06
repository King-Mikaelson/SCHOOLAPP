import React, { useState } from "react";
import TableLoader from "@SharedComponents/TableLoader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

type PView = "Table" | "Form";

type Props = {
  setProgramView: React.Dispatch<React.SetStateAction<PView>>;
  action:string | null
  selectedData: any;
};

function ProgramTable({ setProgramView,action, selectedData }: Props) {
  const List = styled("div")({
    padding: "1.5rem 0",
    margin: 0,
    display: "flex",
    listStyle: "none",
    alignSelf: "end",
  });
  const isFetching = false;
  const isLoading = false;

  const data = selectedData?.info?.programs.filter((obj:any) => obj !== null)

  const rowsPerPage = 5;

  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const { items } = usePagination({
    count: Math.ceil(data.length / rowsPerPage),
    onChange: (event, page) => handleChange(event, page),
    page: page,
  });


  return (
    <div>
      <section className="flex flex-row gap-3  max-md:flex-wrap">
        <div className="right flex  w-full">
          <div className="flex w-full">
            <div className="lg:ml-auto">
              <button
              disabled={ ["view", "update"].includes(action as string)
              ? false
              : true}
                onClick={() => setProgramView("Form")}
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
                Add New Program
              </button>
            </div>
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
                  <TableCell>List Of Programs</TableCell>
                  <TableCell>Degree Type</TableCell>
                  <TableCell></TableCell>
                  {/* Add more table header cells based on your data structure */}
                </TableRow>
              </TableHead>
              {isFetching ? (
                <TableLoader cols={5} />
              ) : (
                <TableBody>
                  {data
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((each: any, index: number) => (
                      <TableRow
                        key={index}
                        className="text-slate-500  font-semi-bold"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium">
                          {each.name}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium">
                          {each.degreeType}
                        </TableCell>
                        <TableCell className="gap-1.5 lg:gap-2 xl:gap-2.5">
                          <button
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
                          </button>
                          <button
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
                          </button>
                          <button
                            // onClick={() => initiateDelete(each)}
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
            </Table>
          </TableContainer>
          {!(data?.length === 0) && (
            <div className="">
              <List className=" !w-0 bottom-4 bg-white mb-4 rounded-md  mt-8">
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
                            item.disabled === false
                              ? "text-stone-700"
                              : "text-stone-300"
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
                            item.disabled === false
                              ? "text-stone-700"
                              : "text-stone-300"
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
          )}

          {!(isLoading || isFetching) && data?.length === 0 && (
            <div className="px-2 py-4 text-center">
              <h2 className="text-xl font-semibold">No result found</h2>
            </div>
          )}
          {/* <ErrorBlock error={error} /> */}
        </div>
      </section>
    </div>
  );
}

export default ProgramTable;
