import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class ChooseFave extends Component {

    constructor(props) {
        super();
        this.state = {
            nameValue: '',
            submissionSuccess: ''
        };
    }

    handleChange = (event) => {
        if (event.target.name !== 'Select a folder') {
            this.setState({
                nameValue: event.target.value
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.nameValue !== '' && this.state.nameValue !== 'Select a folder') {
            this.props.loadFaveCollection(this.state.nameValue);
            this.goToFaves();
        }
    }

    // If account selection is successful, go to favorites
    goToFaves() {
        this.props.history.push("/img/favorites")
    }

    render () {

        if ( this.props.signInClick ) {
            return (
                <div className="choose-fave form">
                    <h3>Choose a favorites collection</h3>
                    <form onSubmit={this.handleSubmit}>
                        <select onChange={this.handleChange}>
                            {this.props.faveImageCollections.map((collection, key) => {
                                return <option key={key} value={collection.name}>{collection.name}</option>;
                            })}
                        </select>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                )
        } else {
            return (
                <input type="submit" value="Choose One" onClick={() => {this.props.displayJoinNow(false)}}></input>
            )
        }
    }
}

export default withRouter(ChooseFave)
