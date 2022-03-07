// import React,{createContext} from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        "name":"harry is good in",
        "class":"10b"
    }
    const[state,setstate] = useState(s1)
    const update = ()=>{
        setInterval(() => {
          setstate({
            "name":"harry is bad in ",
            "class":"10c"
          })
        },1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState