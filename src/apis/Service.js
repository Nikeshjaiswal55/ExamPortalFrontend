import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {SubIdSplit} from '../utils/SubIdSplit'

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:9090"
// const baseUrl = "https://exameasy.onrender.com/"
// const baseUrl = "http://192.168.0.202:9090"
const baseUrl = "http://192.168.180.59:9090"
// const baseUrl = "http://192.168.180.155:9090"



export const adminApi = createApi({
    reducerPath: 'adminApi',
    tagTypes: ['getAllCourse','getAllAssissment','getOrgernization'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers,{getState}) => {
            const accessToken = localStorage.getItem('accessToken');
            if(accessToken) {
                headers.set('Authorization',`Bearer ${accessToken}`);
            }
            headers.set('Content-Type','application/json');
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => `posts`,
        }),
        getUser: builder.query({
            query: () => {
                const users = JSON.parse(localStorage.getItem('users'));
                const userId = SubIdSplit(users?.sub);
                return {
                    url: `/user/byid/${userId}`,
                    method: 'get',
                }

            }
        }),
        postOrganisationDetails: builder.mutation({
            query: (orgDetail) => {
                const {accessToken,...organisationDetails} = orgDetail;
                return {
                    url: `/createorgnization`,
                    method: 'POST',
                    body: organisationDetails,
                }
            },
            invalidatesTags: ['getOrgernization'],
        }),
        getOrgernization: builder.query({
            query: () => {
                const users = JSON.parse(localStorage.getItem('users'));
                const userId = SubIdSplit(users?.sub);
                return {
                    url: `/getOrgnizationByUserId/${userId}`,
                    method: 'get',
                }
            },
            providesTags: ['getOrgernization']
        }),
        getAllCourses: builder.query({
            query: ({accessToken,userId}) => {
                return {
                    url: `course/byUserId/${userId}`,
                    method: "GET",
                }
            },
            providesTags: ['getAllCourse'],
        }),
        deleteCourse: builder.mutation({
            query: (payload) => {
                const {accessToken,id} = payload;
                return {
                    url: `course/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['getAllCourse'],
        }),
        updateCourse: builder.mutation({
            query: (payload) => {
                const {accessToken,...updateCourseDetail} = payload;
                return {
                    url: `course/update`,
                    method: "PUT",
                    body: updateCourseDetail,
                }
            },
            invalidatesTags: ['getAllCourse'],
        }),
        addCourse: builder.mutation({
            query: (addCourse) => {
                const {accessToken,...addCourseDetails} = addCourse;
                return {
                    url: `/course/create`,
                    method: 'post',
                    body: addCourse,
                }
            },
            invalidatesTags: ['getAllCourse'],
        }),
        postAssignment: builder.mutation({
            query: (data) => {
                const {accessToken,...assignmentData} = data;
                return {
                    url: `/create/paper`,
                    method: 'post',
                    body: assignmentData,
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
                }
            },
            providesTags: ['getAllAssissment'],
        }),
        deleteAssignment: builder.mutation({
            query: (payload) => {
                return {
                    url: `/deletePaperByPaperID/${payload}`,
                    method: "DELETE",

                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getStudentOnPerticularAssignment: builder.query(
            {
                query: (paperId) => {
                    return {
                        url: `/GetAllStudentByPaperId/${paperId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getAllQuestionsFromPaperId: builder.query({
            query: (payload) => {
                const [accessToken,paperID] = payload;

                return {
                    url: `/getPaperbyPaperId/${paperID}`,
                    method: 'GET',
                }
            },
        }),
        postSaveResult: builder.mutation({
            query: (payload) => {
                const [accessToken,result] = payload;
                return {
                    url: "/saveresult",
                    method: "POST",
                    body: result,
                }
            }
        }),
        getAllAssissmentOnstudentPage: builder.query(
            {
                query: (stdId) => {
                    return {
                        url: `/getall/Assesment/${stdId}`,
                        method: 'get',
                    }
                }
            }
        ),
        putActivePaper: builder.mutation({
            query: ({paperId,paperActive}) => {
                return {
                    url: `/activetPaper/${paperId}/${paperActive}`,
                    method: 'put',
                }
            },
        }),
        invitedStudentByMail: builder.mutation({
            query: (payload) => {
                return {
                    url: `/inviteStudents/`,
                    method: 'post',
                    body: payload,
                }
            }
        }),
        getTop5Assissment: builder.query(
            {
                query: (adminId) => {
                    return {
                        url: ` http://localhost:3000/getTop5Assesment`,
                        // url: `/getTop5Assesment/${adminId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getTop3AssissmentStudents: builder.query(
            {
                query: (AssessmentId) => {
                    return {
                        url: `/getTopperByPaperId/${AssessmentId}`,
                        // url: `/getTop5Assesment/${adminId}`,
                        method: 'get',
                    }
                }
            }
        )
    }),


})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useInvitedStudentByMailMutation,useGetTestQuery,usePutActivePaperMutation,useGetAllAssissmentOnstudentPageQuery,useDeleteAssignmentMutation,useGetAllCoursesQuery,useDeleteCourseMutation,useUpdateCourseMutation,usePostOrganisationDetailsMutation,useAddCourseMutation,useGetOrgernizationQuery,usePostAssignmentMutation,useGetAssignmentQuery,useGetStudentOnPerticularAssignmentQuery,useGetUserQuery,useGetAllQuestionsFromPaperIdQuery,usePostSaveResultMutation,useGetTop3AssissmentStudentsQuery,useGetTop5AssissmentQuery} = adminApi;
