import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SubIdSplit } from '../utils/SubIdSplit'
import { LocalStorageCache } from '@auth0/auth0-spa-js';

// Define a service using a base URL and expected endpoints
// const baseUrl = " http://localhost:9091"
// const baseUrl = "https://exameasy-krishna.onrender.com"
// const baseUrl = "http://192.168.8.162:9090"
// const baseUrl = "http://192.168.180.59:9090"
const baseUrl = "http://192.168.58.155:9091"

// const baseQuery = fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: (headers, { getState }) => {
//         const refreshToken = localStorage.getItem('isRefeshToken');
//         console.log(refreshToken, refreshToken);
//         const accessToken = localStorage.getItem('accessToken');
//         // if (accessToken) {
//         //     headers.set('Authorization', `Bearer ${accessToken}`);
//         // }
//         if (refreshToken) {
//             console.log('after refresh token');
//             headers.set('Content-Type', 'application/x-www-form-urlencoded');
//             return headers;
//         } else {
//             console.log('after else refresh token');
//             headers.set('Content-Type', 'application/json');
//             headers.set('Authorization', `Bearer ${accessToken}`);
//             return headers;

//         }
//     },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     const ref_token = localStorage.getItem('refreshToken');

//     let result = await baseQuery(args, api, extraOptions);
//     console.log('result : ', result);
//     localStorage.setItem('isRefeshToken', false);

//     if (result.error && result.error.status === 401) {
//         console.log('inside 401')
//         localStorage.setItem('isRefeshToken', true);
//         try {
//             const refreshResult = await baseQuery(
//                 {
//                     url: 'https://dev-uil1ecwkoehr31jg.us.auth0.com/oauth/token',
//                     method: 'POST',
//                     body: new URLSearchParams({
//                         grant_type: 'refresh_token',
//                         client_id: 'lA9qLAs5xQxoBuCVM1AJERQoPIsopevs',
//                         client_secret: 'LvKHmQdAdkZ-wj2RWrq32VTZq4GuK_XACwrh9KvUaKdTOYE3UbiwlnI1TPFhU08N',
//                         refresh_token: ref_token,
//                     }),
//                     mode: 'no-cors',
//                 },
//                 api,
//                 extraOptions
//             );
//             console.log('refreshResult', refreshResult.body);
//             // if (refreshResult.data) {
//             //     console.log('inside refreshResult.data')
//             //     localStorage.setItem('token', refreshResult.data?.access_token);
//             //     localStorage.setItem(
//             //         'refreshToken',
//             //         refreshResult.data?.refresh_token
//             //     );
//             //     console.log('refreshResult.data', refreshResult.data);
//             //     result = await baseQuery(args, api, extraOptions);
//             // }
//             if (refreshResult.error.status === 403) {
//                 localStorage.clear();
//                 window.location.href = '/';
//             }
//         } catch (error) {
//             console.log('logout after refresh error -', error);
//         }
//     }
//     return result;
// };




