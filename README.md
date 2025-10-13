## Technoready-2025-CH4
Proyect about Non-Relational Databases for Storing JSON Data from digital now

<details>
  <summary>📦 OBJETIVE</summary>

The project consists of transforming a restaurant directory platform to offer users a personalized and dynamic experience. To achieve this, non-relational databases—specifically MongoDB—will be used to store data in JSON format. Additionally, a RESTful API will be developed using Express.js to enable interaction with this data.

<details>
  <summary>📦 SPRINT 1</summary>
<details>
    
This sprint focuses on setting up the MongoDB database for the Tattler Restaurant Directory, designed to offer personalized and dynamic restaurant experiences.
The goal is to store restaurant data in a non-relational structure (JSON) and prepare it for later interaction through a RESTful API with Express.js.

## Installation & Usage
    
Install MongoDB and Compass
Download and install MongoDB Community Server
Make sure to include MongoDB Database Tools (required for mongoimport).
    
    Create the Database
Open MongoDB Compass
Connect to mongodb://localhost:27017
Create a database named restaurants
Create a collection named restaurants

    MongoDB Configuration

Database name: restaurants
Collection: restaurants
Data format: JSON documents and csv

Import tool: mongoimport (from MongoDB Database Tools)

Command used to import in mongodb:
```
"/c/Program Files/MongoDB/Tools/100/bin/mongoimport.exe" \
  --db=tattler \
  --collection=restaurants \
  --file "/c/Users/NITRO 5/Documents/3-Techno ready/CH 4/CH4techno/Backups/Restaurantes.Restaurantes.json" \
  --jsonArray
```

<details>
  <summary>📦 SPRINT 2</summary>
<details>
  
Develop a RESTful API using Express.js and MongoDB, conducting tests in Postman or Insomnia (in this case postman) to verify the proper functioning of the API, and upload it to the GitHub repository.

## Archives to install

NODLE.Js
EXPRES.Js
POSTMAN

## NEW STRUCTURE

```
src/
  app.js
  server.js
  seed.js
  config/
    db.js
  controllers/
    restaurants.controller.js
  models/
    Restaurant.js
  routes/
    restaurants.routes.js
restaurants.json   ## BACKUP
.env  
```

## HOW USE

Open MonogDB compass and connect the api server.

Open inteligi whit the progrm.

Open gitbash and run the server whit:

````
npm run dev
````
Open Postman and use the next for the edits and searchs
````
for get    http://localhost:3000/api/restaurants
for post   http://localhost:3000/api/restaurants
for PUT and DELETE   http://localhost:3000/api/restaurants/ID FORM THE ARCHIVE YOU WANT
````
See the results and modification in the mondoDB compass

