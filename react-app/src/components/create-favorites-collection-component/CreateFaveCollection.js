import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import UserService from '../../services/UserService';

class CreateFave extends Component {

    constructor(props) {
        super();
        this.state = {
            nameValue: '',
            submissionSuccess: ''
        };
    }

    handleChange = (event) => {
        if (event.target.name === 'name') {
            this.setState({
                nameValue: event.target.value
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        UserService.addCollection(this.state.nameValue)
            .then(result => { this.setState({ submissionSuccess: Boolean(result) }) });
    }

    // If new account creation is successful, go back home
    goToFaves() {
        this.props.history.push("/img")
    }

    // Called after state change (see the handleSubmit setState call above)
    componentDidUpdate() {
        try {
            if (this.state.submissionSuccess) {
                this.props.loadFaveCollection(this.state.nameValue);
                this.props.updateFaveCollectionsList();
                this.goToFaves();
            }
        } catch(e) {
            console.log(e);
        }
    }

    render() {

        if ( this.props.createNewClick ) {
            return (
                <div className="create-fave form">
                    <h3>Create a new favorites folder</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Add a name:
                            <input type="text" name="name" onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            )
        } else {
            return (
                <input type="submit" value="Create New" onClick={() => {this.props.displayCreateCollectionComp(true)}}></input>
            )
        }

    }
}

export default withRouter(CreateFave)
