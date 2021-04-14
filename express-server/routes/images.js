var express = require('express');
var router = express.Router();

// Get the images controller
const controller = require('../controllers/images');

// GET travel page.
router.get('/img', controller.imagesList);

module.exports = router;
