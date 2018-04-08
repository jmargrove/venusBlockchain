const Router = require("koa-router");
const router = new Router();
const controller = require("./controller.js");

router.get("/getwallet", controller.createWallet);
router.post("/transaction", controller.transaction);
router.post("/getUserBallence", controller.getUserBallence);
router.post("/mineBlock", controller.mineBlock);

module.exports = router;
