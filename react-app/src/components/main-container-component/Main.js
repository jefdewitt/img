import React, { Component } from 'react';

import Navigation from '../navigation-component/Navigation';
import UserService from '../../services/UserService';
import ImageService from '../../services/ImageService';

class Main extends Component {

    constructor() {
        super();
        this.state = {
            allImageData: [],
            faveImageData: [],
            faveImageCollections: [],
            isLoaded: false,
            isFaveCollection: true,
            createNewClick: true,
            hasFaves: false,
            collectionName: ''
        }
    }

    updateFaves = () => {
        this.getFaves(this.state.collectionName);
    }

    loadFaveCollection = (collection) => {
        this.setState({collectionName: collection}, () => {
            this.getFaves(this.state.collectionName);
        })
    }

    getFaves = (collection) => {
        UserService.getCollection(collection)
            .then(result => { this.setState({
                faveImageData: result[0].faveImages
            })});
    }

    updateFaveCollectionsList = () => {
        ImageService.getFaveCollections()
            .then(result => this.setState({
                isLoaded: true,
                faveImageCollections: result
            }));
    }

    // Gets called after first render
    componentDidMount() {
        // Get all images
        ImageService.getAllImages()
            .then(result => {
                this.setState({
                    allImageData: result
                })
            });

         // Get fave image collections
        this.updateFaveCollectionsList();
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
        } = this.state;

            return (
                <div className="main">
                    <Navigation
                        allImageData={allImageData}
                        faveImageData={faveImageData}
                        faveImageCollections={faveImageCollections}
                        isLoaded={isLoaded}
                        isFaveCollection={isFaveCollection}
                        createNewClick={createNewClick}
                        collectionName={collectionName}
                        loadFaveCollection={this.loadFaveCollection}
                        updateFaves={this.updateFaves}
                        updateFaveCollectionsList={this.updateFaveCollectionsList}/>
                </div>
        )
    }
}

export default Main
