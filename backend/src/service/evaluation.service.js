const connection = require('../app/database');

class EvaluationService {
	async createEvaluation() {
		const statement = `INSERT INTO evaluation (pos_num, neg_num) VALUES (DEFAULT, DEFAULT);`;
		const result = await connection.execute(statement);
		return result[0]['insertId'];
	}
}

module.exports = new EvaluationService();
