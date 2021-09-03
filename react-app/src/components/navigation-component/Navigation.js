import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Layout from "../layout-component/Layout";
// import FaveSelectionContainer from "../fave-selection-container-component/FaveSelectionContainer";
import CreateFave from "../create-favorites-collection-component/CreateFaveCollection";
import ChooseFave from "../choose-favorites-collection-component/ChooseFaveCollection";
import "./Navigation.css";

const Navigation = (props) => {
  // const [showMenu, setShowMenu] = useState(false);
  const [createModalIsShown, setCreateModalIsShown] = useState(false);
  const [chooseModalIsShown, setChooseModalIsShown] = useState(false);

  const allMemes = "All Memes";
  const startCollection = "Start a Collection";
  const chooseCollection = "Choose a Collection";
  const faveMemes = "Fave Memes";

  let isFaveCollection = true;

  // const displayMenu = () => {
  //   setShowMenu(!showMenu);
  // };

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

  return (
    <Router>
      <div
        className="navigation"
        // onClick={() => {
        //   displayMenu();
        // }}
      >
        <h1>img</h1>
        <ul>
          <li>
            <Link
              to="/img"
              onClick={() => {
                props.updateFaves();
              }}
            >
              {allMemes}
            </Link>
          </li>
          <li>
            <Link
              to="/img/create-faves"
              onClick={() => {
                showCreateModalHandler();
              }}
            >
              {startCollection}
            </Link>
          </li>
          <li>
            <Link
              to="/img/view-faves"
              onClick={() => {
                showChooseModalHandler();
              }}
            >
              {chooseCollection}
            </Link>
          </li>
          {props.collectionName !== "" && (
            <li>
              <Link
                to="/img/favorites"
                onClick={() => {
                  props.updateFaves();
                }}
              >
                {faveMemes}
              </Link>
            </li>
          )}
        </ul>
        {/* <button>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </button> */}
      </div>

      <Switch>
        <Route
          exact
          path="/img"
          component={() => (
            <Layout
              allImageData={props.allImageData}
              faveImageData={props.faveImageData}
              isLoaded={props.isLoaded}
              isFaveCollection={!isFaveCollection}
              collectionName={props.collectionName}
              updateFaves={props.updateFaves}
            />
          )}
        />
        <Route
          path="/img/create-faves"
          render={() => {
            return (
              // <FaveSelectionContainer
              //   faveImageCollections={props.faveImageCollections}
              //   // createNewClick={props.createNewClick}
              //   loadFaveCollection={props.loadFaveCollection}
              //   updateFaveCollectionsList={props.updateFaveCollectionsList}
              // />
              <React.Fragment>
                {createModalIsShown && (
                  <CreateFave
                    onClose={hideCreateModalHandler}
                    // createNewClick={true}
                    loadFaveCollection={props.loadFaveCollection}
                    updateFaveCollectionsList={props.updateFaveCollectionsList}
                  ></CreateFave>
                )}
              </React.Fragment>
            );
          }}
        />
        <Route
          path="/img/view-faves"
          component={() => (
            <React.Fragment>
              {chooseModalIsShown && (
                <ChooseFave
                  onClose={hideChooseModalHandler}
                  // createNewClick={true}
                  loadFaveCollection={props.loadFaveCollection}
                  updateFaveCollectionsList={props.updateFaveCollectionsList}
                ></ChooseFave>
              )}
            </React.Fragment>
          )}
        />
        <Route
          path="/img/favorites"
          component={() => (
            <Layout
              faveImageData={props.faveImageData}
              isLoaded={props.isLoaded}
              isFaveCollection={isFaveCollection}
              collectionName={props.collectionName}
              updateFaves={props.updateFaves}
            />
          )}
        />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </Router>
  );
};

export default Navigation;
