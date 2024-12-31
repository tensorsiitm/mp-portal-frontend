import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import './newInput.css'

function NewInput(props){
        return (
            <div className="new-exist-box">
                <button className="existing" onClick={props.onExisting}>
                <text className="existing_text">Existing</text>
                <IoIosArrowDown /> 
                </button>
                <button className='new' onClick={props.onNew}>
                New 
                </button>
            </div>
               
        )
}

export default NewInput