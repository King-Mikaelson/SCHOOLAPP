
import { FormControl, MenuItem, Select } from "@mui/material";
import { IFormData } from "../page";
import en from "../../../../../dictionaries/en.json"
import fr from "../../../../../dictionaries/fr.json"
import { useSearchParams } from "next/navigation";
import { countryList } from "@SharedData/CountryList";
import langs from "@dictionaries/langs";


interface IProps {
  setFormSection: React.Dispatch<React.SetStateAction<number>>
  formData: any,
  isLoading: boolean
  handleInputChange: (e: any, property: string) => void
  params: {
    lang: string
  }
}

export default function PersonalInformation({ setFormSection, formData, params, isLoading, handleInputChange }: IProps) {
  const action = useSearchParams().get("action");
  
  return (
    <section className="">
      <div className="items-start mx-auto bg-white shadow-md flex flex-col px-6 py-7 rounded-xl max-md:px-4 max-w-screen-lg">
        <div className="text-black text-xl font-medium leading-6 tracking-tight self-stretch whitespace-nowrap max-md:max-w-full">
          {langs[params.lang as keyof typeof langs].personalInformation.personalInformation}
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="firstName" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].personalInformation.firstName}</p>
            {
              !isLoading
                ? <input required id="firstName" name="firstName" disabled={action == "view"} value={formData?.personalInformation?.firstName} onChange={(e) => handleInputChange(e, "personalInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].personalInformation.enterFirstName} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <label htmlFor="lastName" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].personalInformation.lastName}</p>
            {
              !isLoading
                ? <input required id="lastName" name="lastName" disabled={action == "view"} value={formData?.personalInformation?.lastName} onChange={(e) => handleInputChange(e, "personalInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].personalInformation.enterLastName} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="middleName" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].personalInformation.middleName}</p>
            {
              !isLoading
                ? <input required id="middleName" name="middleName" disabled={action == "view"} value={formData?.personalInformation?.middleName} onChange={(e) => handleInputChange(e, "personalInformation")} type="text" placeholder={langs[params.lang as keyof typeof langs].personalInformation.enterMiddleName} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
          </label>

          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            {/* <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].personalInformation.lastName}</p> */}
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">GENDER</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      itemID="location"
                      required
                      defaultValue={formData?.personalInformation?.gender || 10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="gender"
                      value={formData?.personalInformation?.gender}
                      onChange={(e) => handleInputChange(e, "personalInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].personalInformation.selectCountry}</MenuItem>
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
          <label htmlFor="dob" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].personalInformation.dob}</p>
            {
              !isLoading
                ? <input required id="dob" name="dob" disabled={action == "view"} value={formData?.personalInformation?.dob?.split("T")[0]} onChange={(e) => handleInputChange(e, "personalInformation")} type="date" placeholder={langs[params.lang as keyof typeof langs].personalInformation.enterMiddleName} className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 mt-1 px-3 lg:px-4 py-2.5 rounded-md items-start max-md:pr-5" />
                : <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            }
           
          </label>
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">{langs[params.lang as keyof typeof langs].personalInformation.nationality}</p>
            {
              !isLoading
                ? <FormControl fullWidth>
                    <Select
                      itemID="location"
                      required
                      defaultValue="NG"
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action == "view"}
                      name="nationality"
                      value={formData?.personalInformation?.nationality}
                      onChange={(e) => handleInputChange(e, "personalInformation")}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>{langs[params.lang as keyof typeof langs].personalInformation.selectCountry}</MenuItem>
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
        <div className="items-stretch self-stretch  flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400  text-sm flex  w-full md:basis-1/2 flex-col">
            <button
              onClick={() => setFormSection(1)}
              className="text-white text-center hover:bg-red-400 active:bg-red-600 duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-500 max-w-full mt-8 px-16 py-3 rounded-lg self-start max-md:px-5"
            >
              {langs[params.lang as keyof typeof langs].personalInformation.continue}
            </button>
          </label>
          <label htmlFor="" className="grow basis-1/2 w-full invisible" />
        </div>
      </div>
    </section>
  );
}


