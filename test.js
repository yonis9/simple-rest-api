var rp = require('request-promise');

var options = { 
    method: 'POST',
  uri: 'http://jr-devs.datree.io/board/messages',
  body: { author: 'yoni', message: 'message' },
  json: true 
};


rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
        console.log(parsedBody)
    })
    .catch(function (err) {
        // POST failed...
        console.log(err)
    });