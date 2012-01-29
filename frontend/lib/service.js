var config = require('./config'),
    sendRequest = require('xhr').sendRequest;

var REQUEST_MAX_RETRY = 20;

var serverTime = undefined;

function getServerTime(){
  return serverTime;
}
 
//function query(method,path,params,callback,errorCounter,startTime){
function query(options,callback,errorCounter){
  !errorCounter && ( errorCounter = 0 );
  !params && ( params = {} );

  var retry = errorCounter<REQUEST_MAX_RETRY-1
              && query.bind(undefined, options, callback, errorCounter+1),

      method = options.method || 'GET',
      path = options.path,
      params = options.params,

      startTime = +(new Date);

  var req = sendRequest(method,config.SERVICE_URL+'/'+path,params,function(error,resp){
    if(error && retry){
      setTimeout(retry,500);
      return;
    }
    var response = resp && JSON.parse(resp) || null;
    !error && response.error && ( error = new Error(response.error) ); 
    !error && ( serverTime = response.serverTime );
    callback(error, response);
  });

  options.timeout && setTimeout(function(){
    if(+(new Date)-startTime>=options.timeout){
      req.abort();
      if(retry){
        retry();
      } else {
        callback(new Error('Connection attempt to "'+path+'" was not successful.'));
      }
    } else if(req.readyState!=4) {
      setTimeout(arguments.callee, 1000);
    }
  }, 1000);

  return req;
}

module.exports = {
  'getServerTime':getServerTime,
  'query':query
};
