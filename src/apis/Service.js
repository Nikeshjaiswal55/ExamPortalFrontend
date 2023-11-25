import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:3000/"

const baseUrl = "http://192.168.0.237:9090"


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => `posts`,
        }),
        postOrganisationDetails: builder.mutation({
            query: (orgDetail) => {
                const { accessToken, ...organisationDetails } = orgDetail;

                console.log("accessToken :-  ", accessToken);
                console.log("orgDetails ;- ", JSON.stringify(organisationDetails));

                return {
                    url: `/createorgnization`,
                    method: 'post',
                    body: organisationDetails,
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            }
        }),
        postAssignment: builder.mutation({
            query: (data) => {
                const { accessToken, ...assignmentData } = data;
                return {
                    url: `/create/paper`,
                    method: 'post',
                    body: assignmentData,
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            }
        }),
        getOrgernization: builder.query({
            query: (data) => {
                const { accessToken, id } = data;
                return {
                    url: `/getOrgnizationByUserId/${id}`,
                    method: 'get',
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            }
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTestQuery, usePostOrganisationDetailsMutation,usePostAssignmentMutation,useGetOrgernizationQuery } = adminApi;