const router = require('express').Router();

//connect all routes 
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes')

//use all the routes
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes);
router.use('/', homeRoutes);

//incase the user uses a wrong route
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;