export const adminApi = createApi({
    reducerPath: 'adminApi',
    tagTypes: ['getAllCourse', 'getAllAssissment', 'getOrgernization', 'submitExam'],
    // baseQuery: baseQueryWithReauth,
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        refetchOnReconnect: true,
        prepareHeaders: (headers, { getState }) => {
            // localStorage.setItem('accessToken', accessToken);
            const access_token = new LocalStorageCache();
            console.log('refesh_token : ', access_token);
            const key = access_token.allKeys().find((key) => key.includes('auth0spa'));
            const access_token_value = access_token.get(key);
            const accessToken = access_token_value?.body?.access_token;
            console.log('accessToken localllll : ', accessToken);
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            // headers.set('Content-Type', 'application/json');
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
                const { accessToken, ...organisationDetails } = orgDetail;
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
            query: ({ userId, page, size, sortField, sortOrder }) => {
                let bysize = "", bysortField = "", bySortOrder = "", byPage = "";
                if (size) {
                    bysize = `&size=${size}`;
                }
                if (sortField) {
                    bysortField = `&sortField=${sortField}`;
                }
                if (page || page == 0) {
                    byPage = `?page=${page}`;
                }
                if (sortOrder) {
                    bySortOrder = `&sortOrder=${sortOrder}`;
                }
                return {
                    url: `course/byUserId/${userId}${byPage}${bysortField}${bysize}${bySortOrder}`,
                    method: "GET",
                }
            },
            providesTags: ['getAllCourse'],
            keepUnusedDataFor: 0,
        }),
        deleteCourse: builder.mutation({
            query: (payload) => {
                const { accessToken, id } = payload;
                return {
                    url: `course/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['getAllCourse'],

        }),
        updateCourse: builder.mutation({
            query: (payload) => {
                const { accessToken, ...updateCourseDetail } = payload;
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
                const { accessToken, ...addCourseDetails } = addCourse;
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
                const { accessToken, ...assignmentData } = data;
                return {
                    url: `/create/paper`,
                    method: 'post',
                    body: assignmentData,
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        updateAssignment: builder.mutation({
            query: (data) => {
                return {
                    url: `/update/paper`,
                    method: 'put',
                    body: data,
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getAssignment: builder.query({
            query: ({ accessToken, paper_name, id, Active, createdDate, publishDate, pageno, pageSize, sortOrder, sortField }) => {

                let filter = Active == '' || Active == undefined ? "" : `&filter=is_Active:${Active}`
                let filterByname = (paper_name == "" || paper_name?.lenght == 0 || paper_name == null) ? "" : `filter=paper_name:${paper_name}`
                let filterByCreatedDate = createdDate = "" || createdDate == null ? "" : `filter=created_date:${(createdDate?.getFullYear()) + "/" + (createdDate?.getMonth() + 1) + "/" + (createdDate?.getDate())}`
                let filterByPublishDate = publishDate = "" || publishDate == null ? "" : `filter=created_date:${(publishDate?.getFullYear()) + "/" + (publishDate?.getMonth() + 1) + "/" + (publishDate?.getDate())}`
                let sortByOrder = "";
                let bypageSize = "";
                let bypageNo = ""
                if (sortOrder) {
                    sortByOrder = `&sortOrder=${sortOrder}`;
                }
                if (pageSize) {
                    bypageSize = `&pagesize=${pageSize}`;
                }
                if (pageno) {
                    bypageNo = `&pageno=${pageno}`
                }
                return {
                    url: `/getAllPaperbyUserId/${id}?${filterByname}${filterByCreatedDate}${filter}${sortByOrder}${bypageSize}${bypageNo}`,
                    // params: {Active,pageno,pagesize: pageSize,sortOrder,sortField},
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
                return {
                    url: `/getPaperbyPaperId/${payload}`,
                    method: 'GET',
                }
            },
            keepUnusedDataFor: 0,
        }),
        postSaveResult: builder.mutation({
            query: (payload) => {
                return {
                    url: "/checkPaper",
                    method: "POST",
                    body: payload,
                }
            },
            invalidatesTags: ['submitExam'],
        }),
        getAllAssissmentOnstudentPage: builder.query(
            {
                query: (stdId) => {
                    return {
                        url: `/getAllAssessmentByStudentId/${stdId}`,
                        method: 'get',
                    }
                },
                providesTags: ['submitExam']
            }
        ),
        // getTotalAssissmentOnstudentPage: builder.query(
        //     {
        //         query: (stdId) => {
        //             return {
        //                 url: `/getTotalAssessmentBy/StudentId/${stdId}`,
        //                 method: 'get',
        //             }
        //         },
        //         providesTags: ['submitExam']
        //     }
        // ),
        putActivePaper: builder.mutation({
            query: ({ paperId, paperActive }) => {
                return {
                    url: `/activetPaper/${paperId}`,
                    method: 'put',
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        invitedStudentByMail: builder.mutation({
            query: (payload) => {
                return {
                    url: `/inviteStudents/`,
                    method: 'post',
                    body: payload,
                }
            },
            invalidatesTags: ['getAllAssissment'],
        }),
        getAllStudentOfOrg: builder.query(
            {
                query: (orgId) => {
                    return {
                        url: `/getAllStudentsBy/orgnizationId/${orgId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getTop5StudentsByOrgId: builder.query(
            {
                query: (orgId) => {
                    return {
                        url: `/getTopRankers/${orgId}`,
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
                        method: 'get',
                    }
                }
            }
        ),
        getTotalStudentAndAssessementByOrgId: builder.query(
            {
                query: (organizationId) => {
                    return {
                        url: `/getCountOfStudentAndPaperBy_OGId/${organizationId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getStudentAvidence: builder.query(
            {
                query: ({ paperId, stdId }) => {
                    return {
                        url: `/getresultby/student/${stdId}/paperId/${paperId}`,
                        method: 'get',
                    }
                },
                providesTags: ['submitExam'],
                keepUnusedDataFor: 0,
            }
        ),
        getCheckAttemptedStudent: builder.query(
            {
                query: ({ paperId, stdId }) => {
                    return {
                        url: `/checkAttemptOfStudent/studentId/${stdId}/paperId/${paperId}`,
                        method: 'get',
                    }
                },
                keepUnusedDataFor: 0,
            }
        ),
        getTop5AssessmentOfOrgId: builder.query(
            {
                query: (organizationId) => {
                    return {
                        url: `/getTopAssesmentByOrgnizationId/${organizationId}`,
                        method: 'get',
                    }
                }
            }
        ),
        getTop5AssesmentScoreByStudentId: builder.query(
            {
                query: (studentid) => {
                    return {
                        url: `/getTop5ResultOfStudent/${studentid}`,
                        method: 'get',
                    }
                }
            }
        ),
        getPassedAssessmentByStudentId: builder.query(
            {
                query: (stdId) => {
                    return {
                        url: `/getAllPassedResultByStudentId/{studentId}?studentId=${stdId}`,
                        method: 'get',
                    }
                }
            }
        ),

        refreshAccessToken: builder.mutation({
            query: (refreshToken) => {
                return {
                    url: '/oauth/token',
                    method: 'POST',
                    body: {
                        grant_type: 'refresh_token',
                        client_id: 'lA9qLAs5xQxoBuCVM1AJERQoPIsopevs',
                        client_secret: 'LvKHmQdAdkZ-wj2RWrq32VTZq4GuK_XACwrh9KvUaKdTOYE3UbiwlnI1TPFhU08N',
                        refresh_token: refreshToken,
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                };
            },
        }),
        sentMailToStudent: builder.mutation(
            {
                query: (paperId) => {
                    return {
                        url: `/sendmailInBackground/${paperId}`,
                        method: 'post',
                        body: ''
                    }
                }
            }
        ),
        createCourseInBackground: builder.mutation(
            {
                query: (payload) => {
                    return {
                        url: `/creatStudentInBackgound`,
                        method: 'post',
                        body: payload
                    }
                }
            }
        ),
        getStudentAvidenceImage: builder.query(
            {
                query: ({ paperId, stdId }) => {
                    console.log("paperId", paperId, "stdId", stdId)
                    return {
                        url: `/getAvidanceofAStudent/${stdId}/paperId/${paperId}`,
                        method: 'get',
                    }
                },
                providesTags: ['submitExam']
            }
        ),
        paperApproved: builder.mutation(
            {
                query: ({ paperId, stdId }) => {
                    return {
                        url: `/publisStudentResult/studentId/${stdId}/paperId/${paperId}`,
                        method: 'post',
                    }
                }
            }
        ),
        paperRejected: builder.mutation(
            {
                query: ({ paperId, stdId }) => {
                    return {
                        url: `/RejectStudentResult/studentId/${stdId}/paperId/${paperId}`,
                        method: 'post',
                    }
                }
            }
        ),
        uploadImageBase64: builder.mutation(
            {
                query: (base64) => {

                    return {
                        url: `/uploadAtS3`,
                        method: 'post',
                        body: base64,
                    }
                }
            }
        ),
        getAllQuestionBYPaperId: builder.query(
            {
                query: (paperId) => ({
                    url: `/getall/questions/${paperId}`,
                    method: 'get'
                }),
                keepUnusedDataFor: 0,
            }),
        getInstruction: builder.query(
            {
                query: (paperId) => {
                    return {
                        url: `/getInstructionBy/PaperId/${paperId}`,
                        method: 'get',
                    }
                }
            }
        ),
    }),


})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCheckAttemptedStudentQuery,useGetInstructionQuery, useGetAllStudentOfOrgQuery, useGetPassedAssessmentByStudentIdQuery, useUploadImageBase64Mutation, useGetAllQuestionBYPaperIdQuery, useUpdateAssignmentMutation, usePaperRejectedMutation, usePaperApprovedMutation, useGetStudentAvidenceImageQuery, useCreateCourseInBackgroundMutation, useSentMailToStudentMutation, useGetStudentAvidenceQuery, useRefreshAccessTokenMutation, useInvitedStudentByMailMutation, useGetTestQuery, usePutActivePaperMutation, useGetAllAssissmentOnstudentPageQuery, useDeleteAssignmentMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useUpdateCourseMutation, usePostOrganisationDetailsMutation, useAddCourseMutation, useGetOrgernizationQuery, usePostAssignmentMutation, useGetAssignmentQuery, useGetStudentOnPerticularAssignmentQuery, useGetUserQuery, useGetAllQuestionsFromPaperIdQuery, usePostSaveResultMutation, useGetTop3AssissmentStudentsQuery, useGetTop5AssissmentQuery, useGetTotalAssessmentAdminQuery, useGetTotalStudentAdminQuery, useGetTop5AssesmentScoreByStudentIdQuery, useGetTotalStudentAndAssessementByOrgIdQuery, useGetTop5StudentsByOrgIdQuery, useGetTop5AssessmentOfOrgIdQuery } = adminApi;
