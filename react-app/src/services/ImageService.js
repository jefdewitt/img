const apiBaseUrl = 'http://localhost:3001/img'; // dev
// const apiBaseUrl = 'https://meme-server2.herokuapp.com/img'; // prod

const ImageService = {

    // Get all images
    getAllImages: async function() {
        const response = await fetch(apiBaseUrl, {mode: 'cors'});
        const json = await response.json();
        return json;
    },

    // Get fave image collections
    getFaveCollections: async function() {
        const response = await fetch(apiBaseUrl+'/favoriteCollectionsList', {mode: 'cors'});
        const json = await response.json();
        return json;
    },

    addToFaveImages: async function(collectionName, imageId, imageUrl, accountNum) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: collectionName,
                _id: imageId,
                url: imageUrl,
                account: accountNum,
                alt: ''
            })
        }
        const response = await fetch(apiBaseUrl + '/addToFavoritesCollection', requestOptions)
        const json = await response.json();
        return json;
    },

    removeFromFaveImages: async function(collectionName, imageId) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: collectionName,
                _id: imageId
            })
        }
        const response = await fetch(apiBaseUrl + '/removeFromFavoritesCollection/' + collectionName + '/' + imageId, requestOptions)
        const json = await response.json();
        return json;
    }
}

export default ImageService
