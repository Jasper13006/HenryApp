const { Router } = require("express");
const router = Router();

// import all routers;
/* const productRouter = require('./product.js'); */

const userRouter = require("./user");

// const feedbackRouter = require("./feedback");
// const checkpointRouter = require("./checkpoint");
// const moduloRouter = require("./modulo");
const cohorteRouter = require("./cohorte");
// const grouppmRouter = require ("./grouppm");

// load each router on a route
// i.e: router.use('/auth', authRouter);


router.use("/user", userRouter);

// router.use("/feedback", feedbackRouter);
// router.use("/checkpoint", checkpointRouter);
// router.use("/modulo", moduloRouter);
router.use("/cohorte", cohorteRouter);
// router.use("/grouppm", grouppmRouter);

module.exports = router;

