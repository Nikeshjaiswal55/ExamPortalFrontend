import React,{useEffect,useState} from 'react'
import './PopUp.css'



export default function PopUp() {

    useEffect(() => {
        // document.getElementById("admin-popup-box").style.display = 'flex';
    })

    const [orgName,setOrgName] = useState("");
    const [orgType,setOrgType] = useState("");

    function onChangeName(e) {
        setOrgName(e.target.value);
        // console.log(orgName);
    }


    function onChangeType(e) {
        setOrgType(e.target.value);
        // console.log(orgType);
    }

    function onSubmit() {

        if(orgName.length > 0 && orgType.length > 0) {


            alert("Organisation Name :- " + orgName + "   " + "Organisation Type :- " + orgType);

            console.log("Organisation Name :- " + orgName + "   " + "Organisation Type :-  " + orgType);

        }
        else {
            alert("please fill all fileds");
        }
    }


    return (
        <><>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Launch static backdrop modal
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-body"><div id="admin-org-name-box" className="input-box modal-body">
                            <label htmlFor="org-name">Organisation Name :</label>
                            <input
                                type="text"
                                id="org-name"
                                placeholder="Organisation Name"
                                onChange={onChangeName}
                                defaultValue={orgName}
                            />
                        </div>
                            <div id="admin-org-type-box" className="input-box">
                                <label htmlFor="org-type">Organisation Type :</label>
                                <input
                                    type="text"
                                    id="org-type"
                                    placeholder="Organisation Type "
                                    onChange={onChangeType}
                                    defaultValue={orgType}
                                />
                            </div>
                            <div className="input-box">
                                <button onClick={onSubmit}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    id="admin-submit-btn">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>




        </>
    )
}
