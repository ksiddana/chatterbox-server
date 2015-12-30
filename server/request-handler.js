var fs = require('fs');
var path = require('path');    

var dataObj = {
    results: [],
  };
 
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = function(request, response) {
  var content = '';
  var fileName = path.basename(request.url);
  var parentFolder = process.cwd()
  var localFolder = parentFolder + '/client';
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";
    console.log(request.url)
  
/*  if(request.url !== "/classes/room1" && request.url !== "/classes/messages" && request.url !== "/classes/room") {
    console.log(request.url)
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  } else */

  if ( request.method === 'GET' ) {

    console.log("Serving request type " + request.method + " for url " + request.url);
    
    content = localFolder + '/index.html'
    
    response.writeHead(statusCode, headers);
    
    // fs.readFile(content, function(err, contents){
    //   if(!err){
    //   console.log("this is the localFolder name******* ", contents);
    //     response.end(contents)
    //   } else {
    //     console.dir(err);
    //   } 
      response.end(JSON.stringify(dataObj));
 
  } else if ( request.method === 'POST' ) {
    console.log("Serving request type " + request.method + " for url " + request.url);
    statusCode = 201;
    
    request.on('data', function(chunk){
      console.log("Received body data:");
      // console.log(chunk.toString())
      dataObj.results.push(JSON.parse(chunk))
      console.log(dataObj.results)

    });

    request.on('end', function (){
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(dataObj));
    })
  } else if ( request.method === 'OPTIONS') {
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(dataObj)); 
  }

};




