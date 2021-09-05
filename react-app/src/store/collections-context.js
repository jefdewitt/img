import React from "react";

const CollectionsContext = React.createContext({
  selectedCollectionName: null,
  collections: [],
  getCollections: () => {},
  setSelectedCollection: (name) => {},
  addCollection: (name) => {},
  removeCollection: (name) => {},
});

export default CollectionsContext;
