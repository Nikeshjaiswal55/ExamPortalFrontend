import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:3000/"

const baseUrl = "http://192.168.0.201:9090/"


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => `posts`,
        }),
        postOrganisationDetails: builder.mutation({
            query: (orgDetail) => {
                const {accessToken,...organisationDetails} = orgDetail;

                console.log("accessToken :-  ",accessToken);
                console.log("orgDetails ;- ",JSON.stringify(organisationDetails));

                return {
                    url: `/createorganisation`,
                    method: 'post',
                    body: organisationDetails,
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
export const {useGetTestQuery,usePostOrganisationDetailsMutation} = adminApi;