var gameplay = require('./setup').gameplay,
    navigator = require('./navigator');

function sendEmail(url){
  return function(){
    var subject = 'Join my chess game at MultiplayerChess.com',
        body    = [
          'Hi,',
          '',
          'I\'ve created a new chess game at MultiplayerChess.com. Please click the following link to play against me; ',
          '    ' + url,
          '',
          'Cheers',
          gameplay.white().name
        ].join('\n');

    var dialogURL = document.location.href;
    document.location.href = encodeURI('mailto: your@friend.com?subject='+subject+'&body='+body);
    document.location.href = dialogURL;
  };
}

function toFacebook(url){
  url = 'https://www.facebook.com/sharer.php?u='+encodeURIComponent(url)+'&t='+encodeURIComponent('Join my chess game at MultiplayerChess.com');
  return function(){
        window.open(url,'Share to Facebook','width=670,height=300');
  };
}

function toTwitter(url){
  url = 'https://twitter.com/intent/tweet?url='+encodeURIComponent(url);
  return function(){
        window.open(url,'Share to Twitter','width=670,height=300');
  };
}

module.exports = {
  'toFacebook': toFacebook,
  'toTwitter': toTwitter,
  'sendEmail': sendEmail
};
