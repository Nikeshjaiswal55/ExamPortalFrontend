import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:3000/"
// const baseUrl = "http://exam-easy.up.railway.app"

const baseUrl = "http://192.168.0.237:9090"


export const adminApi = createApi({
    reducerPath: 'adminApi',
    tagTypes: ['getAllCourse'],
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => `posts`,
        }),
        getAllCourses: builder.query({
            query: ({accessToken,userId}) => {
                console.log("accessToken", accessToken)
                return {
                    url: `course/byUserId/${userId}`,
                    method: "GET",
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }

                }
            },
            providesTags: ['getAllCourse'],

        }),
        deleteCourse: builder.mutation({
            query: (payload) => {
                const { accessToken, id } = payload;
                console.log("accessToken", accessToken);
                console.log(id);
                return {
                    url: `course/${id}`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }

                }
            },
            invalidatesTags: ['getAllCourse'],

        }),
        updateCourse: builder.mutation({
            query: (payload) => {
                const { accessToken, ...updateCourseDetail } = payload;
                console.log("accessToken", accessToken);
                return {
                    url: `course/update`,
                    method: "PUT",
                    body: updateCourseDetail,
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }

                }
            },
            invalidatesTags: ['getAllCourse'],
        }),

        postOrganisationDetails: builder.mutation({
            query: (orgDetail) => {
                const { accessToken, ...organisationDetails } = orgDetail;
                console.log("accessToken :-  ", accessToken);
                console.log("orgDetails ;- ", JSON.stringify(organisationDetails));
                return {
                    url: `/createorgnization`,
                    method: 'POST',
                    body: organisationDetails,
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            }
        }),

        addCourse: builder.mutation({
            query: (addCourse) => {
                const { accessToken, ...addCourseDetails } = addCourse;
                console.log("accessToken :-  ", accessToken);
                console.log("create course details ;- ", JSON.stringify(addCourseDetails));

                console.log("create course:", addCourse)
                return {
                    url: `/course/create`,
                    method: 'post',
                    body: addCourse,
        }}}),
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
export const { useGetTestQuery, useGetAllCoursesQuery, useDeleteCourseMutation, useUpdateCourseMutation, usePostOrganisationDetailsMutation, useAddCourseMutation,useGetOrgernizationQuery,usePostAssignmentMutation } = adminApi;
