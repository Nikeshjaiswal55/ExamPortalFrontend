import react from "react";
import { Link } from "react-router-dom";
export function StudentCard({bgblack,borderdark,divBoxStyle}) {

    return (
        <>
            <div className={`p-3 text-center ${divBoxStyle}`}>
                <div className={`card text-center rounded-4 shadow`} style={{  height: "19rem", border:"0px"}}>
      
                    <div className="card-body">
                    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="img-thumbnail img-fluid rounded-circle  w-50 h-50 m-auto p-0  mt-4  border-dark border-4"  alt="Student Image" />
                        <h6 className="Card title mt-4">Kapil Jaiswal</h6>
                        <p className="card-text ">
                           kapilj.bca2022@ssism.org
                        </p>
                        {/* <hr className=" border-dark border-5"/>                         */}
                    </div>
                    <div className={`card-footer rounded-bottom-3 bg-black p-3`}>
                    <Link to='/admin/dashboard' className=' fw-bold  text-white' style={{textDecoration:"none" }}>
                            Evidence
                        </Link>

                    </div>
                </div>



            </div>
        </>
    )
}