import React, { useState } from "react";
import { withRouter } from "react-router-dom";

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
      goToFaves();
    }
  };

  // If account selection is successful, go to favorites
  const goToFaves = () => {
    props.history.push("/img/favorites");
  };

  // if (props.signInClick) {
    return (
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
    );
  // } else {
  //   return (
  //     <input
  //       type="submit"
  //       value="Choose One"
  //       onClick={() => {
  //         props.displayCreateCollectionComp(false);
  //       }}
  //     ></input>
  //   );
  // }
};

export default withRouter(ChooseFave);
