import React from "react";

const FavoritesContext = React.createContext({
  faveImageData: {
      images: [],
      account: null
  },
  addFaveImage: (img) => {},
  removeFaveImage: (img) => {},
});

export default FavoritesContext;
