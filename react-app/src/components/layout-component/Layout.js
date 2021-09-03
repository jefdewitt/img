import React, { useEffect, useState } from "react";

import "./Layout.css";
import SelectableIcons from "../selectable-icons-component/SelectableIcons";

const Layout = (props) => {
  let images = props.isFaveCollection
    ? props.faveImageData.images
    : props.allImageData;

  const [imageRef, setImageRef] = useState();
  let [showColumn, setShowColumn] = useState(false);

  const displayColumn = () => {
    setShowColumn((showColumn = !showColumn));

    if (props.collectionName && showColumn === false) {
      // if transitioning from column (on faves page),
      // make call to get updated faves list to display in grid
      props.updateFaves();
    }
  };

  useEffect(() => {
    if (imageRef && typeof imageRef.scrollIntoView === "function") {
      imageRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [imageRef]);

  // return (
  // <React.Fragment>
  if (!props.isLoaded) {
    return (
      <div>
        <p>Loading... {props.isLoaded}</p>
      </div>
    );
  }
  if (
    props.collectionName === "" ||
    (props.collectionName && props.faveImageData.images.length === 0)
  ) {
    return (
      <div>
        <p>No favorite images. Make selections to see them here.</p>
      </div>
    );
  } else {
    return (
      <div className={showColumn ? "column" : "grid"}>
        <ul>
          {images.map((image, index) => {
            const selectedImageRef = React.createRef();
            return (
              <li
                id={index}
                key={index}
                ref={selectedImageRef}
                onClick={() => {
                  displayColumn();
                  setImageRef(selectedImageRef.current);
                }}
              >
                <SelectableIcons
                  source={{ ...image, account: props.faveImageData.account }}
                  faveImageData={props.faveImageData}
                  collectionName={props.collectionName}
                  updateFaves={props.updateFaves}
                  showColumn={showColumn}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Layout;
