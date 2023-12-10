import  { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { MdSunny } from 'react-icons/md';


const Mode = () => {
    const theme=localStorage.getItem("mode")
    const [mode,setMode]=useState(theme?theme:"dark-theme");
    const ChangeMode=()=>{
        if(mode==="light-theme"){
            setMode("dark-theme")
        }else{
            setMode("light-theme")
        }
    }
    function setmode(){
        localStorage.setItem("mode",mode)
    }
    useEffect(() => {
        console.log("mode",mode)
        setmode();
        document.body.className=mode;
    },[mode])
    return (
        <>
            <span className="mode_btn mx-4 d-flex justify-content-center align-items-center" onClick={ChangeMode}>{(mode==="dark-theme")?<MdSunny size={25} className='icon' />:<FaMoon className='icon' size={22} cursor={'pointer'} onClick={setmode}/>}</span>
        </>
    );
};
export default Mode;





