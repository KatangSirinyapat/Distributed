var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

let num = Math.floor(Math.random() * 21); 


var client = new net.Socket();
client.connect(PORT, HOST, function() {
   console.log('CONNECTED TO: ' + HOST + ':' + PORT);
   client.write('6135512025');
});

client.on('data', function(data) {
   console.log('DATA: ' + data);
   //client.destroy();
   if(data.toString() === 'OK')
   {
      console.log(data.toString());
      client.write(num.toString());
   }
   else if(data.toString() === 'WRONG')
   {
      num = Math.floor(Math.random() * 21); 
      console.log(data.toString());
      client.write(num.toString());
   }
   else
   {
      console.log('error');
   }
});