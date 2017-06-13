/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');
//DB 연동
const MySQL = require('mysql');
const MySQLConfig = require('../../config/mysql');
const connection = MySQL.createConnection(MySQLConfig);

const selectMenu = (req, res) => {
  connection.query("select restaurant.r_name, menu.m_name, menu.price from menu join restaurant on menu.r_no=restaurant.r_no where restaurant.r_name='"+ req.query.name +"';" , (err, result) => {
    if (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    result = JSON.parse(JSON.stringify(result));
    console.log(result);
    console.log(result[0].r_name);
    res.render('menu', {
      data: result,
      name: result[0].r_name
    });
  });
};

module.exports = {selectMenu};