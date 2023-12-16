import {FaArrowRight} from 'react-icons/fa';

export const TotalComponent = ({infoText,infoNumber,icon,onViewClick,colClassName,children}) => {
    return <>
        <div className={`col-12 col-md-6 p-0 pe-1 -1   h-50   m-0 ${colClassName}`}  >
            <div className=" w-100 h-100   d-flex  justify-content-center flex-column align-items-baseline bg-white   border m-0 p-0 rounded-2"  >
                <div className="w-100 h-25  d-flex   gap-4 p-2 ">
                    <div className={` d-flex justify-content-center align-items-center rounded-circle   elevation-1   bg-primary-subtle text-primary p-2  `} style={{width: "40px ",height: "40px"}}>{icon}</div>
                    <div className="info-box-text fs-5 fw-bold d-flex justify-content-start align-items-center">{infoText}   {children}</div>
                </div>
                <div className=' w-100 h-50 d-flex justify-content-center align-items-center m-0 p-0 '>

                    <span className="info-box-number text-center fs-3 px-1 rounded-circle ">{infoNumber}</span>
                </div>
                <div className=' w-100 text-center h-25 m-0 p-0'>
                    <hr className=' m-0 p-0' />
                    <span className=' fs-5 text-center p-0 m-0 h-100 d-flex justify-content-center align-items-center py-2 mx-2 cursor-pointer' onClick={() => {onViewClick();}}> View More <FaArrowRight className=' px-2' size={30} /></span>
                </div>
            </div>
        </div>
    </>
}
