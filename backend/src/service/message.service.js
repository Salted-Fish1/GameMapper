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

	async getMessage() {
		const statement =
			'SELECT `id`, 	`name`, `desc`, ( SELECT `x` FROM location AS loc WHERE msg.loc_id = loc.id ) AS x, ( SELECT `y` FROM location AS loc WHERE msg.loc_id = loc.id ) AS y, ( SELECT `pos_num` FROM evaluation AS eval WHERE msg.eval_id = eval.id ) AS pos_num, ( SELECT `neg_num` FROM evaluation AS eval WHERE msg.eval_id = eval.id ) AS neg_num  FROM message AS msg';
		const result = await connection.execute(statement);
		// console.log(result[0]);
		return result[0];
	}

	async delMessage(id) {
		const statement = 'DELETE FROM  message  WHERE `id` = ?;';

		// console.log(id);
		const result = await connection.execute(statement, [id]);
		// console.log(result);
	}
}

module.exports = new MessageService();
