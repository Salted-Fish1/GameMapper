const Router = require('koa-router');

const demoRouter = new Router();

const demoCntlr = require('../controller/demo.controller');

demoRouter.post('/api/demo', demoCntlr.uploadDot);

module.exports = demoRouter;
