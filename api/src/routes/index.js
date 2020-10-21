const { Router } = require("express");
const router = Router();

// import all routers;
/* const productRouter = require('./product.js'); */

const userRouter = require("./user");

// const feedbackRouter = require("./feedback");
// const checkpointRouter = require("./checkpoint");
const inviteRouter = require ("./invite")
const moduloRouter = require("./modulo");

const cohorteRouter = require("./cohorte");
const calendarRouter = require ("./calendar");
const studentRouter = require("./student");
const groupPpRouter = require ('./pP')
const adminRoute = require('./createAdmin')
// load each router on a route
// i.e: router.use('/auth', authRouter);
const msgRouter = require('./msg')


router.use("/user", userRouter);
router.use("/student", studentRouter);
router.use('/create-admin', adminRoute)
// router.use("/feedback", feedbackRouter);
// router.use("/checkpoint", checkpointRouter);
router.use("/modulo", moduloRouter);
router.use("/cohorte", cohorteRouter);
router.use("/groupPp", groupPpRouter);
router.use("/invite", inviteRouter);
router.use("/calendar", calendarRouter);
router.use('/msg',msgRouter);

module.exports = router;

