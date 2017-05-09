const mongoose = require('mongoose');
const tcpAddress = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
const dbName = process.env.MONGODB_DATABASE_NAME || 'tageler_db';
const dbAddress = 'mongodb://' + tcpAddress + ':27017/' + dbName;

module.exports = {
    MONGODB_VERSION: ''
}

module.exports = {
    database: dbAddress
};

module.exports.connectMongoose = () => {
    /** CONNECT TO MONGOOSE **/
    // Mongoose default promise library is deprecated
    if (mongoose.connection.readyState === 0) {
        mongoose.Promise = global.Promise;
        // Connect To Database
        mongoose.connect(dbAddress);
        // On Connection
        mongoose.connection.on('connected', () => {
            exportMongoVersion((err, version) => {
                if (err) version = 'xxx';
                console.log('Connected to database ' + dbAddress + "mongdb-version: " + version);
            })
        });
        // On Error
        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to Database: ' + err);
        });
    }
}

function dropCollection(collectionName, callback) {
    if (Object.keys(mongoose.connection.collections).indexOf(collectionName) > -1) {
        mongoose.connection.collections[collectionName].drop(err => {
            callback();
        });
    } else {
        callback();
    }
}

function exportMongoVersion(callback) {
    if (module.exports.MONGODB_VERSION && module.exports.MONGODB_VERSION.length > 0) {
        callback(null, module.exports.MONGODB_VERSION);
    } else {
        var admin = mongoose.connection.db.admin();
        admin.serverStatus(function (err, info) {
            if (err) return callback(err, null);
            // mongoVersion = info.version;//.split('.').map(function (n) { return parseInt(n, 10); });
            module.exports.MONGODB_VERSION = info.version;
            callback(null, module.exports.MONGODB_VERSION);
        });
    }
}

module.exports.openConnectionAndDropCollection = (collectionName, callback) => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connection.on('open', () => {
            exportMongoVersion((err, version) => {
                dropCollection(collectionName, callback);
            })
        });
        mongoose.connect(dbAddress);
    } else {
        dropCollection(collectionName, callback);
    }
};