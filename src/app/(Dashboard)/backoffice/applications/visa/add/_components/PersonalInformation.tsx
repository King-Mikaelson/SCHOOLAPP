import { countryList } from "@SharedData/CountryList";
import { FormControl, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface IProps {
  formData: any
  isLoading: boolean
  handleInputChange: (e: any) => void
  phoneDetails: { countryCode: string, number: string }
  setPhoneDetails: React.Dispatch<React.SetStateAction<{ countryCode: string, number: string }>>
}

export default function PersonalInformation({ formData, isLoading, handleInputChange, phoneDetails, setPhoneDetails }: IProps) {
  const action = useSearchParams().get("action");

  return (
    <section className="">
      <div className="items-start flex flex-col rounded-xl mt-4 max-md:px-4 max-w-screen-md">

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="fullName" className="grow basis-full">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">FULL NAME</p>
            {
              !isLoading
                ? (
                  <input id="fullName" required disabled={action === "view"} value={formData?.fullName} onChange={handleInputChange} name="fullName" type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="email" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">EMAIL ADDRESS</p>
            {
              !isLoading
                ? (
                  <input id="email" required disabled={action === "view"} value={formData?.email} onChange={handleInputChange} name="email" type="text" placeholder="Enter here" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5" />
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
            
          <label htmlFor="phone" className="grow basis-1/2">
            <p className="text-neutral-700 grow basis-full text-xs leading-4 tracking-widest uppercase">MOBILE NUMBER</p>
            <span className="grid grid-cols-[max-content_3fr] gap-2">
              {
                !isLoading
                  ? (
                    <>
                      <FormControl fullWidth>
                        <Select
                          required
                          disabled={action === "view"}
                          defaultValue="234"
                          className="[&>*]:!py-1 [&>*]:!px-2 [&>*]:!pr-2.5 [&>*]:!rounded-md mt-1 [&>*]:!flex [&>*]:!items-center !min-w-max placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                          // className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500"
                          onChange={(e) => setPhoneDetails({ ...phoneDetails, countryCode: e.target.value })}
                        >
                          {
                            countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                              <MenuItem key={country.name} className="" value={country.phone}><Image className="mr-0.5" width={35} height={17} src={`/images/country-flag/${country?.code}.svg`} alt="flag" />({country.name?.slice(0,3)}) +{country.phone}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                      <input id="phone" required disabled={action === "view"} name="mobileNumber" value={phoneDetails.number} onChange={(e) => {setPhoneDetails({ ...phoneDetails, number: e.target.value.replace(/[^0-9]/ig, "") })}} type="tel" className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start" />
                    </>
                  ) : (
                    <>
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                      <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                    </>
                  )
              }
            </span>
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="nationality" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">NATIONALITY</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      required
                      itemID="nationality"
                      defaultValue={formData.nationality || 10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view"}
                      name="nationality"
                      value={formData?.nationality}
                      onChange={handleInputChange}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      {
                        countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                          <MenuItem key={index} value={country.code}>{country?.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                ) : (
                  <div className="h-full w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
          <label htmlFor="destinationCountry" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">TRAVEL DESTINATION</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      required
                      itemID="destinationCountry"
                      defaultValue={formData?.destinationCountry || 10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view"}
                      name="destinationCountry"
                      value={formData?.destinationCountry}
                      onChange={handleInputChange}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      {
                        countryList.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))?.map((country: typeof countryList[0], index: number) => (
                          <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                ) : (
                  <div className="h-full w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="location" className="text-neutral-400 text-sm flex grow basis-1/2 flex-col">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">REASON FOR TRAVEL</p>
            {
              !isLoading
                ? (
                  <FormControl fullWidth>
                    <Select
                      required
                      itemID="location"
                      defaultValue={formData?.visaType || 10}
                      className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                      disabled={action === "view"}
                      name="visaType"
                      value={formData?.visaType}
                      onChange={handleInputChange}
                    >
                      <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem>
                      <MenuItem className="" value={`TOURIST_VISA`}>Tourism</MenuItem>
                      <MenuItem className="" value={`SCHOOL_VISA`}>School</MenuItem>
                      <MenuItem className="" value={`WORK_VISA`}>Work</MenuItem>
                      <MenuItem className="" value={`OTHER`}>Other</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div className="h-full w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )
            }
          </label>
        </div>
       
      </div>
    </section>
  );
}


