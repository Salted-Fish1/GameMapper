const mysql = require('mysql2');
const config = require('./config');

const connections = mysql.createPool({
	host: config.MYSQL_HOST,
	port: config.MYSQL_PORT,
	database: config.MYSQL_DATABASE,
	user: config.MYSQL_USER,
	password: config.MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
	conn.connect((err) => {
		if (err) {
			console.log('connect fail', err);
		} else {
			console.log('connect OK', err);
		}
	});
});

module.exports = connections.promise();
