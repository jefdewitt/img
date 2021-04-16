const mongoose = require('mongoose');

// Define image schema
const imageSchema = new mongoose.Schema({
    url: { type: String, required: true, index: true},
    alt: { type: String },
    itemNumber: { type: String, required: true }
})
mongoose.model('images', imageSchema);

// Define favorite image schema
const favoriteSchema = new mongoose.Schema({
    url: { type: String, required: true, index: true},
    alt: { type: String },
    itemNumber: { type: String, required: true }
})
mongoose.model('favorites', favoriteSchema);

// Define image collection schema
const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true},
    account: { type: String, required: true },
    faveImages: [imageSchema]
})
mongoose.model('faveImageCollections', collectionSchema);
