const mongoose = require('mongoose');
const tcpAddress = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
const dbName = process.env.MONGODB_DATABASE_NAME || 'tageler_db';
const dbAdress = 'mongodb://' + tcpAddress + ':27017/' + dbName;

module.exports = {
    database: dbAdress
};

function dropCollection(collectionName, callback) {
    if (Object.keys(mongoose.connection.collections).indexOf(collectionName) > -1) {
        mongoose.connection.collections[collectionName].drop(function (err) {
            callback();
        });
    } else {
        callback();
    }
}

module.exports.openConnectionAndDropCollection = (collectionName, callback) => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connection.on('open', () => {
            dropCollection(collectionName, callback);
        })
        mongoose.connect(dbAdress);
    } else {
        dropCollection(collectionName, callback);
    }
};