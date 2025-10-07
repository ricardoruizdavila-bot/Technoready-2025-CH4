    # Technoready-2025-CH4
Proyect about Non-Relational Databases for Storing JSON Data from digital now

This sprint focuses on setting up the MongoDB database for the Tattler Restaurant Directory, designed to offer personalized and dynamic restaurant experiences.
The goal is to store restaurant data in a non-relational structure (JSON) and prepare it for later interaction through a RESTful API with Express.js.

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

