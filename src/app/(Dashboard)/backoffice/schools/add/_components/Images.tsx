import Image from "next/image"
import { schoolInformationInitialState } from "../data"
import { useEffect, useState } from "react"

interface IProps {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  isSubmitting: boolean
  handleFlatArrayInputChange: (e: any, index: number, property: keyof typeof schoolInformationInitialState, nestedProperty: string) => void
  selectedData: any
  imageFiles: any
  setImageFiles: React.Dispatch<React.SetStateAction<any>>
  hasProcessedImages: any
  setHasProcessedImages: React.Dispatch<React.SetStateAction<any>>
}

export default function SchoolImages({ formData, setFormData, isLoading, isSubmitting, selectedData, handleFlatArrayInputChange, imageFiles, setImageFiles, hasProcessedImages, setHasProcessedImages }: IProps){

  const [ newImageFiles, setNewImageFiles ] = useState<Array<any>>([]);
  // const [ hasProcessedImages, setHasProcessedImages ] = useState<boolean>(false);

  /* Effect to transform file obtained from requiest to Local File Object */
  useEffect(() => {

    async function* fetchImagesGenerator(images: any) {
      for (const image of images) {
        try {
          const response = await fetch(image?.url);
          const data = await response.blob();
          const fileName = image?.url.substring(image?.url.lastIndexOf('/') + 1);
          const imageFile = new File([data], fileName, { type: data?.type });
          yield imageFile;
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    
    async function processImages() {
      // const space = /* get your space object */
      if (formData && formData.images) {
        const imageFiles = [];
        const imageGenerator = fetchImagesGenerator(formData.images);
    
        for await (const imageFile of imageGenerator) {
          imageFiles.push(imageFile);
        }
        setImageFiles(imageFiles);
        if(imageFiles?.length >= 1) setFormData({ ...formData, images: imageFiles });
        setHasProcessedImages(true);
        console.log("All images processed:", imageFiles);
      }
    }
    processImages();
  }, [ selectedData ]);


  const handleImageUpload = (e: any): void => {
    if (formData?.images){
      const tempData = { ...formData };
      tempData.images = [ ...formData?.images, ...e.target.files];
      setFormData(tempData);
    } else {
      const tempData = { ...formData, images: [] };
      tempData.images.push(...e.target.files);
      setFormData(tempData);
    }
  }

  const handleRemoveSpaceImage = (itemIndex: number, type: ("new"|"existing")): void => {
    if (type === "new") {
      const filteredImages = formData.images.filter((image: string, index: number) => (
        index !== itemIndex
      ))
      setFormData({ ...formData, images: filteredImages });;
    } else if (type === "existing") {
      const filteredImages = formData.IMAGES.filter((image: string, index: number) => (
        index !== itemIndex
      ))
      setFormData({ ...formData, IMAGES: filteredImages });
    }
  }
  console.log(formData.images)
  console.log(imageFiles);
  return (
    <main className="my-2">
      <ul className="flex flex-row align-center gap-2 flex-wrap">
        {/* {
          imageFiles
          && (
            imageFiles?.map((image: any, index: number) => (
              <li className="relative cursor-pointer p-20 h-[150px] w-[170px] overflow-hidden">
                <button onClick={() => handleRemoveSpaceImage(index, "existing")} className="absolute top-0 right-0 bg-white p-1 z-[1]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <Image fill src={URL.createObjectURL(image)} alt={`space ${index}`} className="rounded-lg" />
              </li>
            ))
          )
        } */}
        {
          hasProcessedImages && formData?.images
          ? (
            formData?.images?.map((image: any, index: number) => (
            <li className="relative cursor-pointer p-20 h-[150px] w-[170px] overflow-hidden">
              <button type="button" onClick={() => handleRemoveSpaceImage(index, "new")} className="absolute top-0 right-0 bg-white p-1 z-[1]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
              <Image fill src={!image?.url ? URL.createObjectURL(image): ""} className="rounded-lg" alt={`space ${index}`} />
              {/* <Image fill className="rounded-lg" src={image?.url} alt={`space ${index}`} /> */}
            </li>
            ))
          ) : (
            Array.from({length: 5 }).map((_, item: number) => <li key={item} className="rounded-lg h-[150px] w-[170px] bg-neutral-200 animate-pulse" />)
          )
        }
        {
          formData?.images?.length === 0
          && (
            <label htmlFor="image-upload" className="relative cursor-pointer p-20 h-[150px] w-[170px] border-dashed border rounded-lg border-neutral-700 flex br-5 items-center justify-center max-content">
              <p className="no-m-p text-[40px] absolute z-[1]">+</p>
              <input disabled={isSubmitting ? true : false} accept="image/*" onChange={handleImageUpload} type="file" id="image-upload" className="invisible" />
            </label>
          )
        }
      </ul>
    </main>
  )
}