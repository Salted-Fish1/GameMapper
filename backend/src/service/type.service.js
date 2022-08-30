const connection = require('../app/database');

class TypeService {
	async getTypeList() {
		const statement = 'SELECT * FROM `type`';
		const result = await connection.execute(statement);
		// console.log(result[0]);
		return result[0];
	}
}

module.exports = new TypeService();
