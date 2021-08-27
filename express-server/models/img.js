const mongoose = require('mongoose');

// Define image schema
const imageSchema = new mongoose.Schema({
    url: { type: String, required: true, index: true},
    alt: { type: String }
})
mongoose.model('images', imageSchema);

// Define image collection schema
const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true},
    account: { type: Number, required: true },
    images: [imageSchema]
})
mongoose.model('faveImageCollections', collectionSchema);
