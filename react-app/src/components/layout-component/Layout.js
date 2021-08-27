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
    setShowColumn(showColumn = !showColumn);

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

  return (
    <React.Fragment>
      {!props.isLoaded && <div>Loading... {props.isLoaded}</div>}
      {props.isFaveCollection && props.faveImageData.length === 0 && (
        <div>No favorite images. Make selections to see them here.</div>
      )}
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
                  source={{...image, account: props.faveImageData.account}}
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
    </React.Fragment>
  );
};

export default Layout;
