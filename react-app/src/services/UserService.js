const apiBaseUrl = 'http://localhost:3002/img'; // dev
// const apiBaseUrl = 'https://meme-server.herokuapp.com/img'; // prod

const UserService = {

    addCollection: async function(collectionName) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: collectionName,
                account: Math.floor(100000 + Math.random() * 900000)
            })
        }
        const response = await fetch(apiBaseUrl + '/addCollection', requestOptions)
        const json = await response.json();
        return json;
    },

    getCollection: async function(name) {
        const response = await fetch(apiBaseUrl + '/favorites/' + name)
        const json = await response.json();
        return json;
    }
}

export default UserService
