const connection = require('../app/database');

class LocationService {
	// 判断某点是否存在
	async locationExist(x, y) {
		const statement = `SELECT * FROM location WHERE x = ? AND y = ?;`;
		const result = await connection.execute(statement, [x, y]);
		if (result[0].length == 0) {
			return false;
		} else {
			return result[0][0]['id'];
		}
	}

	async createLocation(x, y) {
		const statement = `INSERT INTO location (x, y) VALUES (?, ?);`;
		const result = await connection.execute(statement, [x, y]);
		return result[0]['insertId'];
	}
}

module.exports = new LocationService();
