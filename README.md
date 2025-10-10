<Objetives>

<Sprint1>
    
<> 
<Sprint1>

## Technoready-2025-CH4
    
Proyect about Non-Relational Databases for Storing JSON Data from digital now

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

