import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";

const ChooseFave = (props) => {
  const [nameValue, setNameValue] = useState("");

  const handleChange = (event) => {
    if (event.target.name !== "Select a folder") {
      setNameValue(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nameValue !== "" && nameValue !== "Select a folder") {
      props.loadFaveCollection(nameValue);
      props.onClose();
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="choose-fave form">
        <h3>Choose a favorites collection</h3>
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange}>
            {props.faveImageCollections.map((collection, key) => {
              return (
                <option key={key} value={collection.name}>
                  {collection.name}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Modal>
  );
};

export default ChooseFave;
