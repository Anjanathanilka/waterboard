import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("profile"))?.token; //getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: ["Vacancy", "AppBasicDetails"],
  endpoints: (builder) => ({
    getMasterData: builder.query({
      query: () => `common/masterData`,
      providesTags: ["masterData"],
    }),
    getVacancies: builder.query({
      query: () => `/vacancy`,
      providesTags: ["Vacancy"],
    }),
    getVacancyBySearch: builder.query({
      query: (searchQuery) => ({
        url: `/vacancy/search/`,
        params: { ...searchQuery },
      }),
      providesTags: ["Vacancy"],
    }),
    getAppBasicDetails: builder.query({
      query: ({ userId }) => ({
        url: `/application/basicDetails/?userId=${userId}`,
      }),
      providesTags: ["AppBasicDetails"],
    }),
    createAppBasicDetails: builder.mutation({
      query: (createReq) => ({
        url: `/application/addBasicDetails`,
        method: "POST",
        body: createReq,
      }),
      invalidatesTags: ["AppBasicDetails"],
    }),
    getAppEduDetails: builder.query({
      query: ({ userId }) => ({
        url: `application/eduDetails/?userId=${userId}`,
      }),
      providesTags: ["AppEduDetails"],
    }),
    getAppEduDetailById: builder.query({
      query: ({ id }) => ({
        url: `/application/eduDetail/?eduId=${id}`,
      }),
      providesTags: ["AppEduDetails"],
    }),
    createAppEduDetails: builder.mutation({
      query: (createEduReq) => {
        const formData = new FormData();
        formData.append("userId", createEduReq.userId);
        formData.append("eduTypeId", createEduReq.eduTypeId);
        formData.append("eduDetailsId", createEduReq?.eduDetailsId);
        formData.append("endDate", createEduReq.endDate);
        formData.append("startDate", createEduReq.startDate);
        formData.append("fieldOfStudy", createEduReq.fieldOfStudy);
        formData.append("grade", createEduReq.grade);
        formData.append("instituteName", createEduReq.instituteName);
        formData.append("qualification", createEduReq.qualification);
        formData.append("attachmentPath", createEduReq.attachmentPath);
        formData.append("attachment", createEduReq.attachment);
        return {
          url: `/application/addEduDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppEduDetails"],
    }),
    deleteEduDetails: builder.mutation({
      query: ({ detailId }) => ({
        url: `/application/deleteEduDetails/?eduId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppEduDetails"],
    }),
    createAppExpDetails: builder.mutation({
      query: (createExpReq) => {
        const formData = new FormData();
        formData.append("expDetailId", createExpReq?.expDetailId);
        formData.append("userId", createExpReq.userId);
        formData.append("title", createExpReq.title);
        formData.append("organization", createExpReq.organization);
        formData.append("endDate", createExpReq.endDate);
        formData.append("startDate", createExpReq.startDate);
        formData.append("description", createExpReq.description);
        formData.append("attachmentPath", createExpReq.attachmentPath);
        formData.append("attachment", createExpReq.attachment);
        return {
          url: `/application/addExpDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppExpDetails"],
    }),
    deleteExpDetails: builder.mutation({
      query: ({ detailId }) => ({
        url: `/application/deleteExpDetails/?eduId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppExpDetails"],
    }),
    getAppExpDetails: builder.query({
      query: ({ userId }) => ({
        url: `application/expDetails/?userId=${userId}`,
      }),
      providesTags: ["AppExpDetails"],
    }),
    createAppAchvDetails: builder.mutation({
      query: (createAchvReq) => {
        const formData = new FormData();
        formData.append("achvDetailId", createAchvReq?.achvDetailId);
        formData.append("userId", createAchvReq.userId);
        formData.append("title", createAchvReq.title);
        formData.append("organization", createAchvReq.organization);
        formData.append("endDate", createAchvReq.endDate);
        formData.append("startDate", createAchvReq.startDate);
        formData.append("description", createAchvReq.description);
        formData.append("attachmentPath", createAchvReq.attachmentPath);
        formData.append("attachment", createAchvReq.attachment);
        return {
          url: `/application/addAchvDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppAchvDetails"],
    }),
    getAppAchvDetails: builder.query({
      query: ({ userId }) => ({
        url: `application/achvDetails/?userId=${userId}`,
      }),
      providesTags: ["AppAchvDetails"],
    }),
    deleteAchvDetails: builder.mutation({
      query: ({ detailId }) => ({
        url: `/application/deleteAchvDetails/?eduId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppAchvDetails"],
    }),
    createUplodDocuments: builder.mutation({
      query: (fileUploadReq) => {
        const formData = new FormData();
        formData.append("userId", fileUploadReq.userId);
        formData.append("vacancyId", fileUploadReq.vacancyId);
        formData.append("docPath", fileUploadReq.docPath);
        formData.append("document", fileUploadReq.doc);
        formData.append("docType", fileUploadReq.docType);
        return {
          url: `/application/uploadDocs`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["uploadDocs"],
    }),
  }),
});

export const {
  useGetMasterDataQuery,
  useGetVacanciesQuery,
  useGetVacancyBySearchQuery,
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
  useGetAppEduDetailsQuery,
  useCreateAppEduDetailsMutation,
  useDeleteEduDetailsMutation,
  useCreateAppExpDetailsMutation,
  useCreateAppAchvDetailsMutation,
  useGetAppExpDetailsQuery,
  useGetAppAchvDetailsQuery,
  useDeleteAchvDetailsMutation,
  useDeleteExpDetailsMutation,
  useCreateUplodDocumentsMutation,
} = api;
