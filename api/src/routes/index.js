const { Router } = require('express');
// import all routers;
const userRoute = require('./user.js');
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', userRoute);

module.exports = router;
