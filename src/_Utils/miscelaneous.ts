export const splitInThousand = (num: string) => {
  const addCommas = (num: any) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num: any) => num?.toString().replace(/[^0-9]/g, "");
  return addCommas(removeNonNumeric(num));
}

export function extractCountryCodeAndNumber(phoneNumber: string) {
  const numericPhoneNumber = phoneNumber?.replace(/\D/g, '');
  const phoneNumberDigits = numericPhoneNumber?.slice(-10);
  const countryCodeDigits = numericPhoneNumber?.slice(0, -10);
  return {
    countryCode: countryCodeDigits,
    number: phoneNumberDigits
  };
}

export function formatDate(input: string) {
  let date, month, year;

  const inputDate = new Date(input);

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date
    .toString()
    .padStart(2, '0');

  month = month
    .toString()
    .padStart(2, '0');

  if (input) return `${date}-${month}-${year}`;
}

// export const getCountryFlagFromCode = (code2: string) => {
//   let returnedImage;
//   countryFlagList.map((country: any, index: number) => {
//     if (country.code === code2) {
//       returnedImage = country.image
//     }
//   })
//   return returnedImage;
// }