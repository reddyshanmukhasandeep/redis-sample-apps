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

/* client.set('veg1','Onion');
client.get('veg1',function(error,value)
{
if(error)
{
throw error;
}

var vegvalue1= value;
console.log('The vegetable is = '+ value1.toString());

}); */

app.get('/vegetables',function(req,res) {
	var vegvalue2=req.param('veg2');
	var vegvalue3=req.param('veg3');
	
	console.log("vegvalue2"...+vegvalue2);
console.log("vegvalue3"...+vegvalue3);
	
});
client.hmset('vegetables','veg2','vegvalue2','veg3','vegvalue3');
client.hgetall('vegetables',function(err,obj){
	
	console.log(obj);
});
/* app.get('/items', function (req, res) {
  res.send(vegvalue1);
}); */
app.listen(port);
