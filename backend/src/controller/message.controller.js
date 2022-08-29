const MessageService = require('../service/message.service');

class MessageController {
	async uploadMessage(ctx, next) {
		const state = ctx.request.body;
		state['eval_id'] = ctx.state['eval_id'];
		state['loc_id'] = ctx.state['loc_id'];
		await MessageService.createMessage(state);
		ctx.body = 'success upload message';
	}
}

module.exports = new MessageController();
