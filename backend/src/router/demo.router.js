const Router = require('koa-router');

const demoRouter = new Router();

const demoCntlr = require('../controller/demo.controller');

demoRouter.post('/api/demo', demoCntlr.uploadDot);
demoRouter.post('/api/demo/location', demoCntlr.getLocation);

module.exports = demoRouter;
