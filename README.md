Tageler API
===========
Preconditions
---
- Install NodeJS
- Install and run MongoDB

Quickstart
----------
```bash
git clone https://github.com/tageler/tageler-api.git
cd tageler-api
npm install 
gulp
```
Configuration
-------------

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_PORT_27017_TCP_ADDR | MongoDB hostname, the ip/host this points to needs to run MongoDB on port 27017 | `localhost` |
| MONGODB_DATABASE_NAME | Name of MongoDB database to use for tageler | 'tageler' |
