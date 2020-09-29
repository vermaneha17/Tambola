const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');

require('./db/mongoose');
const routes = require('./routes/index');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.use(responseHandler);

app.use('/', routes);

app.use(function (req, res, next) {
    return next(createError(404));
});

app.use(function (err, req, res, next) {

    let statusCode = err.status || 500;

    if (process.env.NODE_ENV !== 'development') {
        delete err.stack;
    }

    if (err.name === 'ValidationError') return res.status(err.status || 423).responseHandler([], Object.values(err.errors).map(elt => elt.message), err.status || 423);

    if (err.details) {
        err.message = err.details.map(item => {
            return item.message;
        });
    }

    res.status(statusCode).responseHandler([], err.message, statusCode);
});


app.listen(port, () => {
    console.log('Server is up on port:', port);
});