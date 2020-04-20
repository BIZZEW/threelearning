var express = require('express');

var app = express();

app.use(express.static('./'));

var server = app.listen(5000, function () {

  console.log('Example app listening on port 5000!');

}); //端口号可自定义