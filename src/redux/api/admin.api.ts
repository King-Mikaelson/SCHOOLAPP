"use client"

import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery: any = fetchBaseQuery({
  // baseUrl: 'https://gt-western-backend.onrender.com/api/v1/',
  baseUrl: 'https://gt-agency-backend-api-deployment.onrender.com/api/v1/',
  headers: {
    Authorization: typeof window !== "undefined" ? `Bearer ${JSON.parse(localStorage?.getItem("userToken") as string)?.jwt}` : ""
  }
})


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (typeof window != "undefined") {
        // console.log(result)
        // if (result.error.data?.message === "invalid token!") localStorage.removeItem("userToken")
      }
    // your logic here
  }
  return result
}

const api = createApi({
  reducerPath: "userApi",
  tagTypes: ["schoolApplication", "visaApplication", "school"],
  // baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://gt-western-backend.onrender.com/api/v1/",
   
  //   headers: {
  //     // Authorization: typeof window !== "undefined" ? `Bearer ${JSON.parse(localStorage?.getItem("userToken") as string)?.jwt}` : ""
  //     // @ts-ignore;
  //     Authorization: `Bearer ${JSON.parse(localStorage?.getItem("userToken") as string)?.jwt}`
  //   }
  // }),
  baseQuery: async (arg, api, extraOptions) => {
    console.log(api.endpoint)
    console.log(api)
    // Wait for localStorage to be accessible
    if (!["clientGetSchools", "addVisaApplication", "addSchoolapplication", "clientGetSchools", "clientSearchSchools", "signIn", "addAdmin", "sendRecoveryToken", "resetPassword", "getSchoolPrograms","getSchoolsInCountry"].includes(api.endpoint)) {
      await new Promise((resolve: any) => {
        const checkTokenAvailability = () => {
          const userToken = localStorage.getItem("userToken");
          // if (typeof window !== "undefined") {
          if (userToken) {
            resolve();
          } else {
            setTimeout(checkTokenAvailability, 200);
          }
        };
  
        checkTokenAvailability();
      });
    }
   

    // Now that localStorage is accessible, proceed with the actual request
    const result = await fetchBaseQuery({
      // baseUrl: "https://gt-western-backend.onrender.com/api/v1/",
      baseUrl: 'https://gt-agency-backend-api-deployment.onrender.com/api/v1/',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken") as string)?.jwt}`,
      },
    })(arg, api, extraOptions);

    return result;
  },
  endpoints: (builder) => ({
    getSchoolApplications: builder.query({
      query: ({ direction, cursor }) => `admin/application-mgmt/school-applications${direction ? `?direction=${direction}` : ""}${cursor ? `&cursor=${cursor}` : ""}`,
      providesTags: () => [{ type: "schoolApplication" }],
      transformResponse: (response: any) => response?.data,
    }),
    getVisaApplications: builder.query({
      query: ({ direction, cursor }) => `admin/application-mgmt/visa-applications${direction ? `?direction=${direction}` : ""}${cursor ? `&cursor=${cursor}` : ""}`,
      providesTags: () => [{ type: "visaApplication" }],
      transformResponse: (response: any) => response?.data,
    }),
    getApplications: builder.query({
      query: ({ direction, cursor }) => `admin/application-mgmt/applications${direction ? `?direction=${direction}` : ""}${cursor ? `&cursor=${cursor}` : ""}`,
      providesTags: () => [{ type: "visaApplication" }, { type: "schoolApplication" }],
    }),
    getVisaApplicationStats: builder.query({
      query: () => "admin/application-mgmt/visa-applications/stats",
      providesTags: () => [{ type: "visaApplication" }]
    }),
    getSchoolApplicationStats: builder.query({
      query: () => "admin/application-mgmt/school-applications/stats",
      providesTags: () => [{ type: "schoolApplication" }]
    }),
    getApplicationStats: builder.query({
      query: () => "admin/application-mgmt/applications/stats",
      providesTags: () => [{ type: "visaApplication" }, { type: "schoolApplication" }]
    }),
    addSchoolapplication: builder.mutation({
      query: (formdata) => ({
        url: "applications/school-applications",
        method: "POST",
        body: formdata
      })
    }),
    updateSchoolApplication: builder.mutation({
      query: (formData) => ({
        url: `admin/application-mgmt/school-applications/${formData.get("schoolApplicationId")}`,
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: () => [{ type: "schoolApplication"}]
    }),
    deleteSchoolApplication: builder.mutation({
      query: (schoolId) => ({
        url: `admin/application-mgmt/school-applications/${schoolId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "schoolApplication" }]
    }),
    searchSchoolApplication: builder.query({
      query: (queries) => `admin/application-mgmt/school-applications/search?${queries}`,
      providesTags: () => [{ type: "schoolApplication" }],
    }),
    addVisaApplication: builder.mutation({
      query: (formData) => ({
        url: "applications/visa-applications",
        method: "POST",
        body: formData
      }),
      invalidatesTags: () => [{ type: "visaApplication" }]
    }),
    updateVisaApplication: builder.mutation({
      query: (formData) => ({
        url: `/admin/application-mgmt/visa-applications/${formData?.visaApplicationId}`,
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: () => [{ type: "visaApplication" }]
    }),
    deleteVisaApplication: builder.mutation({
      query: (visaId) => ({
        url: `admin/application-mgmt/visa-applications/${visaId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "visaApplication" }]
    }),
    searchVisaApplications: builder.query({
      query: (queries) => `admin/application-mgmt/visa-applications/search?${queries}`,
      providesTags: () => [{ type: "visaApplication" }],
    }),

    /* ================ */
    /* School Endpoints */
    /* ================ */
    clientGetSchools: builder.query({
      query: ({ direction, cursor }) => `schools${direction ? `?direction=${direction}` : ""}${cursor ? `&cursor=${cursor}` : ""}`,
      transformResponse: (response: any) => response?.data,
      providesTags: () => [{ type: "school" }]
    }),
    getSchools: builder.query({
      query: ({ direction, cursor }) => `admin/school-mgmt/schools${direction ? `?direction=${direction}` : ""}${cursor ? `&cursor=${cursor}` : ""}`,
      transformResponse: (response: any) => response?.data,
      providesTags: () => [{ type: "school" }]
    }),
      getSchoolsInCountry:builder.query({
        query: (location) => `schools/search?location=${location ? location : ""}`,
        transformResponse: (response: any) => response?.data,
        providesTags: () => [{ type: "school" }]
      }),
      getProgramsInSchools:builder.query({
        query: (school) => `schools/programs?school=${school}`,
        transformResponse: (response: any) => response?.data,
        providesTags: () => [{ type: "school" }]
      }),
    getSchoolPrograms: builder.query({
      query: () => "/schools/programs",
      transformResponse: (response: any) => response?.data,
    }),
    clientSearchSchools: builder.query({
      query: (searchQuery) =>  `schools/search?${searchQuery}`,
      transformResponse: (response: any) => response?.data,
    }),
    filterSchools: builder.query({
      query: (searchQuery) => `admin/school-mgmt/schools/search?${searchQuery}`,
      transformResponse: (response: any) => response?.data,
    }),

    addSchool: builder.mutation({
      query: (formData) => ({
        url: "admin/school-mgmt/schools",
        method: "POST",
        body: formData
      }),
      invalidatesTags: () => [{ type: "school" }]
    }),

    updateSchool: builder.mutation({
      query: (formData) => ({
        url: `admin/school-mgmt/schools/${formData.get("schoolId")}`,
        method: "PATCH",
        body: formData
      }),
      transformResponse: (response: any) => response?.data,
      invalidatesTags: () => [{ type: "school" }]
    }),

    deleteSchool: builder.mutation({
      query: (schoolId) => ({
        url: `admin/school-mgmt/schools/${schoolId}`,
        method: "DELETE"
      }),
      invalidatesTags: () => [{ type: "school" }]
    }),

    /* ================ */
    /*  MISC Endpoints  */
    /* ================ */
    addContactUs: builder.mutation({
      query: (formData) => ({
        url: "supports/contact-us",
        method: "POST",
        body: formData
      })
    }),
    addBookConsultation: builder.mutation({
      query: (formData) => ({
        url: "supports/consultations",
        method: "POST",
        body: formData
      })
    }),

    /* ================ */
    /*  Auth Endpoints  */
    /* ================ */
    addAdmin: builder.mutation({
      query: (formData) => ({
        url: "admin",
        method: "POST",
        body: formData,
      }),
      
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: "admin/auth/login",
        method: "POST",
        body: formData
      })
    }),
    sendRecoveryToken: builder.mutation({
      query: (formData) => ({
        url: "admin/auth/account-recovery/send-token",
        method: "PATCH",
        body: formData
      })
    }),
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: "admin/auth/account-recovery/reset-password",
        method: "PATCH",
        body: formData
      })
    })

  })
})

export default api;
