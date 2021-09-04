import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import UserService from "../../../services/UserService";
import classes from "./Forms.module.css";

const CreateFave = (props) => {
  const [nameValue, setNameValue] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setNameValue(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.addCollection(nameValue).then((result) => {
      setSubmissionSuccess(Boolean(result));
    });
  };

  // Called after state change (see the handleSubmit setState call above)
  useEffect(() => {
    try {
      if (submissionSuccess) {
        props.loadFaveCollection(nameValue);
        props.updateFaveCollectionsList();
      }
    } catch (e) {
      console.log(e);
    }
  }, [submissionSuccess, nameValue, props]);

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
