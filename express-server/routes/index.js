const express = require('express');
const router = express.Router();

const imagesController = require('../controllers/images');
const favoritesController = require('../controllers/favorites')
const collectionsController = require('../controllers/collections')

router
    .route('/')
    .get(imagesController.imagesList);

router
    .route('/favorites/:name')
    .get(favoritesController.favoriteMemes)

router
    .route('/addToFavoritesCollection')
    .post(favoritesController.addToFavoritesCollection);

router
    .route('/removeFromFavoritesCollection/:collectionName/:imageId')
    .delete(favoritesController.removeFromFavoritesCollection);

router
    .route('/favoriteCollectionsList')
    .get(collectionsController.favoriteCollectionsList);

router
    .route('/addCollection')
    .post(collectionsController.addCollection);

router
    .route('/removeCollection/:name')
    .get(collectionsController.removeCollection);

module.exports = router;
