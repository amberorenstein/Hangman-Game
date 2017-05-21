//VARIABLES
//------------------------------------------------------
//Arrays and Variables for holding data
var wordOptions = ["avery", "boulder", "breckenridge", "revolution", "paradox", "cerebral", "odell", "wynkoop", "walnut", "coors", "greatdivide", "lefthand", "newbelgium", "bristol", "dillon dam", "tommyknocker", "dry dock"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var banksAndSuccesses = []; 
var wrongLetters = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;
var wrongLetters =" ";


//FUNCTIONS
//------------------------------------------------------
//Stick Figure Animation
var animate = function () {
    var drawMe = guessesLeft ;
    drawArray[drawMe]();
  }


// Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickFigure");
    context = stickFigure.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#474350";
    context.lineWidth = 2;
  };
  
    head = function(){
      myStickman = document.getElementById("stickFigure");
      context = stickFigure.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 




function startGame(){
selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
lettersInWord = selectedWord.split("");
numBlanks = lettersInWord.length;
canvas();
context.clearRect(0, 0, 400, 400);

//Resets
guessesLeft = 9;
wrongLetters = [];
blanksAndSuccesses = [ ];



//Populate banks and successes with the correct number of spaces
for (var i = 0; i < numBlanks; i++){
	blanksAndSuccesses.push("_");
	}


//Change HTML to reflect game consitions
document.getElementById("currentWord").innerHTML = blanksAndSuccesses.join(" ");
document.getElementById("numGuesses").innerHTML = guessesLeft;
document.getElementById("winCounter").innerHTML = winCount;
document.getElementById("lossCounter").innerHTML = lossCount;
//Tests
console.log(selectedWord);
console.log(lettersInWord);
console.log(numBlanks);	
console.log(blanksAndSuccesses);

}

function checkLetters(letter) {
	//Checks if letter exists in word at all

	var isLetterInWord = false;

	for (var i=0; i < numBlanks; i++){
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	//Identify if letter exists, populate the array
	if(isLetterInWord) {
	for (var i = 0; i < numBlanks; i++) {
		if(selectedWord[i] == letter) {
			blanksAndSuccesses[i] = letter;
		}
	}
}
	//Letter is not in the word
	else{
		wrongLetters.push(letter);
		guessesLeft--;
		animate();
	}

	//Test

	console.log(blanksAndSuccesses);
}


function roundComplete(){
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("currentWord").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
	//Check for win
	if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Win! The selected brewery was " + selectedWord + ". Cheers!");
		document.getElementById("winCounter").innerHTML = winCount;
		startGame();
	}

	//Check for loss
	else if (guessesLeft == 0){
		lossCount++;
		alert("You lose. The selected brewery was " + selectedWord + ". You should grab a beer.");

		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}

//Starts game and resets code
startGame();

//Key clicks
document.onkeyup = function(event){
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();	
	//Test
	console.log(letterGuessed);

}