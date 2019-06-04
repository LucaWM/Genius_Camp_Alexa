'use strict';
const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
//var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const APP_ID = undefined;
const HELP_MESSAGE = 'HELP MESSAGE';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = 'I dont recognize that';

var x = 0;
var y = 0;
var z = 0;
var QuestionNumber = 0;
var Questions = ["To take the test, answer as honestly as possible. For each question, answer either 1, 2, or 3. Let's get started! What type of book would you read for fun? 1. A book with lots of pictures, 2. A book with a lot of words, or 3. A book with lots of activities like crosswords or puzzles.",
"Next, would you rather your teacher: 1. Lecture the lesson to you, 2. Let you learn by reading your textbook, only answering any questions you may have or 3. Give you a lab to learn by trying. ",
"Great! Let's continue. When you see the word dog, do you: 1. Imagine playing fetch or walking a dog, 2. Picture a dog in your mind, or 3. Hear the barking of a dog. ",
"If you don't know how to spell a word, what do you do? Do you: 1. Trace the letters in the air with your finger, 2. Spell the word out loud to see if it sounds right, or 3. Write the word out to see if it looks right. ",
"How would you study for a major test coming up soon. Would you: 1. Have someone quiz you so that you have to answer the question out loud, 2. Make flash cards to review, or 3. Re-read the textbook or review your notes. ",
"You're about halfway done now, hold in there! If you are waiting in line in a supermarket, what would you most likely do? Would you 1. Fidget about and twiddle your thumbs, 2. Listen to the music the store is playing or start a conversation with someone standing nearby, or 3. Pick up the magazine near the checkout to read. ",
"You're forced to memorize a long list of items for a final! Do you memorize them by: 1. Simply staring at the long list , 2. Repeating them out loud over and over again, or 3. Copying them repeatedly. ",
"You're almost there! When trying to remember names, you remember: 1. Faces more easily than names, 2. Names more easily than faces, or 3. The meeting or encouter with the person rather than their name or face. ",
"You've just bought a new chair from Ikea. To assemble it, would you: 1. Watch a video of someone else assembling the table or look at the instruction manual, 2. Get in there and try putting things together yourself, or 3. Call someone else who has put the chair together before and have them narrate how they put the chair together. ",
"And lastly, if you wanted to learn more while on a tour, you would: 1. Ask the tour guide a question or discuss with someone else on the tour, 2. Look at travel brochures and read an itinerary or 3. Find a map to discover where you are going next. "];

const handlers = {
    'LaunchRequest': function () {
      QuestionNumber = 0;     
      var speechOutput = "<audio src='soundbank://soundlibrary/magic/amzn_sfx_fairy_melodic_chimes_01'/>" + "Welcome to Alex's Learning Test! Take this test to determine what type of learner you are. Are you ready to determine your learning style? ";
      this.response.speak(speechOutput).listen("What would you like to do?");
      this.emit(':responseReady');
    },
   "QuestionIntent": function (){
    var speechOutput = Questions[QuestionNumber];
    this.response.speak(speechOutput).listen("What would you like to do?");
    this.emit(':responseReady');
},
  "AnswerIntent": function (){   
    var userGuess = this.event.request.intent.slots.userGuess.value;
    userGuess = parseInt(userGuess); 
    if (userGuess != 1 && userGuess!= 2 && userGuess != 3){
        var speechOutput = "That is not a valid answer.";
        this.response.speak(speechOutput).listen("Say 1, 2, or 3"); 
        this.emit(':responseReady');
    }
    else {
        if (QuestionNumber >= 9){
            this.emit('FinalScoreIntent');
        } 
        answer(userGuess,QuestionNumber);

        QuestionNumber++; 
        this.emit('QuestionIntent');
    }
},
  "FinalScoreIntent": function (){  
    var speechOutput;
    if ((x>z) || (x>y))
        speechOutput = "You are a VISUAL learner! To improve your learning habits, sit where you can see in class, use flashcards to learns new words, utilize diagrams and charts, draw pictures to help you remember, color code your annotations, and take copious notes. Remember that you need to be able to SEE what you are learning to learn effectively. ";
    if ((y>z) || (y>x))
        speechOutput = "You are an AUDITORY learner! To improve your learning habits, sit where you can hear in class, read stories and passages out loud, record yourself to listen back, and if your teacher allows, record the lesson so that you can review at home. Above all, make sure you are HEARING and LISTENING to learn effectively. ";
    if ((z>x) ||(z>y))
        speechOutput = "You are a KINESTHETIC learner! To improve your learning habits, participate in hands-on learning activities, trace or re-write passages you want to memorize, and try to bring what you are learning in class into something you can interact with, like an abacus for math. Remember that you need to be DOING something to learn effectively. ";
    this.response.speak(speechOutput).listen("Say that again?"); 
    this.emit(':responseReady');
      
  },            
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
     'AMAZON.FallbackIntent': function () {
        this.response.speak(FALLBACK_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
};

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function answer (userGuess, QuestionNumber){
    if(QuestionNumber == 0){
             if(userGuess == "1"){
                 x++;
             }
             else if(userGuess == "2"){
                 x++;
             }
             else if(userGuess == "3"){
                 z++;
             }
    }
    if(QuestionNumber == 1){
             if(userGuess == "1"){
                 y++;
                 y++;
             }
             else if(userGuess == "2"){
                 x+= 2;
             }
             else if(userGuess == "3"){
                 z+= 2;
             }
    }
    if(QuestionNumber == 2){
             if(userGuess == "1"){
                 z++;
             }
             if(userGuess == "2"){
                 x++;
             }
             if(userGuess == "3"){
                 y++;
             }
    }
    if(QuestionNumber == 3){
             if(userGuess == "1"){
                 z++;
             }
             if(userGuess == "2"){
                 y++;
             }
             if(userGuess == "3"){
                 x++;
             }
    }
    if(QuestionNumber == 4){
             if(userGuess == "1"){
                 y++;
             }
             if(userGuess == "2"){
                 z+= 2;
                 x++;
             }
             if(userGuess == "3"){
                 x++;
             }
    }
    if(QuestionNumber == 5){
             if(userGuess == "1"){
                 z++;
             }
             if(userGuess == "2"){
                 y++;
             }
             if(userGuess == "3"){
                 x++;
             }
    }
    if(QuestionNumber == 6){
             if(userGuess == "1"){
                 x++;
             }
             if(userGuess == "2"){
                 y++;
             }
             if(userGuess == "3"){
                 z++;
             }
    }
    if(QuestionNumber == 7){
             if(userGuess == "1"){
                 x++;
             }
             if(userGuess == "2"){
                 y++;
             }
             if(userGuess == "3"){
                 z++;
             }
    }
    if(QuestionNumber == 8){
             if(userGuess == "1"){
                 x++;
                 y++;
             }
             if(userGuess == "2"){
                 z++;
             }
             if(userGuess == "3"){
                 y++;
             }
    }
    if(QuestionNumber == 9){
             if(userGuess == "1"){
                 y++;
             }
             if(userGuess == "2"){
                 x++;
             }
             if(userGuess == "3"){
                 z+= 2;
                 x++;
             }
    }
}
