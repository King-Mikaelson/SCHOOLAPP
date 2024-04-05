export const schoolInitialState: Partial<{
  info: {
    name: string;
    schoolType: string;
    state: string;
    country: string;
    url: string;
    about: string;
    programs?:never[],
    _id?:string | number,
    __v?:string,
    image?:string | string[]
  };
  schoolId?: string;
}>  = {
  info: {
    name: "",
    schoolType: "",
    state: "",
    country: "",
    url: "",
    about: "",
    _id: "",
    __v: "",
    programs: [],
  },
} 


type Info = {
  name: string;
  schoolType: string;
  state: string;
  country: string;
  url: string;
  about: string;
  programs?:never[],
  _id?:string | number,
  __v?:string,
  image?:string | string[],
  schoolId?:string
};

type Program = {
  name: string;
  programType: string;
  duration: string;
  degreeType: string;
  startDate: string;
  classType: string;
  about: string;
  currency: string;
  tuitionFee: string;
  otherFee: string;
  requiredDocuments: string[];
  needBasedScholarships: boolean;
  meritBasedScholarships: boolean;
  OnCampus: boolean;
  OffCampus: boolean;
};

type Tuition = {
  tuitionFee: string;
  otherFee: string;
  otherInformation: string;
  currency: string;
};

type AdmissionRequirement = {
  requiredDocuments: string[];
  financialAid: string[];
  accomodationOptions: string[];
};

type Other = {
  availableInternshipOpportunities: string;
  formOfAssement: string;
  availableInternationalStudentSupport: string;
  availableStudentArrivalSupport: string;
  academicRequirements: string[];
  requiredDocuments: string[];
};


type SchoolInformationInitialState = {
  info: Info | undefined;
  program: Program;
  tuition?: Tuition;
  admissionRequirement?: AdmissionRequirement;
  other?: Other;
  schoolId?: string;
};



export const schoolInformationInitialState : SchoolInformationInitialState = {
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