require('dotenv').config();
const app = require('./app');
const connect = require('./config/db');

//add for spanish version
const Restaurant = require('./models/Restaurant');
console.log('[Model] collection:', Restaurant.collection.collectionName);
console.log('[Model] fields:', Object.keys(Restaurant.schema.paths));

const PORT = process.env.PORT || 3000;

connect().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('DB connection error:', err);
  process.exit(1);
});
