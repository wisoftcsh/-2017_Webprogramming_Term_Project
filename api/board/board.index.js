const router = require('express').Router();
const controller = require('./board.js');

router.get('/boardAll', controller.board);
router.post('/boardAll/add', controller.addBoard);
router.get('/board', controller.boardOne);
router.post('/board/add', controller.addOneBoard);
module.exports = router;