const tcpAddress = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
const dbName = process.env.MONGODB_DATABASE_NAME || 'tageler_db';

module.exports = {
    database: 'mongodb://' + tcpAddress + ':27017/' + dbName
};