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
    .get(favoritesController.favoritesList)

router
    .route('/addToFavoritesCollection')
    .post(favoritesController.addToFavoritesCollection);

router
    .route('/removeFromFavoritesCollection/:name/:_id')
    .delete(favoritesController.removeFromFavoritesCollection);

router
    .route('/favoriteCollectionsList')
    .get(collectionsController.favoriteCollectionsList);

router
    .route('/addCollection')
    .get(collectionsController.addCollection);

router
    .route('/removeCollection/:name')
    .get(collectionsController.removeCollection);

module.exports = router;
