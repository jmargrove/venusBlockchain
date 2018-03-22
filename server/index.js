const Koa = require("koa");
const app = new Koa();
const bodyparser = require("koa-bodyparser");
const router = require("./router.js");
const cors = require("koa2-cors");

app.use(cors());
app.use(bodyparser());
app.use(router.routes());
app.listen(3000);
