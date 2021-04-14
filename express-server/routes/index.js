const express = require('express');
const router = express.Router();

const imagesController = require('../controllers/images');

router
    .route('/')
    .get(imagesController.imagesList);

module.exports = router;
