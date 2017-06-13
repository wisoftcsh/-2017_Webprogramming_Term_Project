/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');
//DB 연동
const MySQL = require('mysql');
const MySQLConfig = require('../../config/mysql');
const connection = MySQL.createConnection(MySQLConfig);

const board = (req, res) => {
  connection.query("select * from board", (err, result) => {
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

const boardOne = (req, res) => {
  connection.query("select * from board where subject like '%" + req.query.name + "%';", (err, result) => {
    if (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    result = JSON.parse(JSON.stringify(result));
    console.log(result);
    res.render('board_one', {
      data: result
    });
  });
};

const addBoard = (req, res) => {
  let subject = req.body.storeName + " : " + req.body.subject;
  connection.query('insert into board(star, subject, u_id) values (?, ?, ?)',
      [req.body.star, subject, req.body.uId], (err, result) => {
        if (err) {
          return res.send('등록 된 유져가 아닙니다. 아이디를 확인 하세요.');
        }

        const resultRows = result.affectedRows; //영향을 받은 Row 들의 수
        if (resultRows === 0) { // row가 영향이 없으면
          return res.send('등록 된 유져가 아닙니다. 아이디를 확인 하세요.');
        }
        res.redirect("/api/board/boardAll");
      });
};

const addOneBoard = (req, res) => {
  let subject = req.body.storeName + " : " + req.body.subject;
  connection.query('insert into board(star, subject, u_id) values (?, ?, ?)',
      [req.body.star, subject, req.body.uId], (err, result) => {
        if (err) {
          return res.send('등록 된 유져가 아닙니다. 아이디를 확인 하세요.');
        }

        const resultRows = result.affectedRows; //영향을 받은 Row 들의 수
        if (resultRows === 0) { // row가 영향이 없으면
          return res.send('등록 된 유져가 아닙니다. 아이디를 확인 하세요.');
        }
        res.redirect("/api/board/board?name="+req.body.storeName);
      });
};

module.exports = {board, boardOne, addBoard, addOneBoard};