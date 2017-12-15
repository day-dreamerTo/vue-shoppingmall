/**
 * Created by admin on 17/12/11.
 */
// let user = require('./user')
let http = require('http');
let url = require('url');
let util = require('util');
let server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain;charset="utf-8"');
  // util.inspect 用来把一个对象改为字符串 用来调试
  console.log(req.url);
  res.end(util.inspect(url.parse(req.url)));
});

server.listen(3000, '127.0.0.1', () => {
  console.log('running on 127.0.0.1:3000...');
});
