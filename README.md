# Botmakers.org

[![Join Botmakers!](https://raw.githubusercontent.com/botwiki/botmakers.org/master/public/images/botmakers-preview.png)](https://botmakers.org)

Botmakers is the official [Botwiki.org](https://botwiki.org/) community, maintained by the [Botwiki.org team](https://github.com/botwiki). Image courtesy of [oldbookillustrations.com](http://www.oldbookillustrations.com/). Any questions? Need help? Reach out to [@fourtonfish](https://twitter.com/fourtonfish) or [stefan@fourtonfish.com](mailto:stefan@fourtonfish.com).

This repo also serves as a template for a neat-looking auto-invite page for your Slack community. It is loosely based on [outsideris/slack-invite-automation](https://github.com/outsideris/slack-invite-automation), but kept simpler and easier to customize.

(Note: the code could use a bit more cleanup, but I was in a rush to open the Botmakers community.)

Running this thing is pretty simple:

0. Clone this repo.
1. Make a copy of `config-example.js` and call it 'config.js'.
2. Edit 'config.js':
 1. `community`: name of your community
 2. `slackUrl`: URL of your community
 3. `slacktoken`: get yours [here](https://api.slack.com/web#auth)
3. Install dependencies with `npm install` (or `sudo npm install`, if necessary).
4. `gulp.js`

Enjoy!