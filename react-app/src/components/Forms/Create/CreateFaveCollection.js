import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import UserService from "../../../services/UserService";
import classes from "./Forms.module.css";

const CreateFave = (props) => {
  const [nameValue, setNameValue] = useState(null);

  const handleChange = (event) => {
    if (event.target.id === "name") {
      setNameValue(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.addCollection(event.target[0].value).then((result) => {
      if (Boolean(result)) {
        props.loadFaveCollection(nameValue);
        props.updateFaveCollectionsList();
      }
    });
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.form}>
        <h3>Create a new favorites folder</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Add a name:&nbsp;</label>
            <input type="text" id="name" onChange={handleChange} />
          </div>
          <button className={classes.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateFave;
