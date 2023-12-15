import React from 'react'
import {TotalStudent} from '../components/TotalStudent/TotalStudent'
import {useParams} from 'react-router-dom';
import {useGetAllStudentOfOrgQuery,useGetStudentOnPerticularAssignmentQuery} from '../../../apis/Service';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import {Loader} from '../../../components/Loader/Loader';
import {StudentCard} from '../components/StudentCard/StudentCard';

export const TotalStudentOfOrg = () => {
    const {orgId} = useParams();
    const {data,isSuccess,isLoading,isError} =
        useGetAllStudentOfOrgQuery(orgId);
    if(isSuccess) {
        console.log('student',data);
    }
    return (
        <div className="h-100 w-100 m-0 p-0 ">
            {isError && <div className=' w-100 h-100 d-flex justify-content-center align-items-center'> <SomethingWentWrong /></div>}
            {isLoading ? (
                <div className=" position-absolute top-50 start-50  translate-middle ">
                    <Loader />
                </div>
            ) : (
                <>
                    {!isError && (<><div className=" h-auto ">
                        <TotalStudent totalStudent={data} />
                    </div>
                        <div
                            className="card-div row w-100 justify-content-center justify-content-md-start mx-2 overflow-auto"
                            style={{height: 'calc(100vh - 16rem)'}}
                        >
                            {data?.map((studentdetails) => (
                                <StudentCard
                                    // paperId={paperId}
                                    divBoxStyle={'col-lg-2 col-12'}
                                    studentdetails={studentdetails}
                                />
                            ))}
                        </div></>)}
                </>
            )}
        </div>
    )
}
