import React from "react";
import { useState } from "react";
import "./existing.css";
import { IoIosArrowUp } from "react-icons/io";

function Existing({ exist_click, save_input, exist_input }) {
    const handleChanges_exist = (e) => {
        const save_value = e.target.value;
        if (save_input) {
            save_input(save_value);
        } else {
            console.error("onButtonClick is undefined");
        }
    };

    return (
        <div className="exist-dropdown">
            <button className="exist-button" onClick={exist_click}>
                <text className="exist_text">Existing</text>
                <i className="arrowdown">
                    <IoIosArrowUp />
                </i>
            </button>

            {exist_input.map((task, index) => (
                <div>
                    <input
                        className="exist-button"
                        type="button"
                        value={task}
                        onClick={(e) => handleChanges_exist(e)}
                    ></input>
                </div>
            ))}
            <br></br>
        </div>
    );
}

export default Existing;
