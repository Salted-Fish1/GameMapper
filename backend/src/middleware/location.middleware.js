const serivce = require('../service/location.service');

// 返回一个地址的 id
const getLocation = async (ctx, next) => {
	// console.log(ctx.request.body);
	const { x, y } = ctx.request.body;
	const result = await serivce.locationExist(x, y);
	let loc_id = -1;
	if (result === false) {
		loc_id = await serivce.createLocation(x, y);
	} else {
		loc_id = result;
	}
	ctx.state.loc_id = loc_id;
	await next();
};

module.exports = {
	getLocation,
};
