import React, { useState } from "react";
import './new.css'

function New({Cancel_click,Submit_Click}){

    const [values,setValues]=useState({
        Type:'',
        Required:'',
        label:'',
        placeholder:''

    })

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    } 
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        Submit_Click(values.label)

    }

    return(
        <div>
        <form className="new-form" onSubmit={handleSubmit}>
            
            <label></label>
            <select className="new-dropdown" name='Type' id='Type' onChange={(e) => handleChanges(e)}>
                <option value='1'>Type 1</option>
                <option value='2'>Type 2</option>
                <option value='3'>Type 3</option>
            </select>
            
            <label></label>
            <select className="new-dropdown" name='Required' id='Required' onChange={(e) => handleChanges(e)}>
                <option value='1'>Required</option>
                <option value='0'>Not Required</option>
            </select>
            <br></br>

            <label></label>
            <input type='text' placeholder='label' name='label' onChange={(e) => handleChanges(e)} required/><br/>

            <label></label>
            <input type='text' placeholder='Placeholder\Instruction' name='placeholder' onChange={(e) => handleChanges(e)} required /><br/>

            <button type="button" className="Cancel-b" onClick={Cancel_click}>Cancel</button>
            <button type="submit" className="Submit-b" >Save</button>
        
        </form>

        </div>
                
    )
}

export default New