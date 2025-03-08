const mysql = require('mysql');

const connMySQl = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'agrogestor'
    });
}

module.exports = () => {
    return connMySQl;
}