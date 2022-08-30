const typeService = require('../service/type.service');

class TypeController {
	async getTypeList(ctx, next) {
		const result = await typeService.getTypeList();
		ctx.body = result;
	}
}

module.exports = new TypeController();
