console.log("笑");

// Images
var questionImage = "images/placeholder_question.png";
var haveItImage = "images/placeholder_have_it.png";
var notHaveItImage = "images/placeholder_not_have_it.png";

// Sound effects
// Hopefully I won't get in trouble for this...
var questionSound = new Audio("sounds/question.mp3");
var kobuchiHasItSound = new Audio("sounds/kobuchi_has_it.mp3")
var kobuchiNotHasItSound = new Audio("sounds/kobuchi_not_has_it.mp3")
var hahaha = new Audio("sounds/hahaha.mp3");

// Document elements
kobuchiImage = document.getElementById("kobuchi-img")
kobuchiScore = document.getElementById("kobuchi-score");

function displayHaveIt() {
  console.log("displayHaveIt()");    
  kobuchiImage.src = haveItImage;
  kobuchiHasItSound.play();
}

function displayNotHaveIt(){
  console.log("displayNotHaveIt()");
  kobuchiImage.src = notHaveItImage;
  kobuchiNotHasItSound.play();
}

function disableButtons() {
  document.getElementById("have_it").setAttribute("disabled", true);
  document.getElementById("not_have_it").setAttribute("disabled", true);
  console.log("Buttons disabled.");
}

function enableButtons() {
  document.getElementById("have_it").removeAttribute("disabled");
  document.getElementById("not_have_it").removeAttribute("disabled");
  console.log("Buttons enabled.");
}

function returnToQuestion() {
  // Change to main image
  kobuchiImage.src = questionImage;
  
  // Ask question
  questionSound.play();

  // Enable buttons again
  enableButtons();
}

function removeOverlay(id) {
  document.getElementById(id).style.display = "none";
  returnToQuestion();
}

function addOverlayReplay() {
  document.getElementById("overlay-replay").style.display = "block";
}

function buttonAction(choice) {
  console.log("choice=" + choice);
  
  // Disable buttons until animation and sound complete
  disableButtons();
  
  if (choice === "have_it") {
    displayNotHaveIt();
  }
  else if(choice === "not_have_it") {
    displayHaveIt();
  }

  // "Update" the score 笑
  score = parseInt(kobuchiScore.innerHTML);
  kobuchiScore.innerHTML = score + 1;
 
  // Show replay message overlay in milliseconds
  setTimeout(addOverlayReplay, 2000);
}

function main() {
  disableButtons();
  // Turn on overlay
  document.getElementById("overlay-first").style.display = "block";
}

main();
