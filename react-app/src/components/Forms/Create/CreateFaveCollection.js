import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import UserService from "../../../services/UserService";

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
      <div className="create-fave form">
        <h3>Create a new favorites folder</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Add a name:
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Modal>
  );
};

export default CreateFave;
