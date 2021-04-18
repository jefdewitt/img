require('dotenv').config();

const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const bodyParser= require('body-parser'); // parses form data & incoming req bodies from req.body
const cookieParser= require('cookie-parser');
var path = require('path');

require('./models/db'); // application connects to db on startup

const apiRouter = require('./routes/index'); // get router index for api endpoints

const app = express();

var listener = app.listen(parseInt(process.env.PORT, 10), function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(bodyParser.json()); // handle JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // handle x-www-form-urlencoded request bodies
app.use(cookieParser());

app.use('/img', apiRouter); // Any requests to api get passed to apiRouter

// Tell Express to serve our React app
app.use(express.static(path.join(__dirname, 'build')));
app.get('/img', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
