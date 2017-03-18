var express = require('express'),
    exphbs  = require('express-handlebars'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),
    server = http.Server(app),
    config = require('./config.js'),
    community_info = {
      community_name: config.community_name,
      community_description: config.community_description,
      slack_url: config.slack_url,
      contact: config.contact
    };


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
        url: config.slack_url + '/api/users.admin.invite',
        form: {
          email: req.body.email,
          token: config.slack_token,
          set_active: true
        }
      }, function(err, httpResponse, body) {
        if (err) { return res.send('Error:' + err); }
        body = JSON.parse(body);
        if (body.ok) {
          community_info.user_email = req.body.email;
          res.render('success', community_info);
        } else {
          var error_message = body.error;

          switch(error_message){
            case 'already_invited':
            case 'sent_recently':
              res.render('recently-invited', community_info);
              break;
            case 'already_in_team':
              res.render('already-member', community_info);
              break;
            case 'invalid_email':
              res.render('invalid-email', community_info);
            break;            
            default:
              community_info.error_message = error_message;
              res.render('invalid-email', community_info);
            break;
          }
        }
      });
  } else {
    res.status(400).send('Don\'t forget your email!');
  }
});


app.use(express.static(__dirname + '/public'));

/*
  Note: This allows the app to be deployed to openshift.com or heroku.com. See https://github.com/botwiki/botmakers.org/issues/5#issuecomment-168426855 for a bit more detail.

  Also, instead of 3011, you could use 8080, or any other port you want. 
*/
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3011);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

server.listen(app.get('port') ,app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
