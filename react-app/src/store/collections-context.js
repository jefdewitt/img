import React from "react";

const CollectionsContext = React.createContext({
  selectedCollectionName: "",
  collections: [],
  addCollection: (name) => {},
  removeCollection: (name) => {},
});

export default CollectionsContext;
