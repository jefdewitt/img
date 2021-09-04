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
  const [createGalleryModalIsShown, setCreateGalleryModalIsShown] = useState(false);
  const [chooseGalleryModalIsShown, setChooseGalleryModalIsShown] = useState(false);
  const [isFaveCollection, setIsFaveCollection] = useState(false);

  const showCreateGalleryModalHandler = () => {
    setCreateGalleryModalIsShown(true);
  };

  const hideCreateGalleryModalHandler = () => {
    setCreateGalleryModalIsShown(false);
  };

  const showChooseGalleryModalHandler = () => {
    setChooseGalleryModalIsShown(true);
  };

  const hideChooseGalleryModalHandler = () => {
    setChooseGalleryModalIsShown(false);
  };

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
        showCreateModal={showCreateGalleryModalHandler}
        showChooseModal={showChooseGalleryModalHandler}
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
      {createGalleryModalIsShown && (
        <CreateFave
          onClose={hideCreateGalleryModalHandler}
          loadFaveCollection={loadFaveCollection}
          updateFaveCollectionsList={updateFaveCollectionsList}
        ></CreateFave>
      )}
      {chooseGalleryModalIsShown && (
        <ChooseFave
          onClose={hideChooseGalleryModalHandler}
          faveImageCollections={faveImageCollections}
          loadFaveCollection={loadFaveCollection}
          updateFaveCollectionsList={updateFaveCollectionsList}
        ></ChooseFave>
      )}
    </React.Fragment>
  );
};

export default Main;
