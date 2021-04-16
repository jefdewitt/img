const mongoose = require('mongoose');
const Image = mongoose.model('images');
const Collection = mongoose.model('faveImageCollections');  // Finds 'trips' inside models/travlr

// Get favorite list
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

// POST: /addToFavoritesCollection - adds an image to favorites collection
const addToFavoritesCollection = async (req, res) => {
    const image = new Image({
        _id: req.body._id,
        url: req.body.url,
        alt: ''
    })
    Collection
        .findOneAndUpdate(
            { 'name': req.body.name },
            { faveImages: image },
            { new: true }
        )
        .then(image => {
            if (!image) {
                return res
                    .status(404)
                    .send({
                        message: "Collection not found with code " + req.body.name
                    });
            }
            res.send(image);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Collection not found with code " + req.body.name
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
};

// POST: /removeFromFavoritesCollection - adds an image to favorites collection
const removeFromFavoritesCollection = async (req, res) => {
    Collection
        .findOneAndDelete(
            { 'name': req.body.name },
            { images: {_id: req.body._id} }
        )
        .then(image => {
            if (!image) {
                return res
                    .status(404)
                    .send({
                        message: "Collection not found with code " + req.body.name
                    });
            }
            res.send(image);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Collection not found with code " + req.body.name
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
};

// Needs to be exported as module before another file can import it
module.exports = {
    favoriteCollectionsList,
    addToFavoritesCollection,
    removeFromFavoritesCollection
}
