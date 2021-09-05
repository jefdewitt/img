import React from "react";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const allMemes = "All Memes";
  const startCollection = "Start a Collection";
  const chooseCollection = "Choose a Collection";
  const faveMemes = "Fave Memes";

  const collection = props.collectionName ? props.collectionName : null;

  const onAllClickHandler = () => {
    props.displayAllImages();
    props.updateFaves();
  };

  const onFaveClickHandler = () => {
    props.loadFaveCollection(collection);
  };

  return (
    <div className={classes.navigation}>
      <h1>img</h1>
      <ul>
        <li
          className={props.allNavSelection ? classes.selected : ""}
          onClick={onAllClickHandler}
        >
          {allMemes}
        </li>
        <li onClick={props.showCreateModal}>{startCollection}</li>
        <li onClick={props.showChooseModal}>{chooseCollection}</li>
        <li
          className={!props.allNavSelection ? classes.selected : ""}
          onClick={onFaveClickHandler}
        >
          {faveMemes}
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
