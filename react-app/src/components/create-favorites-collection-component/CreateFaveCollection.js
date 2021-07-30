import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from "react-router-dom";

import UserService from '../../services/UserService';

const CreateFave = (props) => {

    const [nameValue, setNameValue] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');

    const handleChange = (event) => {
        if (event.target.name === 'name') {
            setNameValue(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        UserService.addCollection(nameValue)
            .then(result => { setSubmissionSuccess(Boolean(result) ) }) ;
    }

    // If new account creation is successful, go back home
    const goToFaves = useCallback(() => {
        props.history.push("/img")
    }, [props]);

    // Called after state change (see the handleSubmit setState call above)
    useEffect(() => {
        try {
            if (submissionSuccess) {
                props.loadFaveCollection(nameValue);
                props.updateFaveCollectionsList();
                goToFaves();
            }
        } catch(e) {
            console.log(e);
        }
    }, [submissionSuccess, nameValue, props, goToFaves]);
    // }, []);

    if ( props.createNewClick ) {
        return (
            <div className="create-fave form">
                <h3>Create a new favorites folder</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Add a name:
                        <input type="text" name="name" onChange={handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    } else {
        return (
            <input type="submit" value="Create New" onClick={() => {props.displayCreateCollectionComp(true)}}></input>
        )
    }
}

export default withRouter(CreateFave)
