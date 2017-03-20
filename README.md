Tageler API
===========
Preconditions
---
- Install NodeJS
- Install and run MongoDB

Quickstart
----------
```bash
cd tageler-api
npm install
npm start (or with nodemon: npm install -g nodemon)
```
Configuration
-------------

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_PORT_27017_TCP_ADDR | MongoDB hostname, the ip/host this points to needs to run MongoDB on port 27017 | `localhost` |
| MONGODB_DATABASE_NAME | Name of MongoDB database to use for tageler | `tageler_db` |
