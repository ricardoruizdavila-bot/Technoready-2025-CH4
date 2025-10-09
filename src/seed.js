require('dotenv').config();
const fs = require('fs');
const path = require('path');
const connect = require('./config/db');
const Restaurant = require('./models/Restaurant');

(async () => {
  try {
    await connect();

    // Busca el archivo de datos en la raíz del proyecto
    const candidates = ['restaurants.json', 'restaurantes.json'];
    const file = candidates.find(f => fs.existsSync(path.join(process.cwd(), f)));
    if (!file) {
      console.error(' No se encontró restaurants.json ni restaurantes.json en la raíz del proyecto.');
      process.exit(1);
    }

    const raw = fs.readFileSync(file, 'utf8');
    let data = JSON.parse(raw);

    // Si el JSON no es un array, intenta detectar propiedad contenedora
    if (!Array.isArray(data)) {
      if (Array.isArray(data.Restaurantes)) data = data.Restaurantes;
      else if (Array.isArray(data.restaurants)) data = data.restaurants;
      else {
        console.error(' El JSON no es un arreglo ni contiene una propiedad tipo arreglo reconocida.');
        process.exit(1);
      }
    }

    // Limpieza ligera (ej.: convertir Review a número si viene en string)
    const docs = data.map(d => ({
      ...d,
      Review: d.Review != null ? Number(d.Review) : d.Review
    }));

    // Resetea e inserta
    const del = await Restaurant.deleteMany({});
    await Restaurant.insertMany(docs, { ordered: false });

    console.log(` Seed OK. Eliminados=${del.deletedCount ?? 0}, insertados=${docs.length}, archivo=${file}`);
    process.exit(0);
  } catch (err) {
    console.error(' Seed error:', err.message);
    process.exit(1);
  }
})();
