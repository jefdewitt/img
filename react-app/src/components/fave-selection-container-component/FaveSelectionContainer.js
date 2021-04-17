import React, { Component } from 'react';

import ChooseFave from '../choose-favorites-collection-component/ChooseFaveCollection';
import CreateFave from '../create-favorites-collection-component/CreateFaveCollection';
import './FaveSelectionContainer.css';

class FaveSelectionContainer extends Component {

    constructor(props) {
        super();
        this.state = {
            showCreateCollectionComp: false
        }
    }

    /*
     * Gets event passed back up from child components.
     * This call comes from navigation.
     */
    displayCreateCollectionComp = (passedValue) => {
        this.setState({showCreateCollectionComp : passedValue});
    }

    /*
     * Gets called after state change.
     * This call comes from the component itself.
     */
    componentDidMount = () => {
        this.setState({showCreateCollectionComp : this.props.createNewClick});
    }

    render() {

        const {
            faveImageCollections,
            loadFaveCollection,
            updateFaveCollectionsList
        } = this.props;

        if (this.state.showCreateCollectionComp) {
            return (
                <React.Fragment>
                    <div className="fave-selection-container">
                        <ChooseFave
                            signInClick={false}
                            faveImageCollections={faveImageCollections}
                            displayCreateCollectionComp={this.displayCreateCollectionComp}>
                        </ChooseFave>
                        <CreateFave
                            createNewClick={true}
                            loadFaveCollection={loadFaveCollection}
                            updateFaveCollectionsList={updateFaveCollectionsList}>
                        </CreateFave>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="fave-selection-container">
                        <CreateFave
                            createNewClick={false}
                            displayCreateCollectionComp={this.displayCreateCollectionComp}>
                        </CreateFave>
                        <ChooseFave
                            signInClick={true}
                            faveImageCollections={faveImageCollections}
                            loadFaveCollection={loadFaveCollection}>
                        </ChooseFave>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default FaveSelectionContainer
