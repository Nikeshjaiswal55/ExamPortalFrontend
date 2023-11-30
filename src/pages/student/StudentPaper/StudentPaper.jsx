import React,{useEffect,useRef,useState} from 'react'
import {PiHandWaving} from "react-icons/pi";
import Countdown from 'react-countdown-now';
import {CustomButton} from '../../../theme/Button/Buttons';
import {Button,Modal} from 'react-bootstrap';
import {useGetAllQuestionsFromPaperIdQuery} from '../../../apis/Service';
import {Loader} from '../../../components/Loader/Loader';
// const setA = [
//     {
//         id: "1",
//         topic: "Basic's of  JavaScript",
//         ques: "javascript is a _____ language",
//         "opt1": "object Oriented ",
//         "opt2": " single threaded ",
//         "opt3": "both A and B",
//         "opt4": " none of the above",
//         ans: "both A and B",
//     },
//     {
//         id: "2",
//         topic: "data type",
//         ques: "which of the following is not a datatype in javaScript ?",
//         "opt1": "string ",
//         "opt2": "number",
//         "opt3": "boolean",
//         "opt4": "int",
//         ans: "int",
//     },{
//         id: "3",
//         topic: "conditional ",
//         ques: "How many Loops in javaScript ? ",
//         "opt1": "2 ",
//         "opt2": "5",
//         "opt3": "8",
//         "opt4": "6",
//         ans: "5",
//     }
//     ,{
//         id: "4",
//         topic: "string ",
//         ques: "which method is used to create Array from String ?  ",
//         "opt1": "slice ",
//         "opt2": "splice",
//         "opt3": "split",
//         "opt4": "join",
//         ans: "split",
//     },{
//         id: "5",
//         topic: "string ",
//         ques: "Which Operator is called us Nullish Operator ? ",
//         "opt1": "??",
//         "opt2": "&&",
//         "opt3": "||",
//         "opt4": "none of the above",
//         ans: "??",
//     }
//     ,{
//         id: "6",
//         topic: "Basic's of  JavaScript",
//         ques: "javascript is a _____ language",
//         "opt1": "script",
//         "opt2": "scripting multithreaded",
//         "opt3": "javascript",
//         "opt4": "js",
//         ans: "script",
//     },

//     {
//         id: "7",
//         topic: "Basic's of  JavaScript",
//         ques: "What is the correct JavaScript syntax to change the content of the HTML element below?",
//         "opt1": '#demo.innerHTML = "Hello World!";',
//         "opt2": 'document.getElementById("demo").innerHTML = "Hello World!"; ',
//         "opt3": 'document.getElementByName("p").innerHTML = "Hello World!";',
//         "opt4": 'document.getElement("p").innerHTML = "Hello World!";',
//         ans: 'document.getElementById("demo").innerHTML = "Hello World!"; ',
//     },
//     {
//         id: "8",
//         topic: "Basic's of  JavaScript",
//         ques: "Where is the correct place to insert a JavaScript?",
//         "opt1": 'The body section ',
//         "opt2": 'Both the head section and the body section are correct ',
//         "opt3": 'The head section',
//         "opt4": 'none of above',
//         ans: 'Both the head section and the body section are correct ',
//     },
//     {
//         id: "9",
//         topic: "Basic's of  JavaScript",
//         ques: 'What is the correct syntax for referring to an external script called "x.js"?',
//         "opt1": 'script src="x.js"',
//         "opt2": 'script name="x.js"',
//         "opt3": 'script href="x.js"',
//         "opt4": 'link src="x.js"',
//         ans: 'script src="x.js"',
//     },
//     {
//         id: "10",
//         topic: "Basic's of  JavaScript",
//         ques: 'The external JavaScript file must contain the <script> tag.',
//         "opt1": 'False',
//         "opt2": 'true',
//         "opt3": 'null',
//         "opt4": 'undifiend',
//         ans: 'False',
//     },
// ];


