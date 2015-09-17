var express = require('express'),
    exphbs  = require('express-handlebars'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),
    server = http.Server(app),
    config = require('./config.js');

var loggingEnabled = false;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
    res.render('home', {
      community: config.community
    });
});

app.post('/invite', function(req, res) {
  if (req.body.email) {
    request.post({
        url: 'https://'+ config.slackUrl + '/api/users.admin.invite',
        form: {
          email: req.body.email,
          token: config.slacktoken,
          set_active: true
        }
      }, function(err, httpResponse, body) {
        if (err) { return res.send('Error:' + err); }
        body = JSON.parse(body);
        if (body.ok) {
          res.render('done', {
            header: 'Success!',
            message: 'Check <em>'+ req.body.email +'</em> for an invite from Slack! If you have any question, feel free to reach out to <a href="mailto:stefan@fourtonfish.com">stefan@fourtonfish.com</a> (or <a href="https://twitter.com/fourtonfish">@fourtonfish</a> on Twitter).</p><p class="shifted">Looking forward to seeing you in our community :-)'
          });
        } else {
          var error_message = body.error;

          switch(error_message){
            case 'already_invited':
              error_message = 'Looks like you were already invited. Please check your inbox again or <a href="https://botmakers.slack.com/">click here</a> to sign in. If you\'re still having a problem, please contact <a href="mailto:stefan@fourtonfish.com">stefan@fourtonfish.com</a>.'
            break;
          }

          res.render('done', {
            header: 'Oops.',
            message: error_message
          });
        }
      });
  } else {
    res.status(400).send('Don\'t forget your email!');
  }
});


app.use(express.static(__dirname + '/public'));

server.listen(3011, function(){
  console.log('Express server listening on port 3011');
});
