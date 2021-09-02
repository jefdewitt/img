import React, { useState, useEffect } from "react";

import SingleImage from "../single-image-component/SingleImage";
import "./SelectableIcons.css";
import ImageService from "../../services/ImageService";

const SelectableImage = (props) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleClass = (event) => {
    const currentState = isFavorited;
    setIsFavorited(!currentState);
    if (isFavorited !== true) {
      ImageService.addToFaveImages(
        props.collectionName,
        props.source._id,
        props.source.url,
        props.source.account
      );
      if (props.showColumn) {
        event.stopPropagation();
      } else {
        props.updateFaves();
      }
    } else {
      ImageService.removeFromFaveImages(props.collectionName, props.source._id);
      if (props.showColumn) {
        event.stopPropagation();
      } else {
        props.updateFaves();
      }
    }
  };

  useEffect(() => {
    if (props.faveImageData.images) {
      const faveImageCheck =
        props.faveImageData.images
          .map(function (image) {
            return image._id;
          })
          .indexOf(props.source._id) !== -1;
      setIsFavorited(faveImageCheck);
    }
  }, [props.faveImageData, props.source._id]);

  if (props.collectionName && props.showColumn) {
    return (
        <React.Fragment>
          <SingleImage source={props.source} />
          <span
            className={isFavorited === true ? "fas fa-heart" : "far fa-heart"}
            onClick={toggleClass}
          ></span>
        </React.Fragment>
    )
  } else {
    return ( <SingleImage source={props.source} /> )
  }
};

export default SelectableImage;