export default function StudentPaper({paperId ='db6d62b6-3a9a-4e76-80be-de52a27f866b'}) {
    const [setA,setSetA]=useState([]);
    const [showSubmit,setShowSubmit] = useState(false);
    const handleSubmitClose = () => setShowSubmit(false);
    const handleSubmitShow = () => setShowSubmit(true);
    const {data,error,isLoading} = useGetAllQuestionsFromPaperIdQuery([localStorage.getItem("accessToken"),paperId]);

    const timeString = "01:45:15";
    const [targetTime,setTargetTime] = useState(null);

    useEffect(()=>{
setSetA(data?.questions);
console.log("data================",data);
    },[data]);
    useEffect(() => {
        const convertTimeStringToMillis = (timeString) => {
            const [hours,minutes,seconds] = timeString.split(':').map(Number);
            return ((hours * 60 + minutes) * 60 + seconds) * 1000;
        };
        const milliseconds = convertTimeStringToMillis(timeString);
        const currentTimestamp = Date.now();
        const target = currentTimestamp + milliseconds;
        setTargetTime(target); 
    },[timeString]);

    // {
    //    --------------------- give ans 
    //         "studentID": "string",
    //             "paperID": "string",
    //                 "questions": [
    //                     {
    //                         "questionId": "string",
    //                         "options": [
    //                             "string"
    //                         ],
    //                         "questions": "string",
    //                         "correctAns": "string",
    //                         "userAns": "string",
    //                         "paperID": "string"
    //                     }
    //                 ],
    //                     "cheating": {
    //      
    //             "studentId": "string",
    //       
    //                     "paperId": "string",
    //                         "images": [
    //                             "string"
    //                         ],
    //                             "audios": [
    //                                 "string"
    //                             ]
    //     }
    // }

    const progressBar = useRef(null);
    const [count,setCount] = useState(0);
    const [selectedOption,setSelectedOption] = useState(new Array(setA?.length));
    function isChecked(id) {
        console.log("selected option :- ",selectedOption[id]);
        return selectedOption[id] ? true : false;
    }
    function updateProgressBar() {
        const progress = ((count + 1) / setA?.length) * 100;
        progressBar.current.style.width = progress + "%";
    }
    function handleChecked(e,id) {

        if(!isChecked(id)) {
            setCount(count + 1);
            updateProgressBar();
            console.log("updated progressbar");
        }
        const update = selectedOption;
        console.log(e.target.value);
        update[id] = e.target.value;
        console.log("update ========================",update);

    }

    return (
        <>
            {isLoading ? <div className='w-100 h-100 d-flex justify-content-center align-items-center'><Loader /> </div>  : 
                <div className='row w-100 gap-4  p-3 '>
                <><div className='col-lg-8  offset-lg-2 '>
                    <div className=' d-flex flex-wrap justify-content-between'>
                        <div>
                            <h1 className=' text-capitalize'>java mastery challenge</h1>
                            <div className=' d-flex align-items-center px-3 fs-6'>  <span> {targetTime && (
                                <Countdown
                                    date={targetTime} // Set the target time for the countdown
                                    renderer={({hours,minutes,seconds,completed}) => {
                                        if(completed) {
                                            return <span>Countdown expired</span>;
                                        } else {
                                            return (
                                                <span>
                                                    {hours.toString().padStart(2,'0')}:
                                                    {minutes.toString().padStart(2,'0')}:
                                                    {seconds.toString().padStart(2,'0')}
                                                </span>
                                            );
                                        }
                                    }}
                                />
                            )}</span> <div className=' mx-1 bg-dark-subtle rounded-5' style={{width: "200px",height: "10px"}}><div className=' rounded-5' style={{width: "0px",height: "10px",backgroundColor: "blue"}} ref={progressBar} ></div></div> <span>{count}/{setA?.length} question</span></div>
                        </div>
                        <div className='d-none d-md-flex justify-content-center align-items-center flex-column' >
                            <h1>hey shruti  <PiHandWaving size={35} /></h1>
                            <div className=' d-flex justify-content-center gap-5 fs-5 text-capitalize'> <p>min score:30% </p><p>max score:100% </p></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-8  offset-lg-2 p-lg-4  overflow-auto  ' style={{maxHeight: "60vh"}}>
                    {setA && setA.map((value,index) => {
                        return <div className='p-1 py-3 p-lg-4 my-3  shadow border rounded-3'>
                            <div className='question d-flex fs-6'>
                                <span>{index+1}.</span>
                                <p>{value.questions}?</p>
                            </div>
                            <ul className='options text-wrap  fs-6 list-unstyled' >
                            {value.options && value?.options?.map((valueopt,indexopt)=>{
                               return <li className=' d-flex gap-2'>
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        value={`opt1`}
                                        onClick={(e) => {handleChecked(e,value.id - 1);}}
                                        id={`ques${index}-opt${indexopt}`}
                                    />
                                    <label for={`ques${index}-opt${indexopt+1}`}>{valueopt}</label>
                                </li>
                            })}
                            </ul>
                        </div>
                    })}
                </div>
                <div className='col-lg-8  offset-lg-2 '>
                    <div className=' d-flex w-100 justify-content-end p-0 m-0'>
                        <CustomButton className={"rounded-4 px-1 px-md-5 m-0 m-md-3 mb-0 w-25 "} buttonText={"submit"} onButtonClick={handleSubmitShow} />
                    </div>
                    </div></>
                 </div> 
}
            {showSubmit && (
                <Modal
                    show={showSubmit}
                    onHide={handleSubmitClose}
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {' '}
                            Are You Sure ?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>confirm you want Submit </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex w-100 gap-3">
                            <Button
                                variant="dark"
                                className="rounded-4 w-100"
                                onClick={handleSubmitClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                className="rounded-4 w-100"
                                onClick={() => {
                                    console.log(selectedOption,"submited =====================")
                                    handleSubmitClose();
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            )} 
        </>
    )
}
