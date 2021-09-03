import React, { useState, useEffect } from "react";

import ChooseFave from "../choose-favorites-collection-component/ChooseFaveCollection";
import CreateFave from "../create-favorites-collection-component/CreateFaveCollection";
import "./FaveSelectionContainer.css";

const FaveSelectionContainer = (props) => {
  const [showCreateCollectionComp, setShowCreateCollectionComp] = useState(
    false
  );

  /*
   * Gets event passed back up from child components.
   * This call comes from navigation.
   */
  const displayCreateCollectionComp = (passedValue) => {
    setShowCreateCollectionComp(passedValue);
  };

  /*
   * Gets called after render.
   */
  useEffect(() => {
    setShowCreateCollectionComp(props.createNewClick);
  }, [props.createNewClick]);

  const {
    faveImageCollections,
    loadFaveCollection,
    updateFaveCollectionsList,
  } = props;

  if (showCreateCollectionComp) {
    return (
      // <React.Fragment>
        <div className="fave-selection-container">
          <ChooseFave
            signInClick={false}
            faveImageCollections={faveImageCollections}
            displayCreateCollectionComp={displayCreateCollectionComp}
          ></ChooseFave>
          <CreateFave
            createNewClick={true}
            loadFaveCollection={loadFaveCollection}
            updateFaveCollectionsList={updateFaveCollectionsList}
          ></CreateFave>
        </div>
      // </React.Fragment>
    );
  } else {
    return (
      // <React.Fragment>
        <div className="fave-selection-container">
          <CreateFave
            createNewClick={false}
            displayCreateCollectionComp={displayCreateCollectionComp}
          ></CreateFave>
          <ChooseFave
            signInClick={true}
            faveImageCollections={faveImageCollections}
            loadFaveCollection={loadFaveCollection}
          ></ChooseFave>
        </div>
      // </React.Fragment>
    );
  }
};

export default FaveSelectionContainer;
