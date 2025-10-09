const mongoose = require('mongoose');

module.exports = async function connect() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'tattler';
  if (!uri) throw new Error('Missing MONGODB_URI in .env');

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName });

  // Diagnóstico del mongodb host
  console.log('[DB] conectado a', mongoose.connection.host, 'db=', mongoose.connection.db.databaseName);
  const col = await mongoose.connection.db.listCollections({ name: 'Restaurantes' }).next();
  console.log('[DB] existe coleccion "Restaurantes"?', Boolean(col));

  return mongoose.connection;
};
