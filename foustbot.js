// "And the ghosts, they own everything."
var Twit        = require('twit');
var async       = require('async');
var wordFilter  = require('wordfilter');
var env         = require('dotenv').config();

var t = new Twit({
  consumer_key: env.CONSUMER_KEY,
  consumer_secret: env.CONSUMER_SECRET,
  access_token: env.ACESSS_TOKEN,
  access_token_secret: env.ACCESS_TOKEN_SECRET
})

var wordnikKey = env.WORDNIK_API_KEY

run = function() {
  async.waterfall([
    formatTweet,
    postTweet
  ],
  function(err, botData) {
    if (err) {
      console.log('There was an error posting to Twitter: ', err);
    } else {
      console.log('Tweet successful!');
      console.log('Tweet: ', botData.finalTweet);
    }
  });
}


formatTweet = function(cb){
  var botData = {
    finalTweet: ""
  }

  var conjunctions = ["For", "And", "Nor", "But", "Or", "Yet", "So"];
  var finals = ["something", "anything", "nothing", "everything"];

  var conjunction = conjunctions[Math.floor(Math.random()*conjunctions.length)];
  var final = finals[Math.floor(Math.random()*finals.length)];

  botData.finalTweet = conjunction + " the ghosts, they own " + final + ".";
  console.log(botData);

  cb(null, botData);
}

postTweet = function(botData, cb) {
  t.post('statuses/update', {status: botData.finalTweet}, function(err, data, response) {
    cb(err, botData);
  });
}

run();



