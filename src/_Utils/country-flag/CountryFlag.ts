import countryFlagList from "./dist/mod_index.json";

export const getCountryFlagFromCode = (code2: string) => {
  let returnedImage;
  countryFlagList.map((country: any, index: number) => {
    if (country.code === code2) {
      returnedImage = country.image
    }
  })
  return returnedImage;
}