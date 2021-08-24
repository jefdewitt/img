import React, { useEffect, useState, useRef } from "react";

import "./Layout.css";
import SelectableIcons from "../selectable-icons-component/SelectableIcons";

const Layout = React.forwardRef((props, ref) => {
  let images = !props.isFaveCollection
    ? props.allImageData
    : props.faveImageData;

  const [imageRef, setImageRef] = useState(images[0]);
  const [showColumn, setShowColumn] = useState(false);

  const displayColumn = (item) => {
    setShowColumn(!showColumn);

    if (props.collectionName && showColumn === false) {
      props.updateFaves();
    }
  };

  useEffect(() => {
    if (imageRef && typeof imageRef.scrollIntoView === 'function') {
      imageRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
  }, [showColumn, imageRef]);

  return (
    <React.Fragment>
      {!props.isLoaded && <div>Loading... {props.isLoaded}</div>}
      {props.isFaveCollection && !props.faveImageData && (
        <div>No favorite images</div>
      )}
      <div className={showColumn ? "column" : "grid"}>
        <ul>
          {images.map((image, index) => {
            const selectedImageRef = useRef();
            return (
              <li
                id={index}
                key={index}
                ref={selectedImageRef}
                onClick={() => {
                  displayColumn(image);
                  setImageRef(selectedImageRef.current);
                }}
              >
                <SelectableIcons
                  source={image}
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
});
// }

export default Layout;
