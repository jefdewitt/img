const mongoose = require('mongoose');
const Image = mongoose.model('images'); // Finds 'trips' inside models/travlr

// Get image list
const imagesList = async (req, res) => {
    Image
        .find({}) // empty filter object to return all the trips
        .exec((err, images) => { // callback with error object and images
            if (!images) { // if no images
                return res
                    .status(404) // set HTTP status code
                    .json({ "message": "images not found" }); // return JSON formatted error block
            } else if (err) { // if error
                return res
                    .status(404)
                    .json(err);
            } else { // success!
                return res
                    .status(200)
                    .json(images);
            }
        });
};

// Needs to be exported as module before another file can import it
module.exports = {
    imagesList
}
