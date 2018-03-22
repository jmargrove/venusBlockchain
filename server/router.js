const Router = require("koa-router");
const router = new Router();
const controller = require("./controller.js");

router.post("/", controller.postOne);

module.exports = router;
