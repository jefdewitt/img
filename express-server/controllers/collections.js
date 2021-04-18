const mongoose = require('mongoose');
const Collection = mongoose.model('faveImageCollections');


// GET: /favoritesCollectionsList - load all favorite memes collections
const favoriteCollectionsList = async (req, res) => {
    Collection
        .find({}) // empty filter object to return all the collections
        .exec((err, collection) => { // callback with error object and collection(s)
            if (!collection) { // if no collection
                return res
                    .status(404) // set HTTP status code
                    .json({ "message": "Collections not found" }); // return JSON formatted error block
            } else if (err) { // if error
                return res
                    .status(404)
                    .json(err);
            } else { // success!
                return res
                    .status(200)
                    .json(collection);
            }
        });
};

// POST: /addCollection - adds a new collection to list
const addCollection = async (req, res) => {
    const collection = new Collection({
        name: req.body.name,
        account: req.body.account,
        images: []
    })
    Collection
        .create(collection)
        .then(collection => {
            debugger;
            if (!collection) {
                return res
                    .status(404)
                    .send({
                        message: "Collection not added with name: " + req.body.name
                    });
            }
            res.send(collection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Collection not added with name: " + req.body.name
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
};

// DELETE: /removeCollection - removes a collection
const removeCollection = async (req, res) => {
    Collection
        .findOneAndDelete({ 'name': req.body.name })
        .then(collection => {
            if (!collection) {
                return res
                    .status(404)
                    .send({
                        message: "Collection not found with name: " + req.body.name
                    });
            }
            res.send(collection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Collection not found with name: " + req.body.name
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
};

module.exports = {
    favoriteCollectionsList,
    addCollection,
    removeCollection
}
