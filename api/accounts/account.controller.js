/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');
//DB 연동
const MySQL = require('mysql');
const MySQLConfig = require('../../config/mysql');
const connection = MySQL.createConnection(MySQLConfig);

const register = (req, res) => {
  if (!req.body.id) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  const id = parseInt(req.body.id);
  connection.query('insert into user(u_id, password) values (?, ?)', [id, req.body.password], (err, result) => {
    if (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }

    const resultRows = result.affectedRows; //영향을 받은 Row 들의 수
    if (resultRows === 0) { // row가 영향이 없으면
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    res.redirect("/");
  });
};

const findOne = (req, res) => {
  const id = parseInt(req.query.id); // id는 string 형태로 들어오기때문에 Int로 전환
  connection.query('select * from user where u_id = ? and password = ?', [id, req.query.password], (err, result) => {
    if (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    if(result.length != 0){
      return res.status(HttpStatus.OK).json(result);
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
  });
};

module.exports = {findOne, register};