const router = require('express').Router();
const controller = require('./menu.js');

router.get('/menu', controller.selectMenu);
module.exports = router;