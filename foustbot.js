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

// var wordnikKey = env.WORDNIK_API_KEY

run = function() {
  async.waterfall([
    // getNoun,
    // getVerb,
    // getPresentTense,
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

// getNoun = function(cb){
//   
//   var client = new Client();
//   var wordnikRandomURL = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false' +
//       '&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun' +
//       '&minCorpusCount=1000&maxCorpusCount=-1' +
//       '&minDictionaryCount=1&maxDictionaryCount=-1&' +
//       'minLength=5&maxLength=-1&limit=10&api_key=';
//   var args = {headers: {'Accept':'application/json'}};
//   var wordnikURL = wordnikRandomURL + wordnikKey;

//   console.log("getNoun URL: ", wordnikURL);

//   client.get(wordnikURL, args, function (data, response) {
//     if (response.statusCode === 200) {
//       for(var i = 0; i < 1; i++){
//         var temp = data[i];
//         botData.noun.push(temp.word);
//       }
//       if (botData.noun.length) {
//         cb(null, botData);
//       } else {
//         cb(null, null);
//       }
//     } else {
//       cb(null, null);
//     }
//   });
// };

// getVerb = function(botData, cb){
//   var client = new Client();
//   var wordnikRandomURL = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=verb' +
//       '&minCorpusCount=0&maxCorpusCount=-1' +
//       '&minDictionaryCount=1&maxDictionaryCount=-1&' +
//       'minLength=5&maxLength=-1&limit=10&api_key=';
//   var args = {headers: {'Accept':'application/json'}};  var args = {headers: {'Accept':'application/json'}};
//   var wordnikURL = wordnikRandomURL + wordnikKey;

//   client.get(wordnikURL, args, function (data, response) {
//     if (response.statusCode === 200) {
//       for(var i = 0; i < 1; i++){
//         var temp = data[i];
//         botData.verb.push(temp.word);
//       }
//       if (botData.verb.length) {
//         cb(null, botData);
//       } else {
//         cb(null, null);
//       }
//     } else {
//       cb(null, null);
//     }
//   });
// };

// getPresentTense = function(botData, cb){
//   var client = new Client();
//   var wordnikPresentURL = 'http://api.wordnik.com:80/v4/word.json/' 
//   var wordnikPresentURLPart2 = '/relatedWords?useCanonical=false&relationshipTypes=verb-stem&limitPerRelationshipType=10&api_key=';
//   var args = {headers: {'Accept':'application/json'}};
//   var wordnikURL = wordnikPresentURL + botData.verb + wordnikPresentURLPart2 + wordnikKey;

//   console.log("wordnikurl: ", wordnikURL);

//   client.get(wordnikURL, args, function (data, response) {
//     if (response.statusCode === 200) {
//       if(!data.length){
//         botData.present.push(botData.verb);
//       } else {
//         for(var i = 0; i < 1; i++){
//           var temp = data[i];
//           botData.present.push(temp.words);
//         }
//       }
//       if (botData.present.length) {
//         cb(null, botData);
//       } else {
//         cb(null, null);
//       }
//     } else {
//       cb(null, null);
//     }
//   });
// };

formatTweet = function(cb){
  var botData = {
    finalTweet: ""
  };
  var conjunctions = ["For", "And", "But", "Or", "Yet", "So", "For", "And", "But", "Or", "Yet", "So", "Though", "Once", "While", "Since"];
  var finals = ["something", "anything", "nothing", "everything"];
  var nouns = ["weeks", "notes", "airports", "reactions", "thrills", "pies", "increases", "fuels", "houses", "credits", "dogs", "supports", "cars", "sticks", "baskets", "boats", "hooks", "jumps", "drawers", "toess", "bites", "boundaries", "mines", "oranges", "knees", "earthquakes", "earths", "horns", "moves", "cups", "dolls", "spoons", "loves", "coats", "sciences", "shapes", "servants", "eggs", "sacks", "purposes", "weights", "whips", "pigs", "statements", "notebooks", "rings", "sisters", "ends", "territorys", "quartzs", "cattle", "scales", "fairies", "tempers", "bloods", "threads", "tramps", "snakes", "cows", "suggestions", "haircuts", "taxex", "juices", "arithmetic", "legs", "hands", "breaths", "adjustments", "ranges", "wings", "protests", "partners", "pumps", "notebooks", "birthdays", "recesss", "trouserss", "downtowns", "turkeys", "rules", "frogss", "rakes", "boats", "pipes", "pushs", "badges", "boards", "plays", "companys", "hats", "yards", "golds", "antss", "hours", "fleshs", "cats", "knees", "glasss", "controls", "papers", "archs", "days", "lunchrooms", "dirts", "strangers", "arts", "bikess", "produces", "degrees", "apparels", "bridges", "weights", "breaths", "believes", "sugars", "laughs", "turns", "rocks", "roses", "attractions", "approvals", "fairiess", "winters", "sneezes", "feelings", "earths", "facts", "norths", "dogs", "jewels", "hospitals", "brothers", "loves", "limits", "points", "teachings", "planes", "seashores", "months", "crooks", "sizes", "elbows", "moms", "basketballs", "oatmeals", "bedss", "tops", "tongues", "stockings", "earthquakes", "sweaters", "minutes", "screws", "bells", "forces", "crowns", "monkeys", "interests", "keys", "plantations", "tricks", "stars", "deaths", "questions", "schools", "orders", "wounds", "scents", "chances", "marbles", "umbrellas", "stations", "years", "actions", "seats", "railways", "zincs", "tempers", "circles", "advertisements", "boots", "toys", "hills", "humors", "pizzas", "kisses", "wings", "pictures", "ministers", "queens", "cameras", "backs", "heats", "scarecrows", "fruits", "giraffes", "governments", "spoons", "uncles", "markets"];
  var verbs =  ["cross", "fancy", "shrug", "time", "dust", "wait", "try", "scream", "rhyme", "supply", "compete", "flood", "communicate", "radiate", "strengthen", "sip", "work", "yell", "share", "retire", "pop", "support", "milk", "examine", "chew", "last", "melt", "note", "relax", "raise", "zoom", "hope", "mine", "scold", "pine", "roll", "divide", "attempt", "announce", "spark", "play", "face", "welcome", "invite", "collect", "skip", "chop", "receive", "warn", "peel", "complain", "file", "smash", "bury", "earn", "fit", "nod", "plant", "admire", "moor", "confuse", "pretend", "search", "open", "preach", "possess", "drain", "puncture", "gather", "yawn", "replace", "care", "borrow", "exist", "wink", "trot", "educate", "crawl", "observe", "offer", "trade", "tap", "laugh", "reach", "tickle", "rinse", "obey", "bathe", "delay", "challenge", "wish", "disapprove", "drip", "sniff", "correct", "cheat", "cheer", "expand", "choke", "sparkle", "guarantee", "suspend", "wish", "apologise", "influence", "marry", "deserve", "reject", "appear", "mix", "blink", "fit", "yell", "ignore", "train", "answer", "drip", "offend", "invent", "carry", "decide", "regret", "reduce", "squeak", "sin", "claim", "nail", "guard", "disagree", "explode", "tour", "plan", "blot", "clean", "injure", "borrow", "push", "whisper", "guess", "rule", "flap", "permit", "need", "blush", "ban", "rush", "introduce", "dust", "embarrass", "play", "obey", "skip", "untidy", "pine", "bounce", "itch", "fold", "colour", "dream", "punch", "admit", "record", "note", "crush", "join", "face", "mourn", "pause", "steer", "signal", "clip", "pray", "scribble", "preserve", "precede", "scare", "rock", "stay", "radiate", "glow", "brush", "spray", "count", "flow", "prepare", "exercise", "advise", "rescue", "empty", "terrify", "box", "stuff", "spill", "boil", "love", "alert", "balance", "strengthen", "strap", "tap"];

  var conjunction = conjunctions[Math.floor(Math.random()*conjunctions.length)];
  var final = finals[Math.floor(Math.random()*finals.length)];
  var noun = nouns[Math.floor(Math.random()*nouns.length)];
  var verb = verbs[Math.floor(Math.random()*verbs.length)];

  botData.finalTweet = conjunction + " the " + noun + " they " + verb + " " + final + ".";

  cb(null, botData);
}

postTweet = function(botData, cb) {
  t.post('statuses/update', {status: botData.finalTweet}, function(err, data, response) {
    cb(err, botData);
  });
}

run();

