const router = require('express').Router();
const controller = require('./account.controller');

router.post('/', controller.register); //(주소, 함수포인터)
router.get('/', controller.findOne);

module.exports = router;