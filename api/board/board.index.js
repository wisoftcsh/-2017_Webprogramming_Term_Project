const router = require('express').Router();
const controller = require('./board.js');

router.get('/board', controller.board);
module.exports = router;