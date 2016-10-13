// "And the ghosts, they own everything."
var Client      = require('node-rest-client').Client;
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
    getNoun,
    getVerb,
    getPresentTense,
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

getNoun = function(cb){
  var botData = {
    noun: [],
    verb: [],
    present: [],
    finalTweet: ""
  };
  var client = new Client();
  var wordnikRandomURL = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false' +
      '&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun' +
      '&minCorpusCount=1000&maxCorpusCount=-1' +
      '&minDictionaryCount=1&maxDictionaryCount=-1&' +
      'minLength=5&maxLength=-1&limit=10&api_key=';
  var args = {headers: {'Accept':'application/json'}};
  var wordnikURL = wordnikRandomURL + wordnikKey;

  console.log("getNoun URL: ", wordnikURL);

  client.get(wordnikURL, args, function (data, response) {
    if (response.statusCode === 200) {
      for(var i = 0; i < 1; i++){
        var temp = data[i];
        botData.noun.push(temp.word);
      }
      if (botData.noun.length) {
        cb(null, botData);
      } else {
        cb(null, null);
      }
    } else {
      cb(null, null);
    }
  });
};

getVerb = function(botData, cb){
  var client = new Client();
  var wordnikRandomURL = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=verb' +
      '&minCorpusCount=0&maxCorpusCount=-1' +
      '&minDictionaryCount=1&maxDictionaryCount=-1&' +
      'minLength=5&maxLength=-1&limit=10&api_key=';
  var args = {headers: {'Accept':'application/json'}};  var args = {headers: {'Accept':'application/json'}};
  var wordnikURL = wordnikRandomURL + wordnikKey;

  client.get(wordnikURL, args, function (data, response) {
    if (response.statusCode === 200) {
      for(var i = 0; i < 1; i++){
        var temp = data[i];
        botData.verb.push(temp.word);
      }
      if (botData.verb.length) {
        cb(null, botData);
      } else {
        cb(null, null);
      }
    } else {
      cb(null, null);
    }
  });
};

getPresentTense = function(botData, cb){
  var client = new Client();
  var wordnikPresentURL = 'http://api.wordnik.com:80/v4/word.json/' 
  var wordnikPresentURLPart2 = '/relatedWords?useCanonical=false&relationshipTypes=verb-stem&limitPerRelationshipType=10&api_key=';
  var args = {headers: {'Accept':'application/json'}};
  var wordnikURL = wordnikPresentURL + botData.verb + wordnikPresentURLPart2 + wordnikKey;

  console.log("wordnikurl: ", wordnikURL);

  client.get(wordnikURL, args, function (data, response) {
    if (response.statusCode === 200) {
      if(!data.length){
        botData.present.push(botData.verb);
      } else {
        for(var i = 0; i < 1; i++){
          var temp = data[i];
          botData.present.push(temp.words);
        }
      }
      if (botData.present.length) {
        cb(null, botData);
      } else {
        cb(null, null);
      }
    } else {
      cb(null, null);
    }
  });
};

formatTweet = function(botData, cb){
  var conjunctions = ["For", "And", "But", "Or", "Yet", "So", "For", "And", "But", "Or", "Yet", "So", "Though", "Once", "While", "Since"];
  var finals = ["something", "anything", "nothing", "everything"];

  var conjunction = conjunctions[Math.floor(Math.random()*conjunctions.length)];
  var final = finals[Math.floor(Math.random()*finals.length)];

  botData.finalTweet = conjunction + " the " + botData.noun + " they " + botData.present + " " + final;

  cb(null, botData);
}

postTweet = function(botData, cb) {
  t.post('statuses/update', {status: botData.finalTweet}, function(err, data, response) {
    cb(err, botData);
  });
}

run();
run();
run();

