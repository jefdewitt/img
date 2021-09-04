const { useReducer } = require("react");

const defaultCollectionState = {
  selectedCollectionName: "",
  collections: [],
};

const collectionsReducer = (state, action) => {
  if (action.type === "SET") {
    const updatedName = (state.selectedCollectionName = action.name);
    return {
      name: updatedName,
    };
  }
  return defaultCollectionState;
};

const CollectionsProvider = (props) => {
  const [collectionsState, dispatchCollectionsAction] = useReducer(
    collectionsReducer,
    defaultCollectionState
  );

  const setSelectedCollection = (name) => {
    dispatchCollectionsAction({ type: "SET", name: name });
  };

  const collectionsContext = {
    selectedCollectionName: collectionsState.name,
    collections: [],
    addCollection: (name) => {},
    removeCollection: (name) => {},
  };
};

export default CollectionsProvider;
