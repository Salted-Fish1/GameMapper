const connection = require('../app/database');

class MessageService {
	async createMessage(state) {
		const statement =
			'INSERT INTO message ( `name`, `desc`, `loc_id`, `type_id`, `eval_id` ) VALUES ( ?, ?, ?, ?, ? );';
		const result = await connection.execute(statement, [
			state.name,
			state.desc,
			state['loc_id'],
			state['type_id'],
			state['eval_id'],
		]);
	}
}

module.exports = new MessageService();
