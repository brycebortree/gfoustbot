// "And the ghosts, they own everything."
var Twit = require('twit');

var t = new Twit({
  consumer_key: env.CONSUMER_KEY,
  consumer_secret: env.CONSUMER_SECRET,
  access_token: env.ACESSS_TOKEN,
  access_token_secret: env.ACCESS_TOKEN_SECRET
})

var wordnikKey = env.WORDNIK_API_KEY

var finTweet = '';

var conjunctions = ["For", "And", "Nor", "But", "Or", "Yet", "So"];

var final = ["something", "anything", "nothing", "everything"];

