/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');
//DB 연동
const MySQL = require('mysql');
const MySQLConfig = require('../../config/mysql');
const connection = MySQL.createConnection(MySQLConfig);

const register = (req, res) => {
  if (!req.body.name) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  connection.query('insert into account(name) values (?)', req.body.name, (err, result) => {
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }

    const resultRows = result.affectedRows; //영향을 받은 Row 들의 수
    if (resultRows === 0) { // row가 영향이 없으면
      connection.end();
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }

    connection.end();
    res.status(HttpStatus.CREATED).json(result);
  });
};

const findAll = (req, res) => {
  connection.query('select * from account', (err, result) => {
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    connection.end();
    res.status(HttpStatus.OK).json(result);
  });
}

const findOne = (req, res) => {
  const id = parseInt(req.params.id); // id는 string 형태로 들어오기때문에 Int로 전환
  connection.query('select * from account where id = ?', id, (err, result) => { // 번수가 문자열일 경우 보안에 위험 preparence??? 찾아보자
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    connection.end();
    res.status(HttpStatus.OK).json(result);
  });
};

const update = (req, res) => {
  if (!req.body.name) {
    connection.end();
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  const id = parseInt(req.params.id);
  connection.query('update account set name = ? where id = ?', [req.body.name, id], (err, result) => { // id 값은 req.body.name을 받아와서 설정해야 해킹의 위험이 없다
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    const resultRows = result.affectedRows; //영향을 받은 Row 들
    if (resultRows === 0) { // row가 영향이 없으면
      connection.end();
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    connection.end();
    res.status(HttpStatus.OK).json(result);
  });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('delete from account where id = ?', id, (err, result) => { // id 값은 req.body.name을 받아와서 설정해야 해킹의 위험이 없다
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    const resultRows = result.affectedRows; //영향을 받은 Row 들
    if (resultRows === 0) { // row가 영향이 없으면
      connection.end();
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    connection.end();
    res.status(HttpStatus.NO_CONTENT).json(result);
  });
};

module.exports = {findAll, findOne, update, remove, register};