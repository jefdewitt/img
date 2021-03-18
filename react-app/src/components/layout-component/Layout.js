import React, { Component } from 'react';

import './Layout.css';
import SelectableIcons from '../selectable-icons-component/SelectableIcons';

class Layout extends Component {

    constructor() {
        super();
        this.state = {
            image: null,
            ref: null,
            showColumn: false
        }
    }

    displayColumn(item) {
        this.setState({ showColumn: !this.state.showColumn, image: item }, () => {
            if (this.props.collectionName && this.state.showColumn === false) {
                this.props.updateFaves();
            }
        })
    }

    scrollToImage(newRef) {
        this.setState({ref : newRef.current}, () => {
            this.state.ref.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        })
    }

    render() {

        let images = (!this.props.isFaveCollection) ? this.props.allImageData : this.props.faveImageData;
        const collectionName = this.props.collectionName;
        const updateFaves = this.props.updateFaves;
        console.log(!this.props.isFaveCollection && !this.props.faveImageData)

        if (!this.props.isLoaded) {
            return <div>Loading... {this.props.isLoaded}</div>
        } else if (this.props.isFaveCollection && !this.props.faveImageData) {
            return <div>No favorite images</div>
        } else {
            return (
                <div className={this.state.showColumn? 'column' : 'grid'}>
                    <ul>
                        {images.map((image, index) => {
                            const newRef = React.createRef();
                            return (
                                <li
                                    id={index}
                                    key={index}
                                    ref={newRef}
                                    onClick={() => {this.displayColumn(image); this.scrollToImage(newRef);}}
                                >
                                    <SelectableIcons
                                        source={image}
                                        faveImageData={this.props.faveImageData}
                                        collectionName={collectionName}
                                        updateFaves={updateFaves}
                                        showColumn={this.state.showColumn}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }
}

export default Layout
