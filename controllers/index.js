const router = require('express').Router();

const htmlRoutes = require('./html-routes.js');
const apiRoutes = require('./api-routes.js');
const chatroomRoutes = require('./api/chatroom-routes.js');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/api/chatroom', chatroomRoutes);

module.exports = router;