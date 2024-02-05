

import { countryList } from "@SharedData/CountryList";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  handleInputChange: (e: any, property: string) => void
}

export default function PersonalInformation({ formData, setFormData, isLoading, handleInputChange }:IProps) {
  const action = useSearchParams().get("action");

  return (
    <section className="">
      <div className="items-start flex flex-col py-1 max-md:px-4 max-w-screen-lg">
       
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="firstName" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">FIRST NAME</p>
            {
              !isLoading
                ? <input id="firstName" name="firstName" disabled={action == "view"} value={formData?.personalInformation?.firstName} onChange={(e) => handleInputChange(e, "personalInformation")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
            
          <label htmlFor="lastname" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">LAST NAME</p>
            {
              !isLoading
                ? <input id="lastName" name="lastName" disabled={action == "view"} value={formData?.personalInformation?.lastName} onChange={(e) => handleInputChange(e, "personalInformation")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="middlename" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">MIDDLE NAME</p>
            {
              !isLoading
                ? <input id="middleName" name="middleName" disabled={action == "view"} value={formData?.personalInformation?.middleName} onChange={(e) => handleInputChange(e, "personalInformation")} type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">GENDER</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      itemID="location"
                      defaultValue={formData?.personalInformation?.gender || 10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="gender"
                      value={formData?.personalInformation?.gender}
                      onChange={(e) => handleInputChange(e, "personalInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select Gender</MenuItem>
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
            
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="middlename" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">Date of Birth</p>
            {
              !isLoading
                ? <input id="dob" name="dob" disabled={action == "view"} value={formData?.personalInformation?.dob?.split("T")[0]} onChange={(e) => handleInputChange(e, "personalInformation")} type="date" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-2.5 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">Nationality</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      itemID="location"
                      defaultValue="NG"
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="nationality"
                      value={formData?.personalInformation?.nationality}
                      onChange={(e) => handleInputChange(e, "personalInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      {
                        countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((nationality: typeof countryList[0], index: number) => (
                          <MenuItem key={index} className="" value={nationality.code} >{nationality.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                :
                <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>
        
      </div>
    </section>
  );
}


