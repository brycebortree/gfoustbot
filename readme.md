# GFoustBot

A bot that riffs on the poem "And the ghosts they own everything" by [Graham Foust](http://twitter.com/finedistraction)

## Bot in the Wild
[G Foust Bot](http://twitter.com/GFoustBot)

### Prerequisities

You'll need:

* Node installed on your command line
* A Twitter account with its own phone number & API keys
* A Wordnik account & API key
* The foustbot.js file

### Installing

Feel free to clone this repo and edit the foustbot.js file to create your own Twitter poet bots. Edit the foustbot.js file's requests to the Wordnik API. Run from your command line using 

```
foustbot.js
```

Then refine the random words and tweets you're making.

### Poem Template

CONJUNCTION the NOUN-PLURAL they VERB-PRESENT everything/something/nothing/anything

## Deployment

This bot was deployed to Heroku with a simple Procfile and uses the Heroku scheduler to tweet every hour.

Procfile content: 
```
main: node foustbot.js
```

## Built With

* NPM - to install various node packages that made the process much easier

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* This bot was built using [ursooperduper](https://github.com/ursooperduper)'s [PickTwoBot](https://twitter.com/picktwobot) tutorial as base code
* Profile image and banner image for Twitter using [Unsplash](https://unsplash.com) images
