import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "../Create/Forms.module.css";

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
      <div className={classes.form}>
        <h3>Choose a favorites collection</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="collection">Select a collection below:&nbsp;</label>
          <select id="collection" onChange={handleChange}>
            {props.faveImageCollections.map((collection, key) => {
              return (
                <option key={key} value={collection.name}>
                  {collection.name}
                </option>
              );
            })}
          </select>
          <button className={classes.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ChooseFave;
