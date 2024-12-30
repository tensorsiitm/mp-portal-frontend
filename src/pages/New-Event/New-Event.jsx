import React, { useState, useRef } from "react";
import "./New-Event.css";

const Desktop10 = () => {
    const [eventIcon, setEventIcon] = useState(null);
    const [eventTitle, setEventTitle] = useState("Event Title");
    const [buttons, setButtons] = useState(["Button 1", "Button 2"]);
    const fileRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setEventIcon(URL.createObjectURL(file));
        }
    };

    const handleAddButton = () => {
        setButtons([...buttons, `Button ${buttons.length + 1}`]);
    };

    const handleButtonChange = (index, newLabel) => {
        const updatedButtons = [...buttons];
        updatedButtons[index] = newLabel;
        setButtons(updatedButtons);
    };

    return (
        <div className="app">
            {/* <div className="profile_bar">
        <img
          src={
            "https://img.icons8.com/?size=100&id=98957&format=png&color=FFFFFF"
          }
          alt="Profile Icon"
          className="profile_icon"
          style={{ cursor: "pointer" }}
        />

        <button className="go_back_button">Go Back</button>
      </div> */}

            <div className="event_container">
                <h1 className="add_new_event">Add New Event</h1>

                <div className="event_icon_container">
                    <h3 className="home_page">Home Page</h3>

                    <div className="event_icon_profile">
                        <img
                            src={
                                eventIcon ||
                                "https://img.icons8.com/?size=100&id=kq0iMadL2AjZ&format=png&color=000000"
                            }
                            alt="Event Icon"
                            className="event_icon"
                            onClick={() => fileRef.current.click()}
                            style={{ cursor: "pointer" }}
                        />
                    </div>

                    <input
                        type="file"
                        ref={fileRef}
                        className="event_icon_input"
                        onChange={handleImageChange}
                        accept="image/*"
                    />

                    <h4 className="icon">Event Icon</h4>

                    <div className="event_title_container">
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="event_title"
                        />

                        <img
                            src="https://img.icons8.com/?size=100&id=pzpApVcbIOwm&format=png&color=FFFFFF"
                            alt="Edit Icon"
                            className="edit_icon"
                            onClick={() => {
                                document.querySelector(".event_title").focus();
                            }}
                        />
                    </div>

                    <div className="buttons_container">
                        <h3 className="Add_your_first_page_buttons">
                            Add your first page buttons
                        </h3>

                        {buttons.map((button, index) => (
                            <div key={index} className="buttons">
                                <input
                                    type="text"
                                    value={button}
                                    onChange={(e) =>
                                        handleButtonChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="custom_button"
                                    placeholder="Button"
                                />
                                <button className="button_inline">+</button>
                            </div>
                        ))}
                        <button
                            className="add_button"
                            onClick={handleAddButton}
                        >
                            +
                        </button>
                    </div>

                    <button className="save_button">Save</button>
                </div>
            </div>
        </div>
    );
};

export default Desktop10;
