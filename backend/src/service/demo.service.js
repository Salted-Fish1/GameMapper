const connection = require('../app/database');

class DemoService {
	async upload(x, y) {
		const statement = `INSERT INTO dot ( x, y) VALUES (?, ?);`;
		const result = await connection.execute(statement, [x, y]);
		console.log(result);
		return result;
	}
}

module.exports = new DemoService();
