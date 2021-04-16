const express = require('express');
const router = express.Router();

const imagesController = require('../controllers/images');
const favoritesController = require('../controllers/favorites')

router
    .route('/')
    .get(imagesController.imagesList);

router
    .route('/favorites')
    .get(favoritesController.favoriteCollectionsList)

 router
    .route('/addToFavoritesCollection')
    .post(favoritesController.addToFavoritesCollection);

router
    .route('/removeFromFavoritesCollection/:name/:_id')
    .delete(favoritesController.removeFromFavoritesCollection);

 /**
  * Collections route, load all favorite collections
  */
//  let faveImageCollections = [];
//  app.get('/img/fave-collections', function(req, res) {
//      db.collection('fave-collections').find().toArray(function(err, results) { // return collection documents as an array
//          // const favoriteImage = req.cookies.favoriteImage;
//          if (err) return console.log(err)
//          faveImageCollections = results;
//          res.setHeader('Content-Type', 'application/json');
//          res.send(JSON.stringify({ mongoData: results }));
//      })
//  })

//  /**
//   * Add collection to collections.
//   */
//  app.post('/img/add-collection', (req, res) => {
//      req.body._id = new ObjectId(req.body._id);
//      req.body.images = [];
//      db.collection('fave-collections').insertOne(req.body, (err, result) => {
//          if (err) return console.log(err)
//          res.send('Account added to fave collection');
//      })
//  })

//  /**
//   * Get images from a collection.
//   */
//  app.get('/img/get-collection/:name', function(req, res) {
//      db.collection('fave-collections').findOne({'name' : req.params.name}, (err, result) => {
//          if (err) return console.log(err)
//          if (result != null) {
//              res.setHeader('Content-Type', 'application/json');
//              res.send({'images' : result.images });
//          } else {
//              res.send({data: 'Collection not found'});
//          }
//      })
//  })

//  app.get('/img/create-faves', function(request, response) {
//      response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
//  });

module.exports = router;
