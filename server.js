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
            case 'sent_recently':
              error_message = 'Looks like you were already invited. Please check your inbox again. If you didn\'t get your invitation, please contact <a href="mailto:stefan@fourtonfish.com">stefan@fourtonfish.com</a> or <a href="https://twitter.com/fourtonfish">@fourtonfish</a> on Twitter.<br/>Thanks!';
            break;
            case 'already_in_team':
              error_message = 'Good news, you are already a member! <a href="https://botmakers.slack.com/">Click here</a> to sign in. If you\'re having a problem, please contact <a href="mailto:stefan@fourtonfish.com">stefan@fourtonfish.com</a> or <a href="https://twitter.com/fourtonfish">@fourtonfish</a> on Twitter.<br/>Thanks!';
            break;
            case 'invalid_email':
              error_message = 'That email doesn\'t look quite right. Mind going back and trying again?';
            break;            
            default:
              error_message = 'Looks like an unhandled error. Can you contact <a href="mailto:stefan@fourtonfish.com">stefan@fourtonfish.com</a> or <a href="https://twitter.com/fourtonfish">@fourtonfish</a> on Twitter and say you got this error message? Thanks!<br/><tt>' + error_message + '</tt>';
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

/*
  Note: This allows the app to be deployed to openshift.com or heroku.com. See https://github.com/botwiki/botmakers.org/issues/5#issuecomment-168426855 for a bit more detail.

  Also, instead of 3011, you could use 8080, or any other port you want. 
*/
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3011);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

server.listen(app.get('port') ,app.get('ip'), function(){
  console.log('Express server listening on port' + app.get('port'));
});
