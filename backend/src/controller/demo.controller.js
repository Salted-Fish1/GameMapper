const DemoService = require('../service/demo.service');

class DemoController {
	async uploadDot(ctx, next) {
		console.log(ctx.request.body);
		const obj = ctx.request.body;
		const result = await DemoService.upload(obj.x, obj.y);
		ctx.body = { obj };
	}
}

module.exports = new DemoController();
