const Router = require('koa-router');

const msgRouter = new Router();

const msgCntlr = require('../controller/message.controller');
const locMw = require('../middleware/location.middleware');
const evalMw = require('../middleware/evaluation.middleware');
const typeMw = require('../middleware/type.middleware');

msgRouter.post(
	'/api/uploadMessage',
	// ctx.state.loc_id
	locMw.getLocation,
	// ctx.state.eval_id
	evalMw.getEvaluationID,
	// ctx.state.type_id
	typeMw.getTypeId,
	msgCntlr.uploadMessage
);

module.exports = msgRouter;
