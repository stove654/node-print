var path = require('path');
var express  = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  spawn = require('child_process').spawn;
var fs = require('fs');
var request = require('request');
var pdfGenerator = require('html-pdf');
var http = require('http');
var pdfPath = path.resolve(__dirname, 'sumatra/file.pdf');
var exec = require('child_process').exec;
var sumatraPath = path.resolve(__dirname, 'sumatra/SumatraPDF.exe');

var pdfOptions = {
  filename: pdfPath,
  width: '7.5cm',
  height: '255cm',
  border: {
    left: '0.25cm',
    right: '0.25cm',
    bottom: '0.25cm',
    top: '0.25cm'
  }
};

// EXPRESS stuffs ================================================
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true,
  limit: '50mb',
  parameterLimit: 100000000}));
app.use(bodyParser.json({limit: '50mb',
  parameterLimit: 100000000}));

app.use('/static', express.static('app/images'));

function handleError(res, err) {
  return res.status(422).json(err);
}

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: '#HotTab printing server started...' });
});

var printingJob = function (data, callback) {
  var htmlString = data.html
  pdfGenerator
    .create(htmlString, pdfOptions)
    .toFile(function(err, res) {
      console.log(res);

      if (err) console.log('PDF generator error:', err);

      if (res.filename) {
        callback.call(null);
        spawn(sumatraPath, [
          '-print-to', 'cashier',
          '-silent', res.filename,
          '-print-settings', 'noscale'
        ]);
      }
    });
};


router.route('/prints')
  .post(function(req, res) {
    printingJob(req.body, function() {
      res.json({ error: false, message: 'Printed successfully!' });
    });
  });

app.use('/api', router);
app.listen(port);
console.log('#HotTab printing server running with port ' + port);
