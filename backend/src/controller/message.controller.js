const MessageService = require('../service/message.service');

class MessageController {
	async uploadMessage(ctx, next) {
		const state = ctx.request.body;
		state['eval_id'] = ctx.state['eval_id'];
		state['loc_id'] = ctx.state['loc_id'];
		await MessageService.createMessage(state);
		ctx.body = 'success upload message';
	}

	async getMessage(ctx, next) {
		ctx.body = await MessageService.getMessage();
	}

	async delMessage(ctx, next) {
		// console.log(ctx.params);
		ctx.body = await MessageService.delMessage(ctx.params.id);
	}
}

module.exports = new MessageController();
