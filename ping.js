var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
  console.log('response', stdout);
  console.log('error', error);
}
exec("ping -c 3 192.168.7.149", puts);