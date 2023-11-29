import { Link } from "react-router-dom";
export function StudentCard({divBoxStyle,studentdetails}) {
    const color = ['bg-danger', 'bg-secondary', 'bg-primary', 'bg-warning', 'bg-info', 'bg-dark'];  
const randomColor = color[Math.floor(Math.random() * color.length)]; 

    return (
        <>
            <div className={`p-3 text-center ${divBoxStyle}`}>
                <div className={`card text-center rounded-4 shadow`} style={{  height: "19rem", border:"0px"}}>
      
                    <div className="card-body">
                        <div className={`${randomColor} img-thumbnail d-flex justify-content-center align-items-center rounded-circle  bg w-50 h-50 m-auto p-0  mt-4  border-dark border-4`}>
                           <h1 className='fw-bold text-capitalize text-light'> {studentdetails.email.charAt(0).toUpperCase()}</h1>
                        </div>
                        {/* <h6 className="Card title mt-4">Kapil Jaiswal</h6> */}
                        <p className="card-text ">
                         {studentdetails.email}
                        </p>
                    </div>
                    <div className={`card-footer rounded-bottom-3  p-3`} style={{background:'var(--grey)'}}>
                    <Link to='/admin/dashboard' className=' fw-bold  text-white' style={{textDecoration:"none" }}>
                            Evidence
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}