import React from 'react'
import { StudentCard } from '../components/StudentCard/StudentCard'

export default function AssignmentStudentPage() {
  return (
    <div className='row overflow-y-auto h-100 w-100 m-0 p-0'>
      {
        [1,2,3,4,1,1,1,1,1,1,1,1,1,5].map(()=>
        <StudentCard divBoxStyle={'col-lg-2 col-12'}/>
        )
      }
   
    </div>

  )
}
