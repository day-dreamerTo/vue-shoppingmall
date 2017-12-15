/**
 * Created by admin on 17/12/11.
 */
let http = require('http');
let util = require('util');

http.get('http://www.imooc.com/u/card', res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data)
    // let result = JSON.parse(data);
    // console.log('result:' + result.msg);
  })
});
