import React, { useState, useEffect } from "react";

import Navigation from "../Navigation/Navigation";
import UserService from "../../../services/UserService";
import ImageService from "../../../services/ImageService";
import Layout from "../Gallery/Gallery";
import CreateFave from "../../Forms/Create/CreateFaveCollection";
import ChooseFave from "../../Forms/Choose/ChooseFaveCollection";

const Main = () => {
  const [collectionName, setCollectionName] = useState();
  const [faveImageData, setFaveImageData] = useState({
    images: [],
    account: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [faveImageCollections, setFaveImageCollections] = useState([]);
  const [allImageData, setAllImageData] = useState([]);
  const [createModalIsShown, setCreateModalIsShown] = useState(false);
  const [chooseModalIsShown, setChooseModalIsShown] = useState(false);
  const [isFaveCollection, setIsFaveCollection] = useState(false);
  const [allNavSelection, setAllNavSelection] = useState(true);

  const showCreateModalHandler = () => {
    setCreateModalIsShown(true);
  };

  const hideCreateModalHandler = () => {
    setCreateModalIsShown(false);
  };

  const showChooseModalHandler = () => {
    setChooseModalIsShown(true);
  };

  const hideChooseModalHandler = () => {
    setChooseModalIsShown(false);
  };

  const updateFaves = () => {
    getFaves(collectionName);
  };

  const loadFaveCollection = (collection) => {
    setCollectionName(collection);
    setIsFaveCollection(true);
    setAllNavSelection(false);
    if (collection !== null || collection !== null) {
      getFaves(collection);
    }
  };

  const getFaves = (collection) => {
    UserService.getCollection(collection).then((result) => {
      if (result[0]) {
        setFaveImageData({
          images: result[0].images,
          account: result[0].account,
        });
      }
    });
  };

  const updateFaveCollectionsList = () => {
    ImageService.getFaveCollections().then(
      (result) => setFaveImageCollections(result),
      setIsLoaded(true)
    );
  };

  const displayAllImages = () => {
    if (collectionName === null) {
      setCollectionName(null);
    }
    setIsFaveCollection(false);
    setAllNavSelection(true);
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
    <React.Fragment>
      <Navigation
        collectionName={collectionName}
        loadFaveCollection={loadFaveCollection}
        updateFaves={updateFaves}
        updateFaveCollectionsList={updateFaveCollectionsList}
        showCreateModal={showCreateModalHandler}
        showChooseModal={showChooseModalHandler}
        displayAllImages={displayAllImages}
        allNavSelection={allNavSelection}
      />
      <Layout
        allImageData={allImageData}
        faveImageData={faveImageData}
        isLoaded={isLoaded}
        isFaveCollection={isFaveCollection}
        collectionName={collectionName}
        updateFaves={updateFaves}
      />
      {createModalIsShown && (
        <CreateFave
          onClose={hideCreateModalHandler}
          loadFaveCollection={loadFaveCollection}
          updateFaveCollectionsList={updateFaveCollectionsList}
        ></CreateFave>
      )}
      {chooseModalIsShown && (
        <ChooseFave
          onClose={hideChooseModalHandler}
          faveImageCollections={faveImageCollections}
          loadFaveCollection={loadFaveCollection}
          updateFaveCollectionsList={updateFaveCollectionsList}
        ></ChooseFave>
      )}
    </React.Fragment>
  );
};

export default Main;
