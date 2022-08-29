const serivce = require('../service/evaluation.service');

// 返回一个评价的 ID
const getEvaluationID = async (ctx, next) => {
	const result = await serivce.createEvaluation();
	ctx.state.eval_id = result;
	await next();
};

module.exports = {
	getEvaluationID,
};
