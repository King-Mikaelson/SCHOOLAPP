

import { countryList } from "@SharedData/CountryList";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { IState, State } from "country-state-city";
import { schoolInformationInitialState } from "../data";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  isSubmitting: boolean
  handleInputChange: (e: any, property: keyof typeof schoolInformationInitialState) => void
}

export default function SchoolInformation({ formData, setFormData, isLoading, isSubmitting, handleInputChange }: IProps) {
  const action = useSearchParams().get("action");


  return (
    <section className="">
      <div className="items-start flex flex-col py-1 max-md:px-4 max-w-screen-md">
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="name" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">Name of School</p>
            {
              !isLoading
                ? <input id="name" name="name" disabled={action == "view" || isSubmitting} value={formData?.info?.name} onChange={(e) => handleInputChange(e, "info")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="schoolType" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">COLLEGE Type (OPTIONAL)</p>
            {
              !isLoading
                ? <input id="schoolType" name="schoolType" disabled={action == "view" || isSubmitting} value={formData?.info?.schoolType} onChange={(e) => handleInputChange(e, "info")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
        <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">COUNTRY</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      itemID="location"
                      defaultValue="NG"
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="country"
                      value={formData?.info?.country || 10}
                      onChange={(e) => handleInputChange(e, "info")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      {
                        countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                          <MenuItem key={index} className="" value={country.code} >{country.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">STATE</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                    <Select
                      // displayEmpty
                      itemID="location"
                      defaultValue={10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="state"
                      value={formData?.info?.state || 10}
                      onChange={(e) => handleInputChange(e, "info")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      {
                        State.getStatesOfCountry(formData?.info?.country as string).map((state: IState, index: number) => (
                          <MenuItem key={index} value={state.name}>{state.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
            
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="url" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">SCHOOL URL</p>
            {
              !isLoading
                ? <input id="url" name="url" disabled={action == "view" || isSubmitting} value={formData?.info?.url} onChange={(e) => handleInputChange(e, "info")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="about" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">ABOUT SCHOOL (a brief information about the school)</p>
            {
              !isLoading
                ? <textarea id="about" maxLength={1000} name="about"  disabled={action == "view" || isSubmitting} value={formData?.info?.about} onChange={(e) => handleInputChange(e, "info")} rows={8} placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
            <p className="text-stone-500/90 text-xs ml-auto w-max leading-4">1000 Characters</p>
          </label>
        </div>
      </div>
    </section>
  );
}


