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

	async getMessage(type) {
		const statement1 =
			'SELECT `id`, 	`name`, `desc`, `type_id` , ( SELECT `x` FROM location AS loc WHERE msg.loc_id = loc.id ) AS x, ( SELECT `y` FROM location AS loc WHERE msg.loc_id = loc.id ) AS y, ( SELECT `pos_num` FROM evaluation AS eval WHERE msg.eval_id = eval.id ) AS pos_num, ( SELECT `neg_num` FROM evaluation AS eval WHERE msg.eval_id = eval.id ) AS neg_num  FROM message AS msg WHERE msg.type_id = ?';

		const statement2 =
			'SELECT `id`, 	`name`, `desc`, `type_id` , ( SELECT `x` FROM location AS loc WHERE msg.loc_id = loc.id ) AS x, ( SELECT `y` FROM location AS loc WHERE msg.loc_id = loc.id ) AS y, ( SELECT `pos_num` FROM evaluation AS eval WHERE msg.eval_id = eval.id ) AS pos_num, ( SELECT `neg_num` FROM evaluation AS eval WHERE msg.eval_id = eval.id ) AS neg_num  FROM message AS msg';
		let result = null;
		if (type == undefined) {
			result = await connection.execute(statement2);
		} else {
			result = await connection.execute(statement1, [type]);
		}
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
