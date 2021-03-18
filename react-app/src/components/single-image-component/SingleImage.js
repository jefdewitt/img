import React from 'react';

const SingleImage = (props) => {

    return (
        <div>
            <img src={props.source.url} alt={props.source.alt}></img>
        </div>
    );
}

export default SingleImage
