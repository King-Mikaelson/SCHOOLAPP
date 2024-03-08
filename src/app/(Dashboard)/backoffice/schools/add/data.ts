export const schoolInitialState = {
  info: {
    name: "",
    schoolType: "",
    state: "",
    country: "",
    url: "",
    about: "",
  },
  schoolId: "",
};


export const schoolInformationInitialState = {
  info: {
    name: "",
    schoolType: "",
    state: "",
    country: "",
    url: "",
    about: "",
  },
  program: {
    name: "",
    programType: "",
    duration: "",
    degreeType: "",
    startDate: "",
    classType: "",
    about: "",
    currency: "USD",
    tuitionFee: "",
    otherFee: "",
   requiredDocuments: ["","","",""],
   needBasedScholarships:false,
   meritBasedScholarships:false,
   OnCampus:false,
   OffCampus:false,
  },
  tuition: {
    tuitionFee: "",
    otherFee: "",
    otherInformation: "",
    currency: "USD",

    // tuitionFee: 0,
    // avgAccomodationCost: 0,
    // avgFeedingCost: 0,
    // avgTransportationCost: 0,
    // avgLivingCost: 0,
    // currency: "USD",
    // other: "",
  },
  admissionRequirement: {
    requiredDocuments: ["","","",""],
    financialAid: ["","","",""],
    accomodationOptions: ["","","",""],
  },
  other: {
    availableInternshipOpportunities: "true",
    formOfAssement: "Physical",
    availableInternationalStudentSupport: "true",
    availableStudentArrivalSupport: "true",
    academicRequirements: ["","","",""],
    requiredDocuments: ["","","",""],
  },
  schoolId: "",

};