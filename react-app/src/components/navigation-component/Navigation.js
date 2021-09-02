import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Layout from "../layout-component/Layout";
import FaveSelectionContainer from "../fave-selection-container-component/FaveSelectionContainer";
import "./Navigation.css";

const Navigation = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const allMemes = "All Memes";
  const startCollection = "Start a Collection";
  const chooseCollection = "Choose a Collection";
  const faveMemes = "Fave Memes";

  let isFaveCollection = true;

  const displayMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Router>
      <div
        className="navigation"
        onClick={() => {
          displayMenu();
        }}
      >
        <h1>img</h1>
        <ul className={showMenu ? "show" : "hide"}>
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
            <Link to="/img/create-faves">{startCollection}</Link>
          </li>
          <li>
            <Link to="/img/view-faves">{chooseCollection}</Link>
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
        <button>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </button>
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
            return props.isLoaded ? (
              <FaveSelectionContainer
                faveImageCollections={props.faveImageCollections}
                // createNewClick={props.createNewClick}
                loadFaveCollection={props.loadFaveCollection}
                updateFaveCollectionsList={props.updateFaveCollectionsList}
              />
            ) : (
              <Redirect to="/img" />
            );
          }}
        />
        <Route
          path="/img/view-faves"
          component={() => (
            <FaveSelectionContainer
              faveImageCollections={props.faveImageCollections}
              loadFaveCollection={props.loadFaveCollection}
              updateFaveCollectionsList={props.updateFaveCollectionsList}
            />
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
