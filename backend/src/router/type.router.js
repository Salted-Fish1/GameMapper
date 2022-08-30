const Router = require('koa-router');

const typeRouter = new Router();
const typeCntlr = require('../controller/type.controller');

typeRouter.get('/api/type', typeCntlr.getTypeList);

module.exports = typeRouter;
