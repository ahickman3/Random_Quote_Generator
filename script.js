$(document).ready(function(){ //Dont do any js code until document is done loading

var quotes = { //Quotes for each smash bros character
	Mario: ["So long-a-Bowser!", "Nighty nighty. Ah spaghetti. Ah, ravioli. Ahh, mama mia.", "You know what they say: all toasters toast toast."],
	Luigi: ["Let's-a go...", "Oh yeah! Who's number one now?! Luigi!", "Now, THIS is where the real action is"],
	Bowser: ["Im HUUUUGE! Even scarier up close, huh?", "GAH HA HA HA! There's no WAY you're ready for a round against ME. Keep practicing, pip-squeak!"],
	Peach: ['Oh, did I win?', "Go Peachy, Go Peachy, Go Peachy! Yay! Woohoo!"],
	Yoshi: ['Yoshi!'],
	Fox: ["This is Fox, returning to base!", "Better luck next time, Falco!"],
	Falcon: ["Falcon Kick!", 'Blue Falcon!', 'Show me your moves!'],
	Marth: ["Konkaiwa bokuno kachidane! (It's my victory this time!)", "Kyoumo ikinobiru kotoga dekita. (Even today I was able to survive.)",  
			 "Bokuwa makeru wake niwa ikenainda! (There's no way I can lose!)"],
	Pit: ["Three Sacred Treasures!", "It's game over for you!", "That all you got?"],
	Link: ["....."],
	Ike: ["Great... AETHER!", "I fight for my friends.", "You'll get no sympathy from me."],
	Lucario: ["Behold, the power of Aura!", "The Aura is with me!", "Max Aura!"],
	'Wii Fit Trainer': ["High energy, move that body!", "Salute the sun!", "Work hard to tone that tummy."],
	Sheik: ['I\'ve been waiting for you, Hero of Time...', 'The flow of time is always cruel.'],
	Ganandorf: ['Hero? ...I\'ve outlived more "heroes" than you can possibly imagine.', 'Behold! The power of the Demon King!',
				'I am Ganondorf, the Demon King. Don\'t take that title lightly.'],
	Mac: ["Let 'em have it, Mac!", "Way to go, Mac! You're the champ, baby!", "Nice moves, Mac. I can barely keep my eyes on you, son."],
	Palutena: ["You shall be purified.", "No one can hide from the light.", "Celestial Fireworks!"],
	Robin: ["The key to victory lies within.", "I'm always three steps ahead.", "It seems our fates are joined."],
	Shulk: ["Now it's Shulk time!", "I can change the future!", "The future is ours to decide!"],
	Sonic: ["That was almost too easy!", "Let's do that again some time!"],
	Falco: ["Personally, I prefer the air!", "You aren't worth the trouble."],
	Wario: ["Wa-Wa-Wa!", "Time for victory parade."],
	'Toon Link': ["....."],
	Lucina: ["The future is not written!", "Time to change fate!"]
}

//Index of each name corresponding to imgur pictures order
var nameArr = ['Mario', 'Luigi', 'Bowser', 'Peach', 'Yoshi', 'Lucina', 'bowser jr', 'Wario', 'game and watch', 'donkeyk', 'diddyk', 'Link', 'Zelda', 
			   'Sheik', 'Ganandorf', 'Toon Link', 'samus', 'zero suite samus', 'Pit', 'Palutena', 'Marth', 'Ike', 'Robin', 'kirby', 'king deedeedee', 'meta knight',
			   'Mac', 'placeholder', 'Fox', 'Falco', 'pikachu', 'charizard', 'Lucario', 'jigglypuff', 'Greninja', 'duck hunt', 'Rob', 'ness', 'Falcon', 'villager', 
			   'olimar', 'Wii Fit Trainer', 'dr mario', 'dark pit', 'Lucina', 'Shulk', 'pacman', 'Megaman', 'Sonic'];



//Your imgur API info
var imgurID = '0RQtP'; 
var key = "444825631a11a01";

//randomFxn gets JSON data for smash bros pictures album
function randomFxn(){
	$.ajax({
	type: 'GET',
	url: 'https://api.imgur.com/3/album/' + imgurID + '/images',
	headers: {'Authorization': 'Client-ID '+ key},
	}).done(function(data) {
		showZones(data) 
	});
 }

var lastNum;   //Number corresponding with last name picked
var randQuote; //Random quote that will be displayed

//showZones will be called from .ajax and will display quotes and change background image. It will also assign url/quote to twitter button
function showZones(jsonData){
	//Keep getting nameNum until nameNum is not equal to lastNum 
	do{                         
	var nameNum = Math.floor(Math.random()*(Object.keys(quotes).length));
	} while (nameNum == lastNum)
	lastNum = nameNum;

	var name = Object.keys(quotes)[nameNum];                             //Name for quotes element corresponding with nameNum
	var quoteArrLength = quotes[name].length;                            //Number of quotes for that name
	var randQuoteNum = Math.floor(Math.random()*quoteArrLength)          //Pick random quote number
	randQuote = '\"' + quotes[name][randQuoteNum] + '\"';                //Put quote corresponding with random quote number in randQuote
	var indexMult = (nameArr.indexOf(name)*8);                           //character index for new background
	var addToIndex = Math.floor(Math.random()*8);                        //random character skin for new background
	var url = 'url(' + jsonData.data[(indexMult)+addToIndex].link + ')'; //Url for character skin in proper format to use in .css
	var isReverse = Math.floor(Math.random()*2);                         //random number to determine whether image is horizontally flipped or not
                  
	//change texts of h2 and h3 for new quote and author
	$('h3').text('-' + name); 
	$('h2').text(randQuote);

	//Give twitter button href = twitter url + new quote and have it open in new tab
    $('.twitBtn').attr('href', 'https://twitter.com/intent/tweet?text='+ randQuote).attr('target', '_blank'); 

    //Fade out background, then ,if ifReverse = 1, flip image and fade in new background
	$('.bg').fadeOut(500, function() {
		if(isReverse==1){
			$(this).css({'background-image': url, 'transform': 'scaleX(-1)'}).fadeIn(700);

		}
		else{
			$(this).css({'background-image': url, 'transform': 'scaleX(1)'}).fadeIn(700);
		}						
	});
}


var num = 0; //timeout number

//when quote button is clicked, call random function and make clicking button do nothing until old and new background fading is complete
$('.quoteBtn').click(function(){

	if (num == 0){
		num++;

		randomFxn();

		setTimeout(function(){
			num = 0;
		}, 1200);
	}
});
});