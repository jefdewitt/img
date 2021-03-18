import React, { Component } from 'react';

import ChooseFave from '../choose-favorites-collection-component/ChooseFaveCollection';
import CreateFave from '../create-favorites-collection-component/CreateFaveCollection';
import './FaveSelectionContainer.css';

class FaveSelectionContainer extends Component {

    constructor(props) {
        super();
        this.state = {
            showJoinNow: false
        }
    }

    /*
     * Gets event passed back up from child components.
     * This call comes from navigation.
     */
    displayJoinNow = (passedValue) => {
        this.setState({showJoinNow : passedValue});
    }

    /*
     * Gets called after state change.
     * This call comes from the component itself.
     */
    componentDidMount = () => {
        this.setState({showJoinNow : this.props.createNewClick});
    }

    render() {

        const {
            faveImageCollections,
            loadFaveCollection,
            updateFaveCollectionsList
        } = this.props;

        if (this.state.showJoinNow) {
            return (
                <React.Fragment>
                    <div className="fave-selection-container">
                        <ChooseFave
                            signInClick={false}
                            faveImageCollections={faveImageCollections}
                            displayJoinNow={this.displayJoinNow}>
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
                            displayJoinNow={this.displayJoinNow}>
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
