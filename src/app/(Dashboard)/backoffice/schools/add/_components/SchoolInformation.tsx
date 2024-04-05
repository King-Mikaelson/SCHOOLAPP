import { countryList } from "@SharedData/CountryList";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { IState, State } from "country-state-city";
import { schoolInformationInitialState } from "../data";
import Image from "next/image";
import fileUpload from "@public/images/back-office/file-upload-states.png";
import { useEffect, useState } from "react";
interface IProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  isSubmitting: boolean;
  handleInputChange: (
    e: any,
    property: keyof typeof schoolInformationInitialState
  ) => void;
  selectedData: any;
  imageFiles: any;
  setImageFiles: React.Dispatch<React.SetStateAction<any>>;
  hasProcessedImages: any;
  setHasProcessedImages: React.Dispatch<React.SetStateAction<any>>;
}

export default function SchoolInformation({
  formData,
  setFormData,
  isLoading,
  isSubmitting,
  handleInputChange,
  selectedData,
  imageFiles,
  setImageFiles,
  hasProcessedImages,
  setHasProcessedImages,
}: IProps) {
  const action = useSearchParams().get("action");

  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(
    ""
  );

  /* Effect to transform file obtained from requiest to Local File Object */
  useEffect(() => {
    function fileToBase64(file: Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    async function fetchImagesGenerator(image: any) {
      try {
        const response = await fetch(image);
        const data = await response.blob();
        const fileName = image?.substring(image?.lastIndexOf("/") + 1);
        const imageFile = new File([data], fileName, { type: data?.type });

        // Convert file to base64 using the fileToBase64 function
        const base64Image = await fileToBase64(imageFile);
        return base64Image;
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    async function processImages() {
      // const space = /* get your space object */
      if (
        formData &&
        formData?.info?.image &&
        typeof formData?.info?.image === "string"
      ) {
        const imageFiles = [];
        const imageGenerator = await fetchImagesGenerator(formData.info.image);
        imageFiles.push(imageGenerator);
        // setImageFiles(imageFiles);
        if (imageFiles?.length >= 1)
          setFormData({
            ...formData,
            info: { ...formData.info, image: imageFiles },
          });
        setHasProcessedImages(true);
        console.log("All images processed:", imageFiles);
      }
    }
    processImages();
  }, [selectedData]);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setImageBase64(reader.result);
  //     setImageName(file.name);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (e: any): void => {
    setHasProcessedImages(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageBase64(reader.result);
      if (formData.info?.image) {
        const tempData = { ...formData };
        tempData.info.image = [reader.result];
        setFormData(tempData);
      } else {
        const tempData = { ...formData, info: { ...formData.info, image: [] } };
        tempData.info.image.push(reader.result);
        setFormData(tempData);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSpaceImage = (
    itemIndex: number,
    type: "new" | "existing"
  ): void => {
    if (type === "new") {
      const filteredImages = formData.info.image.filter(
        (image: string, index: number) => index !== itemIndex
      );
      setFormData({
        ...formData,
        info: { ...formData.info, image: filteredImages },
      });
    } else if (type === "existing") {
      const filteredImages = formData.info.image.filter(
        (image: string, index: number) => index !== itemIndex
      );
      setFormData({
        ...formData,
        info: { ...formData.info, image: filteredImages },
      });
    }
  };
  console.log(formData.info?.image);
  console.log(imageFiles);
  console.log(hasProcessedImages);

  console.log(formData.info?.image?.length);
  console.log(formData);


  const returnCountryCode = (value: string) => {
    return countryList.find((data) => data.name === value)?.code;
  };
  return (
    <section className="">
      <div className="items-start flex flex-col py-1 max-md:px-4 max-w-screen-md">
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="name" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Name of School
            </p>
            {!isLoading ? (
              <input
                id="name"
                name="name"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.name}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="schoolType" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              COLLEGE Type (OPTIONAL)
            </p>
            {!isLoading ? (
              <input
                id="schoolType"
                name="schoolType"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.schoolType}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label
            htmlFor="location"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              COUNTRY
            </p>
            {!isLoading ? (
              <FormControl fullWidth>
                <Select
                  itemID="location"
                  defaultValue="Nigeria"
                  className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                  disabled={action == "view"}
                  name="country"
                  value={formData?.info?.country || ""}
                  onChange={(e) => handleInputChange(e, "info")}
                >
                  {/* <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem> */}
                  {countryList
                    .sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
                    ?.map((country: (typeof countryList)[0], index: number) => (
                      <MenuItem key={index} className="" value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>

          <label
            htmlFor="location"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              STATE
            </p>
            {!isLoading ? (
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label p-0">Select Country</InputLabel> */}
                <Select
                  // displayEmpty
                  itemID="location"
                  defaultValue={10}
                  className="[&>*]:!py-2.5 [&>*]:!px-3 [&>*]:!rounded-md mt-1 placeholder:text-neutral-400 [&>*]:!border-none border-stone-300/70 border rounded-md text-stone-500 min-w-[180px]"
                  disabled={action == "view"}
                  name="state"
                  value={formData?.info?.state || ""}
                  onChange={(e) => handleInputChange(e, "info")}
                >
                  {/* <MenuItem className="!p-0 !hidden" value={10}>Select</MenuItem> */}
                  {State.getStatesOfCountry(
                    returnCountryCode(formData?.info?.country as string)
                  ).map((state: IState, index: number) => (
                    <MenuItem key={index} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="url" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              SCHOOL URL
            </p>
            {!isLoading ? (
              <input
                id="url"
                name="url"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.url}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="about" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              ABOUT SCHOOL (a brief information about the school)
            </p>
            {!isLoading ? (
              <textarea
                id="about"
                maxLength={1000}
                name="about"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.about}
                onChange={(e) => handleInputChange(e, "info")}
                rows={8}
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
            <p className="text-stone-500/90 text-xs ml-auto w-max leading-4">
              1000 Characters
            </p>
          </label>
        </div>
        <main className="my-2">
          <ul className="flex flex-row align-center gap-2 flex-wrap">
            {hasProcessedImages && formData.info?.image
              ? formData.info?.image?.map((image: any, index: number) => (
                  <li className="relative cursor-pointer p-20 h-[150px] w-[170px] overflow-hidden">
                    {action !== "view" && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpaceImage(index, "new")}
                        className="absolute top-0 right-0 bg-white p-1 z-[1]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    <Image
                      fill
                      src={image}
                      className="rounded-lg"
                      alt={`space ${index}`}
                    />
                  </li>
                ))
              : action &&
                action === "update" &&
                hasProcessedImages === false &&
                Array.from({ length: 1 }).map((_, item: number) => (
                  <li
                    key={item}
                    className="rounded-lg h-[150px] w-[170px] bg-neutral-200 animate-pulse"
                  />
                ))}
            {action !== "view" && (
              <div className="flex flex-col gap-2">
                <h3 className="text-[rgba(60,60,60,1)] text-xs">IMAGE</h3>
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer p-20 h-[200px] w-[270px] border-dashed border-[1.5px] rounded-2xl  border-[#DEDEDE] flex br-5 items-center justify-center flex-col"
                >
                  {/* <p className="no-m-p text-[40px] absolute z-[1]">+</p> */}
                  <Image
                    src={fileUpload}
                    width={500}
                    height={500}
                    alt="file upload"
                    className="!h-[3.5rem] !w-[3.5rem] object-contain !max-w-none"
                  />
                  <div className="flex flex-col absolute bottom-6">
                    <p className="text-[#98A2B3] text-xs text-[rgba(255,69,18,1)] text-center">
                      Click to upload{" "}
                      <span className="text-[#475367]">or drag and drop</span>
                    </p>
                    <p className="text-[#98A2B3] text-xs text-center">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  <input
                    disabled={isSubmitting ? true : false}
                    accept="image/*"
                    onChange={handleImageUpload}
                    type="file"
                    id="image-upload"
                    className="invisible"
                  />
                </label>
              </div>
            )}
          </ul>
        </main>
      </div>
    </section>
  );
}
