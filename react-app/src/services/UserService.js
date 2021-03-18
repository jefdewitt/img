
const UserService = {

    addCollection: function(name) {
        return fetch('https://meme-server.herokuapp.com/img/add-collection', {
        // return fetch('http://localhost:3001/add-collection', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                account: Math.floor(100000 + Math.random() * 900000)
            })
        })

    },

    getCollection: async function(name) {
        const response = await fetch('https://meme-server.herokuapp.com/img/get-collection/' + name)
        // const response = await fetch('http://localhost:3001/get-collection/' + name);
        const json = await response.json();
        return json;
    }
}

export default UserService
