require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser= require('body-parser'); // parses form data & incoming req bodies from req.body
const cookieParser= require('cookie-parser');
const app = express();

var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

// Mongo DB configs
const MongoClient = require('mongodb').MongoClient;

let ObjectId = require('mongodb').ObjectID; // for use in deletion method, parses req.params
let db;

/**
 * Establish database connection
 */
MongoClient.connect(process.env.MONGO_DEETS, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) return console.log(err);
    db = client.db('memes') // whatever your database name is

    // app.listen(port, function() {
    //     console.log(`listening on ${port}`) // verifies server is up and running, exposed on port #
    // });

    app.listen(process.env.PORT || port, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
})

app.use(bodyParser.json()); // handle JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // handle x-www-form-urlencoded request bodies
app.use(cookieParser());

/**
 * Default route, load all image paths
 */
let images = [];
app.get('/img', function(req, res) {
    db.collection('images').find().toArray(function(err, results) {// return collection documents as an array
        // const image = req.cookies.image;
        if (err) return console.log(err)
        images = results;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mongoData: images }));
    })
})

/**
 * Favorites route, load all favorite image paths
 */
let faveImages = [];
app.get('/img/favorites', function(req, res) {
    db.collection('favorite-images').find().toArray(function(err, results) { // return collection documents as an array
        // const favoriteImage = req.cookies.favoriteImage;
        if (err) return console.log(err)
        faveImages = results;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mongoData: faveImages }));
    })
})

/**
 * Favorites route, load all favorite image paths
 */
let faveImageCollections = [];
app.get('/img/fave-collections', function(req, res) {
    db.collection('fave-collections').find().toArray(function(err, results) { // return collection documents as an array
        // const favoriteImage = req.cookies.favoriteImage;
        if (err) return console.log(err)
        faveImageCollections = results;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ mongoData: results }));
    })
})

/**
 * Add favorite image path to fave-collections.
 */
app.post('/img/add-to-favorites', (req, res) => {
    const query = {name: req.body.name};
    const newImage = { $push: {images: {_id: req.body._id, url: req.body.url, alt: ''} } };
    db.collection('fave-collections').updateOne(query, newImage, (err, result) => {
        if (err) return console.log(err)
        // res.send('Image added to favorites collection');
        res.end('Image added to favorites collection');
    })
})

/**
 * Remove favorited image from favorited-images table.
 */
app.delete('/img/remove-from-favorites/:name/:_id', (req, res) => {
    let id = ObjectId(req.params._id);
    const query = {name: req.body.name};
    const image = { $pull: {images: {_id: req.body._id} } };

    db.collection('fave-collections').updateOne(query, image, (err, result) => {
        if (err) throw err;
        res.send('Document matching id deleted');
    })
})

/**
 * Add collection to collections.
 */
app.post('/img/add-collection', (req, res) => {
    req.body._id = new ObjectId(req.body._id);
    req.body.images = [];
    db.collection('fave-collections').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        res.send('Account added to fave collection');
    })
})

/**
 * Get images from a collection.
 */
app.get('/img/get-collection/:name', function(req, res) {
    db.collection('fave-collections').findOne({'name' : req.params.name}, (err, result) => {
        if (err) return console.log(err)
        if (result != null) {
            res.setHeader('Content-Type', 'application/json');
            res.send({'images' : result.images });
        } else {
            res.send({data: 'Collection not found'});
        }
    })
})

app.get('/img/create-faves', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

/**
 * Template rendering
 */
// app.get('/form', function(req, res) {
//     res.render('form');
// })
