var path = require('path');
var express  = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  spawn = require('child_process').spawn;
var pdfGenerator = require('html-pdf');
var exec = require('child_process').exec;
var sumatraPath = path.resolve(__dirname, 'sumatra/SumatraPDF.exe');
var pdfOptions = {
  filename: path.resolve(__dirname, 'sumatra/file.pdf'),
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

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: '#HotTab printing server started...' });
});

var printingJob = function (data, callback) {
  //var htmlString = data.html;
  console.log('pdfOptions', pdfOptions)
  var htmlString = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Document</title>style</head><body><h1>hello</h1></body></html>'
  data.copies = data.copies || 1;
  data.printers = data.printers || [];
  data.timestamp = data.timestamp || 1;
  //pdfOptions.filename = path.resolve(__dirname, 'sumatra/file' + data.timestamp + '.pdf');
  pdfGenerator
    .create(htmlString, pdfOptions)
    .toFile(function(err, res) {
      console.log(res);

      if (err) console.log('PDF generator error:', err);

      if (res.filename) {
        callback.json({ error: false, message: 'Print Done' });
        for (var i = 0; i < data.printers.length; i++) {
          if (data.printers[i].name) {
            spawn(sumatraPath, [
              '-print-to', data.printers[i].name,
              '-silent', res.filename,
              '-print-settings', 'noscale'
            ]);
          }
        }
      }
    });

  /*exec("ping -c 3 192.168.7.141", function (error, stdout, stderr) {
    if (error) callback.json({ error: false, message: 'Please check printer or network printer' });
    if (stdout) {

    }
  });*/

};


router.route('/prints')

  .get(function(req, res) {
    var wmic = exec(
      'wmic Path Win32_Printer Get DeviceId',
      function(error, stdout, stderr) {
        var listPrinters = [];
        stdout.split('\n').splice(1).forEach(function(printerName) {
          printerName = printerName.trim();

          if (printerName) {
            listPrinters.push({name: printerName});
          }
        });
        res.json(listPrinters);
      }
    );
  })

  .post(function(req, res) {
    printingJob(req.body, res);
  });

app.use('/api', router);
app.listen(port);
console.log('#HotTab printing server running with port ' + port);
