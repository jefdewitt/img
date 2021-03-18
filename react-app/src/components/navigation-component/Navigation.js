import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Layout from '../layout-component/Layout';
import FaveSelectionContainer from '../fave-selection-container-component/FaveSelectionContainer';
import './Navigation.css';


class Navigation extends Component {

    constructor() {
        super();
        this.state = {
           showFaves : true,
           showMenu : false
        }
    }

    displayMenu = () => {
        this.setState({showMenu : !this.state.showMenu})
    }

    render() {

        const {
          allImageData,
          faveImageData,
          faveImageCollections,
          isLoaded,
          isFaveCollection,
          createNewClick,
          collectionName,
          updateFaves,
          loadFaveCollection,
          updateFaveCollectionsList
        } = this.props;

        if (this.props.collectionName !== '') {
            return (
              <Router>
                  <div className="navigation" onClick={() => {this.displayMenu()}}>
                      <h1>img</h1>
                      <ul className={this.state.showMenu ? 'show' : 'hide'}>
                          <li>
                              <Link to="/img" onClick={() => {this.props.updateFaves()}}>All Memes</Link>
                          </li>
                          <li>
                              <Link to="/img/create-faves">Start a Collection</Link>
                          </li>
                          <li>
                              <Link to="/img/view-faves">Choose a Fave Collection</Link>
                          </li>
                          <li>
                              <Link to="/img/favorites" onClick={() => {this.props.updateFaves()}}>Fave Memes</Link>
                          </li>
                      </ul>
                      <button><span>|</span><span>|</span><span>|</span></button>
                  </div>

                    <Switch>
                        <Route exact path="/img"
                            component={() =>
                                <Layout
                                    allImageData={allImageData}
                                    faveImageData={faveImageData}
                                    isLoaded={isLoaded}
                                    isFaveCollection={!isFaveCollection}
                                    collectionName={collectionName}
                                    updateFaves={updateFaves}
                                />
                            } />
                        <Route path="/img/create-faves"
                            render={() => {
                                return (
                                    this.props.isLoaded ?
                                    <FaveSelectionContainer
                                        faveImageCollections={faveImageCollections}
                                        createNewClick={createNewClick}
                                        loadFaveCollection={loadFaveCollection}
                                        updateFaveCollectionsList={updateFaveCollectionsList}
                                    /> :
                                    <Redirect to="/img"/>
                                )
                            }}
                            />
                        <Route path="/img/view-faves"
                            component={() =>
                                <FaveSelectionContainer
                                    faveImageCollections={faveImageCollections}
                                    loadFaveCollection={loadFaveCollection}
                                    updateFaveCollectionsList={updateFaveCollectionsList}
                                />
                            } />
                        <Route path="/img/favorites"
                            component={() =>
                                <Layout
                                    faveImageData={faveImageData}
                                    isLoaded={isLoaded}
                                    isFaveCollection={isFaveCollection}
                                    collectionName={collectionName}
                                    updateFaves={updateFaves}
                                />
                            } />
                        {/* <Route component={NoMatch} /> */}
                    </Switch>

                </Router>
            )
        } else {
            return (
              <Router>
                <div className="navigation" onClick={() => {this.displayMenu()}}>
                  <h1>img</h1>
                    <ul className={this.state.showMenu ? 'show' : 'hide'}>
                        <li>
                            <Link to="/img">All Memes</Link>
                        </li>
                        <li>
                            <Link to="/img/create-faves">Start a Collection</Link>
                        </li>
                        <li>
                            <Link to="/img/view-faves">Choose a Fave Collection</Link>
                        </li>
                    </ul>
                    <button><span>|</span><span>|</span><span>|</span></button>
                </div>

                <Switch>
                    <Route exact path="/img"
                        component={() =>
                            <Layout
                                allImageData={allImageData}
                                faveImageData={faveImageData}
                                isLoaded={isLoaded}
                                collectionName={collectionName}
                            />
                        } />
                    <Route path="/img/create-faves"
                        render={() => {
                            return (
                                this.props.isLoaded ?
                                <FaveSelectionContainer
                                    faveImageCollections={faveImageCollections}
                                    createNewClick={createNewClick}
                                    loadFaveCollection={loadFaveCollection}
                                    updateFaveCollectionsList={updateFaveCollectionsList}
                                /> :
                                <Layout
                                    allImageData={allImageData}
                                    faveImageData={faveImageData}
                                    isLoaded={isLoaded}
                                    collectionName={collectionName}
                                />
                            )
                        }}
                    />
                    <Route path="/img/view-faves"
                        component={() =>
                            <FaveSelectionContainer
                                faveImageCollections={faveImageCollections}
                                loadFaveCollection={loadFaveCollection}
                                updateFaveCollectionsList={updateFaveCollectionsList}
                            />
                        } />
                    {/* <Route component={NoMatch} /> */}
                </Switch>

            </Router>
            )
        }
    }
}

export default Navigation;
