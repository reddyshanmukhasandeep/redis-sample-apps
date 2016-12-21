var http = require("http");
var redis = require('redis');
var express = require('express');
var app = express();
var port = process.env.PORT||8080;
var constant = JSON.parse(process.env.VCAP_SERVICES);
console.log("constant...." + constant);
var dbport = constant["rediscloud"][0].credentials.port || 3000;
var host = constant["rediscloud"][0].credentials.hostname || 'localhost' ;
console.log("port.."+dbport);
console.log("host.."+host);

var client = redis.createClient(dbport, host,{no_ready_check: true});
var pass = constant["rediscloud"][0].credentials.password;
client.auth(pass, function (err) 
{ if (err) 
	throw err; 
   else
       console.log("Connected to Redis.....");
});

var str;
var queryobj=[];
var keys;
var i=0;
var strobj;
var values=[];

app.get('/input',function(req,res) {
 
 if(req.query.veg){
keys=i;
queryobj[i]=req.query.veg;
client.hmset('tableee',keys,queryobj[i]);
res.send(queryobj[i]);
console.log("queryobj..."+queryobj[i]);
i++;
}
client.hgetall('tableee',function(err,obj)
{
     if(err)
       console.log("data not inserted");
else{
     str=JSON.stringify(obj);
     strobj=obj;
     console.log(str+"..redis db data");
     console.log(strobj+"strobj...");
    }
for(var strkey in strobj) {
     console.log("values in json...."+strobj[strkey ]);
     values[strkey]=strobj[strkey];
     console.log("values after assignin"+values);
      }
});

});


 
app.get('/list', function (req, res) {

   res.send(values);
  
   });  





app.listen(port);


