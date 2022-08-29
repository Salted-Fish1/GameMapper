const connection = require('../app/database');

class DemoService {
	async upload(x, y) {
		const statement = `INSERT INTO dot ( x, y) VALUES (?, ?);`;
		const result = await connection.execute(statement, [x, y]);
		console.log(result);
		return result;
	}

	async getLocation(x, y) {
		const statement = `SELECT * FROM location WHERE x = 10 AND y = 4; `;
		const result = await connection.execute(statement);
		return result[0];
	}
}

module.exports = new DemoService();
