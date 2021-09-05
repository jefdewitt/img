import React from "react";
import CollectionsContext from "./collections-context";
import UserService from "../services/UserService";
import ImageService from "../services/ImageService";

const { useReducer } = require("react");

const defaultCollectionState = {
  selectedCollectionName: null,
  collections: [],
};

const collectionsReducer = (state, action) => {
  if (action.type === "SET") {
    const updatedName = action.name;
    return {
      name: updatedName,
    };
  }
  if (action.type === "ADD") {
    const createdName = action.name.trim();
    UserService.addCollection(createdName).then((result) => {
      // setSubmissionSuccess(Boolean(result));
      console.log(result);
    });
  }
  if (action.type === "REMOVE") {
    const removedName = action.name;
    // insert call logic to remove collection
    // setSelectedCollection(null);
  }
  if (action.type === "GET") {
    let collectionsList;
    ImageService.getFaveCollections().then(
      (result) => result
    );
    // return {
    //   collections: collectionsList,
    // }
  }
  return defaultCollectionState;
};

const CollectionsProvider = (props) => {
  const [collectionsState, dispatchCollectionsAction] = useReducer(
    collectionsReducer,
    defaultCollectionState
  );

  const setSelectedCollectionHandler = (name) => {
    dispatchCollectionsAction({ type: "SET", name: name });
  };

  const addCollectionHandler = (name) => {
    dispatchCollectionsAction({ type: "ADD", name: name });
    setSelectedCollectionHandler(name);
  };

  const removeCollectionHandler = (name) => {
    dispatchCollectionsAction({ type: "REMOVE", name: name });
  };

  const getCollectionsHandler = () => {
    dispatchCollectionsAction({ type: "GET" });
  };

  const collectionsContext = {
    selectedCollectionName: collectionsState.name,
    collections: collectionsState.collections,
    getCollections: getCollectionsHandler,
    setSelectedCollection: setSelectedCollectionHandler,
    addCollection: addCollectionHandler,
    removeCollection: removeCollectionHandler,
  };

  return (
    <CollectionsContext.Provider value={collectionsContext}>
      {props.children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
