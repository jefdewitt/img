
const ImageService = {

    // Get all images
    getAllImages: async function() {
        const response = await fetch("https://meme-server.herokuapp.com/img");
        const json = await response.json();
        return json;
    },

     // Get fave image collections
    getFaveCollections: async function() {
        const response = await fetch("https://meme-server.herokuapp.com/img/fave-collections");
        const json = await response.json();
        return json;
    },

    addToFaveImages: function(collectionName, imageId, imageUrl) {
        fetch('https://meme-server.herokuapp.com/img/add-to-favorites', {
        // fetch('http://localhost:3001/add-to-favorites', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: collectionName,
                _id: imageId,
                url: imageUrl,
                alt: ''
            })
        })
    },

    removeFromFaveImages: function(collectionName, imageId) {
        fetch('https://meme-server.herokuapp.com/img/remove-from-favorites/' + collectionName + '/' + imageId, {
        // fetch('http://localhost:3001/remove-from-favorites/' + collectionName + '/' + imageId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: collectionName,
                _id: imageId
            })
        }).then(result => {
            console.log("result", result)
        })
        .catch(e => console.error(e));
    }
}

export default ImageService
