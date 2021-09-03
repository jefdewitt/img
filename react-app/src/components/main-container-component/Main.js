import React, { useState, useEffect } from "react";

import Navigation from "../navigation-component/Navigation";
import UserService from "../../services/UserService";
import ImageService from "../../services/ImageService";
import Layout from "../layout-component/Layout";
import CreateFave from "../create-favorites-collection-component/CreateFaveCollection";
import ChooseFave from "../choose-favorites-collection-component/ChooseFaveCollection";

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
  // const createNewClick = true;

  // let isFaveCollection = true;

  const updateFaves = () => {
    getFaves(collectionName);
  };

  const loadFaveCollection = (collection) => {
    setCollectionName(collection);
    setIsFaveCollection(true);
    if (collection.trim().length > 0) {
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
    if (collectionName === "") {
      setCollectionName(null);
    }
    setIsFaveCollection(false);
  }

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
        // allImageData={allImageData}
        // faveImageData={faveImageData}
        // faveImageCollections={faveImageCollections}
        // isLoaded={isLoaded}
        // isFaveCollection={isFaveCollection}
        // createNewClick={createNewClick}
        collectionName={collectionName}
        loadFaveCollection={loadFaveCollection}
        updateFaves={updateFaves}
        updateFaveCollectionsList={updateFaveCollectionsList}
        showCreateModal={showCreateModalHandler}
        showChooseModal={showChooseModalHandler}
        displayAllImages={displayAllImages}
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
          // createNewClick={true}
          loadFaveCollection={loadFaveCollection}
          updateFaveCollectionsList={updateFaveCollectionsList}
        ></CreateFave>
      )}
      {chooseModalIsShown && (
        <ChooseFave
          onClose={hideChooseModalHandler}
          // createNewClick={true}
          faveImageCollections={faveImageCollections}
          loadFaveCollection={loadFaveCollection}
          updateFaveCollectionsList={updateFaveCollectionsList}
        ></ChooseFave>
      )}
    </div>
  );
};

export default Main;
