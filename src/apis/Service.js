import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {SubIdSplit} from '../utils/SubIdSplit'

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:9090"
// const baseUrl = "http://exam-easy.up.railway.app"
const baseUrl = "http://192.168.205.155:9090"
// const baseUrl = "http://192.168.0.237:9090"


export const adminApi = createApi({
    reducerPath: 'adminApi',
    tagTypes: ['getAllCourse','getAllAssissment','getOrgernization'],
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => `posts`,
        }),
        getAllCourses: builder.query({
            query: ({accessToken,userId}) => {
                console.log("accessToken",accessToken)
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
                const {accessToken,id} = payload;
                console.log("accessToken",accessToken);
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
                const {accessToken,...updateCourseDetail} = payload;
                console.log("accessToken",accessToken);
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
                const {accessToken,...organisationDetails} = orgDetail;
                console.log("accessToken :-  ",accessToken);
                console.log("orgDetails ;- ",JSON.stringify(organisationDetails));
                return {
                    url: `/createorgnization`,
                    method: 'POST',
                    body: organisationDetails,
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            },
            invalidatesTags: ['getOrgernization'],
        }),

        addCourse: builder.mutation({
            query: (addCourse) => {
                const {accessToken,...addCourseDetails} = addCourse;
                console.log("accessToken :-  ",accessToken);
                console.log("create course details ;- ",JSON.stringify(addCourseDetails));

                console.log("create course:",addCourse)
                return {
                    url: `/course/create`,
                    method: 'post',
                    body: addCourse,
                }
            }
        }),
        postAssignment: builder.mutation({
            query: (data) => {
                const {accessToken,...assignmentData} = data;
                return {
                    url: `/create/paper`,
                    method: 'post',
                    body: assignmentData,
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getAssignment: builder.query({
            query: (data) => {
                const {accessToken,id} = data;
                return {
                    url: `/getAllPaperbyUserId/${id}`,
                    method: 'get',
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            },
            providesTags: ['getAllAssissment']
        }),
        getOrgernization: builder.query({
            query: () => {
                const accessToken = localStorage.getItem('accessToken');
                const users = JSON.parse(localStorage.getItem('users'));
                const userId = SubIdSplit(users?.sub);
                return {
                    url: `/getOrgnizationByUserId/${userId}`,
                    method: 'get',
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            },
            providesTags: ['getOrgernization']
        }),
        getStudentOnPerticularAssignment: builder.query(
            {
                query: (paperId) => {
                    const accessToken = localStorage.getItem('accessToken')
                    return {
                        url: `/GetAllStudentByPaperId/${paperId}`,
                        method: 'get',
                        headers: {
                            "Content-Type": 'application/json;',
                            "Authorization": `Bearer ${accessToken}`
                        }

                    }
                }
            }
        ),
        deleteAssignment: builder.mutation({
            query: (payload) => {
                const accessToken = localStorage.getItem('accessToken')
                console.log("accessToken",accessToken);
                console.log(payload);
                return {
                    url: `/deletePaperByPaperID/${payload}`,
                    method: "DELETE",

                }
            },
        }),
        getUser: builder.query({
            query: () => {
                const users = JSON.parse(localStorage.getItem('users'));
                const accessToken = localStorage.getItem('accessToken');
                const userId = SubIdSplit(users?.sub);
                // const { accessToken, id } = data;
                return {
                    url: `/user/byid/${userId}`,
                    method: 'get',
                    headers: {
                        "Content-Type": 'application/json;',
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            },
        })
    }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetTestQuery,useDeleteAssignmentMutation,useGetAllCoursesQuery,useDeleteCourseMutation,useUpdateCourseMutation,usePostOrganisationDetailsMutation,useAddCourseMutation,useGetOrgernizationQuery,usePostAssignmentMutation,useGetAssignmentQuery,useGetStudentOnPerticularAssignmentQuery,useGetUserQuery} = adminApi;
