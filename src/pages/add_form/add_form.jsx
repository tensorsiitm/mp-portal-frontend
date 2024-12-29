
import React, { useState }from 'react';
import './add_form.css';
import NewInput from './newInput';
import Existing from './existing';
import New from './new';
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";

function Add_form() {
  const [add_form,setAddForm]=useState([<FiPlus className="icon_align" />,true]);
  const [select,selectfunc]=useState(null)
  const [selected_inputs,sinputfunc]= useState(["event1","event2"]);
  const [exist_input,einputfunc]=useState(["Name","contact","email"]);
  const [showexist,showexistfunc]=useState(false);
  const [shownew,shownewfunc]=useState(false);


  const Delete_input = (inputToDelete) => {
    sinputfunc((prevArray) => 
      prevArray.filter((item) => item !==inputToDelete) // Remove the element with the given value
    );
  }
  
  const handleExistingClick = () => {
    showexistfunc(true);
  }

  const handleNewClick = () => {
    shownewfunc(true);
  } 

  const handleCancel = () => {
    showexistfunc(false);
    shownewfunc(false);
  }

  const handleSave = (n_input) => {
    sinputfunc([...selected_inputs,n_input])
    einputfunc([...exist_input,n_input])

  }

  const handleNewFormClick = () => {
    // Show the NewInput component when "+" button is clicked
    setAddForm((prevArray) => {
      const newArray = [...prevArray]; // Create a copy of the current array
      newArray[1] = !newArray[1]; // Toggle the second element (index 1)
      return newArray;});

    if (add_form[1]){

      setAddForm((prevArray) => {
        const newArray = [...prevArray]; // Create a copy of the current array
        newArray[0] = <RxCross2 className="icon_align"/>; // Toggle the second element (index 1)
        return newArray;});
      selectfunc(
          <NewInput
              onExisting={handleExistingClick}
              onNew={handleNewClick}
          />
      );
    }
    else{
      showexistfunc(false);
      shownewfunc(false);
      setAddForm((prevArray) => {
        const newArray = [...prevArray]; // Create a copy of the current array
        newArray[0] = <FiPlus className="icon_align" />; // Toggle the second element (index 1)
        return newArray;});
      selectfunc("")
    }
    
    
};



  return (
    <div className="Add_Form">
      <h1 className='add-event-name'>Add Event Name</h1>
      <h2 className='own-form-text'>Create your own form</h2>

      <ol>
            {selected_inputs.map((task, index) =>
                <li className='inputLi' key={index}>
                    <span className='text'>{task}</span>
                    <button className='delete_input' onClick={()=>Delete_input(task)}><MdDelete/></button>
                </li>
            )}
      </ol>

      <button className='new_form' onClick={handleNewFormClick}>
          {add_form}
      </button>
      <div>
        {!(showexist || shownew)  && select}
        {showexist && <Existing exist_click={handleCancel} save_input={handleSave} exist_input={exist_input} />}
        {shownew && <New Cancel_click={handleCancel} Submit_Click={handleSave}  />}
      </div>
      <button className='save_form'>
        save
      </button>
    </div>
  );
}

export default Add_form;
