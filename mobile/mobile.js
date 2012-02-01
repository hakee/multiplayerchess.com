var MPC_MOBILE = (function(undefined){

  const URL = 'http://multiplayerchess.com';

  var connected = false,
      connMessages = [
        'Connection seems slow...',
        'Still trying to connect...',
        'Please make sure you are online...'
      ];

  function init(){
    
    connected = true;

    intro().fadeIn('slow');

    try {
      mpc.require('./config').WORKING_DIR = URL;
      mpc.require('./config').SERVICE_URL = URL+'/api';
    } catch(err){
      message("Connection Error");
    }

    setTimeout(function(){

      var app = mpc.main();
      app.on('success', function(){
        setTimeout(function(){
          intro().fadeOut();        
          $("#intro-wrapper").fadeOut();
        },300);
      });

      mpc.main()();
    }, 500);
  }

  function checkConnection(i){
    if(connected){
      return;
    }

    message(connMessages[i % connMessages.length]);
    
    setTimeout(checkConnection, 5000, i+1);

  }
  
  function message(msg){
    $("#intro-message").html(msg);
    $("#intro-message-wrapper").addClass("error").fadeIn();
  }

  function intro(){
    return $("#intro");
  }

  setTimeout(checkConnection, 3000, 0);

  $(document).ready(init);

  return true;

})();
