var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

let Count = 0;
let answer = Math.floor(Math.random() * 21); 
let Ans = parseInt(answer); 
ID = RegExp('61355120[0-9]{2}','g')
let flag = 0;

net.createServer(function(sock) { 
   console.log('answer:' + Ans);
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
   sock.on('data', function(data) { 
       console.log('Clientsend: ' + sock.remoteAddress + ': ' + data);
       //sock.write('You said "' + data + '"'); 

      
       if(ID.test(data))
       {
           Count = 0;
           flag = 1;
           console.log('clientsend:' + data);
           sock.write('OK');  
       }

       else if(parseInt(data) >= 0 && parseInt(data) <=21)
       {
           if(flag == 1)
           {
                let Temp = parseInt(data);
                console.log(Count);
                Count++;
                if(Count <= 4)
                {
                    if(Temp == Ans)
                    {
                        answer = Math.floor(Math.random() * 21); 
                        Ans = parseInt(answer); 
                        console.log('clientsend:' + data);
                        sock.write('BINGO');
                        sock.end();
                    }
                    else if(Temp != Ans)
                    {    
                            console.log('clientsend:' + data);
                            sock.write('WRONG');
                    }
                }
                else
                {
                    if(Temp == Ans)
                    {
                        flag = 0;
                        answer = Math.floor(Math.random() * 21); 
                        Ans = parseInt(answer); 
                        console.log('clientsend:' + data);
                        sock.write('BINGO');
                        sock.end();
                    }
                    else if(Temp != Ans)
                    {    
                        flag = 0;
                        console.log('clientsend:' + data);
                        sock.write('END');
                        sock.end();
                    }
                }
           } 
           else
           {
                console.log('clientsend:' + data);
                sock.write('Wrong username');
                sock.end();
           }   
       }
       else
       {
            console.log('clientsend:' + data);
            sock.write('Wrong username');
            sock.end();
       }
   });
 
}).listen(PORT, HOST); //สั่งให้เปิด server

console.log('Server listening on ' + HOST +':'+ PORT);