import React, { Component } from 'react';

import SingleImage from '../single-image-component/SingleImage';
import './SelectableIcons.css';
import ImageService from '../../services/ImageService';

class SelectableImage extends Component {

    constructor() {
        super();
        this.state = {
            favorited: false
        };
    }

    toggleClass = (event) => {
        const currentState = this.state.favorited;
        this.setState({ favorited: !currentState });
        if (this.state.favorited !== true) {
            ImageService.addToFaveImages(this.props.collectionName, this.props.source._id, this.props.source.url);
            if (this.props.showColumn) {
                event.stopPropagation();
            } else {
                this.props.updateFaves();
            }
        } else {
            ImageService.removeFromFaveImages(this.props.collectionName, this.props.source._id);
            if (this.props.showColumn) {
                event.stopPropagation();
            } else {
                this.props.updateFaves();
            }
        }
    };

    componentDidMount() {
        if (this.props.faveImageData) {
            const faveImageCheck = (this.props.faveImageData.map(function(image) {
                return image._id;
            }).indexOf(this.props.source._id) !== -1);
            this.setState({
                favorited: faveImageCheck
            })
        }
    }

    render() {

        if (this.props.collectionName && this.props.showColumn) {
            return (
                <React.Fragment>
                    <SingleImage source={this.props.source}/>
                    <i className={ (this.state.favorited === true) ? 'fas fa-heart' : 'far fa-heart' }
                    onClick={ this.toggleClass }></i>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <SingleImage source={this.props.source}/>
                </React.Fragment>
            )
        }
    }
}

export default SelectableImage
