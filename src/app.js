const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const restaurantsRouter = require('./routes/restaurants.routes');
//add for spanish version
const Restaurant = require('./models/Restaurant');
console.log('[Model] collection:', Restaurant.collection.collectionName);
console.log('[Model] fields:', Object.keys(Restaurant.schema.paths));

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/restaurants', restaurantsRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

//no cache in the program
app.set('etag', false);
app.use((_, res, next) => { res.set('Cache-Control','no-store'); next(); });

//this is a better look for the progam
app.set('json spaces', 2);           // identado en dev
app.set('etag', false);
app.use((_, res, next) => { res.set('Cache-Control','no-store'); next(); });


module.exports = app;
