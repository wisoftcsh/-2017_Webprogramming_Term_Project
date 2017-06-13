/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');
//DB 연동
const MySQL = require('mysql');
const MySQLConfig = require('../../config/mysql');
const connection = MySQL.createConnection(MySQLConfig);

const board = (req, res) => {
  connection.query("select * from board where subject like '%" + req.query.name + "%';" , (err, result) => {
    if (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    result = JSON.parse(JSON.stringify(result));
    console.log(result);
    res.render('board', {
      data: result
    });
  });
};

module.exports = {board};