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
        props.source.url
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
    if (props.faveImageData) {
      const faveImageCheck =
        props.faveImageData
          .map(function (image) {
            return image._id;
          })
          .indexOf(props.source._id) !== -1;
      setIsFavorited(faveImageCheck);
    }
  }, [props.faveImageData, props.source._id]);

  return (
    <React.Fragment>
      {props.collectionName && props.showColumn && (
        <React.Fragment>
          <SingleImage source={props.source} />
          <i
            className={isFavorited === true ? "fas fa-heart" : "far fa-heart"}
            onClick={toggleClass}
          ></i>
        </React.Fragment>
      )}
      <SingleImage source={props.source} />
    </React.Fragment>
  );
};

export default SelectableImage;
