const getTypeId = async (ctx, next) => {
	ctx.state.type_id = ctx.request.body.type_id;
	await next();
};

module.exports = {
	getTypeId,
};
