# Botmakers

[![Join Botmakers!](https://botmakers.org/images/site-thumbnail-4.png)](http://botmakers.org)

[Botmakers](http://botmakers.org) is the official [Botwiki.org](https://botwiki.org/) community, maintained by the [Botwiki.org team](https://github.com/botwiki). Image courtesy of [oldbookillustrations.com](http://www.oldbookillustrations.com/). Any questions? Need help? Reach out to [@stefanbohacek](https://twitter.com/stefanbohacek) or [stefan@stefanbohacek.com](mailto:stefan@stefanbohacek.com).

***Note: All members must read and follow our [Code of Conduct](https://github.com/botwiki/botmakers.org/blob/master/Code%20of%20Conduct.md).***

Also, here's a [list of bots](https://github.com/botwiki/botmakers.org/blob/master/BOTS.md) we're playing with right now.

# Auto-invite page for your Slack community

This repo also serves as a template for a neat-looking auto-invite page for your Slack community. It is loosely based on [outsideris/slack-invite-automation](https://github.com/outsideris/slack-invite-automation), but kept simpler and easier to customize. You can easily host it on [OpenShift](https://www.openshift.com/) or [Heroku](https://www.heroku.com/).

If you prefer a simpler setup, check out the [Glitch version](https://glitch.com/edit/#!/slack-invite) (see `README.md` in the sidebar for instructions).

Running this thing is pretty simple:

0. Clone or download this repo.
1. Make a copy of `config-example.js` and call it `config.js`.
2. Edit 'config.js':
 1. `community`: name of your community
 2. `slack_url`: URL of your community
 3. `slack_token`: get yours [here](https://api.slack.com/custom-integrations/legacy-tokens)
3. Make a copy of `visitor_stats-example.handlebars` (it's inside the `views/partials` folder) and call it `visitor_stats.handlebars`. Here you can paste your Google Analytics or StatCounter (or similar) code.
4. Install dependencies with `npm install` (or `sudo npm install`, if necessary).
5. I recommend using [pm2](https://github.com/Unitech/pm2) to run the app on your server.

Enjoy!

A few more notes:

About the **step 3** above: If you don't need to include this code, you can simply leave the file empty, but note that this file is by deafult not going to be committed, so you will have to either update `.gitignore` to remove the file from the list, or, if you want to keep your site's code open, upload this file separately.

You can also edit the file `main/handlebars` inside the `views/layouts` folder and remove the line that says `{{> visitor_stats }}` and get rid of the file completely.

As for hosting your signup page on Heroku, note that Heroku's free plan [forces your app to sleep for a few hours every day](https://www.heroku.com/pricing), so I don't recommend using Heroku if you expect a lot of traffic spread roughly evenly throughout the day, as you might lose signups.

If you want to develop this app, you can run `gulp.js`. The app will run at `http://localhost:3011/`, and there is a proxy at `http://localhost:4000/` that has code hot swapping (changes to the styles or script files are immediately visible without reloading the page).

Note that you might need to reload the page if it gets stuck loading after you run `gulp` the first time. `/shrug`
