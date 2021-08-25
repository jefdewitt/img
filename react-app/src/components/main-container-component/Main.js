import React, { useState, useEffect } from "react";

import Navigation from "../navigation-component/Navigation";
import UserService from "../../services/UserService";
import ImageService from "../../services/ImageService";

const Main = () => {
  const [collectionName, setCollectionName] = useState("");
  const [faveImageData, setFaveImageData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [faveImageCollections, setFaveImageCollections] = useState([]);
  const [allImageData, setAllImageData] = useState([]);
  const createNewClick = true;

  const updateFaves = () => {
    getFaves(collectionName);
  };

  const loadFaveCollection = (collection) => {
    setCollectionName(collection);
    getFaves(collection);
  };

  const getFaves = (collection) => {
    UserService.getCollection(collection).then((result) => {
      setFaveImageData(result[0] ? result[0].images : null);
    });
  };

  const updateFaveCollectionsList = () => {
    ImageService.getFaveCollections().then(
      (result) => setFaveImageCollections(result),
      setIsLoaded(true)
    );
  };

  useEffect(() => {
    // Get all images
    ImageService.getAllImages().then((result) => {
      setAllImageData(result);
    });

    // Get fave image collections
    updateFaveCollectionsList();
  }, []);

  return (
    <div className="main">
      <Navigation
        allImageData={allImageData}
        faveImageData={faveImageData}
        faveImageCollections={faveImageCollections}
        isLoaded={isLoaded}
        // isFaveCollection={isFaveCollection}
        createNewClick={createNewClick}
        collectionName={collectionName}
        loadFaveCollection={loadFaveCollection}
        updateFaves={updateFaves}
        updateFaveCollectionsList={updateFaveCollectionsList}
      />
    </div>
  );
};

export default Main;
