/**
 * Default route, load all image paths
 */
//  let images = [];
//  app.get('/img', function(req, res) {
//      db.collection('images').find().toArray(function(err, results) {// return collection documents as an array
//          // const image = req.cookies.image;
//          if (err) return console.log(err)
//          images = results;
//          res.setHeader('Content-Type', 'application/json');
//          res.end(JSON.stringify({ mongoData: images }));
//      })
//  })

const mongoose = require('mongoose');
const Image = mongoose.model('images'); // Finds 'trips' inside models/travlr

// Get image list
const imagesList = async (req, res) => {
    console.log("inside imageController")
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
