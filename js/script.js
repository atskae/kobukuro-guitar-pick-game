console.log("笑");

/* Constant references */

// Images
const questionImage = "images/placeholder_question.png";
const haveItImage = "images/placeholder_have_it.png";
const notHaveItImage = "images/placeholder_not_have_it.png";
const haveItImageNext = "images/placeholder_have_it_next.png";
const notHaveItImageNext = "images/placeholder_not_have_it_next.png";

// Sound effects
// Hopefully I won't get in trouble for this...
const questionSound = new Audio("sounds/question.mp3");
const kobuchiHasItSound = new Audio("sounds/kobuchi_has_it.mp3");
const kobuchiNotHasItSound = new Audio("sounds/kobuchi_not_has_it.mp3");
const haHaHaSound = new Audio("sounds/hahaha.mp3");
const sugoiSound = new Audio("sounds/sugoi.mp3");

// Document elements
const kobuchiImage = document.getElementById("kobuchi-img")
const kobuchiScore = document.getElementById("kobuchi-score");
const headerText = document.getElementById("header-text");

// Random sound effects
randomSounds = {}

randomSounds["kobuchi"] = [
  new Audio("sounds/kobuchi_hm.mp3"),
  new Audio("sounds/kobuchi_look.mp3"),
  new Audio("sounds/kobuchi_sugoi.mp3"),
  new Audio("sounds/kobuchi_nani.mp3"),
  new Audio("sounds/kobuchi_pero.mp3"),
  new Audio("sounds/kobuchi_hikeru.mp3"),
  new Audio("sounds/kobuchi_eyay.mp3"),
  new Audio("sounds/kobuchi_yare.mp3"),
];

randomSounds["kuroda"] = [
  new Audio("sounds/kuroda_eejyanai.mp3"),
  new Audio("sounds/kuroda_surprise.mp3"),
  new Audio("sounds/kuroda_uruseh.mp3"),
  new Audio("sounds/kuroda_anohi.mp3"),
  new Audio("sounds/kuroda_nani.mp3"),
  new Audio("sounds/kuroda_dochi.mp3"),
  new Audio("sounds/kuroda_dekita.mp3"),
];

/* Logic */

function playRandom(person) {
  sounds = randomSounds[person];
  sound = sounds[Math.floor(Math.random() * sounds.length)];
  sound.play();
}

function displayHaveIt() {
  console.log("displayHaveIt()");    
  kobuchiImage.src = haveItImage;
  headerText.innerHTML = "持ってる〜";
  kobuchiHasItSound.play();
}

function displayNotHaveIt(){
  console.log("displayNotHaveIt()");
  kobuchiImage.src = notHaveItImage;
  headerText.innerHTML = "今は持ってな〜い";
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
 
  // Reset question
  headerText.innerHTML = "今どっちでしょうか？";
  
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

  // "Update" the winner's score 笑
  score = parseInt(kobuchiScore.innerHTML);
  kobuchiScore.innerHTML = score + 1;
 
}

function main() {
  disableButtons();
  
  // Setup reaction sounds
  // This ensures the second sound starts only when the first sound ends
  kobuchiNotHasItSound.addEventListener("ended", function() {
    kobuchiImage.src = notHaveItImageNext;
    console.log("Changed image to notHaveItNext");
    haHaHaSound.addEventListener("ended", function() {addOverlayReplay();});
    haHaHaSound.play();
  });
  
  kobuchiHasItSound.addEventListener("ended", function() {
    kobuchiImage.src = haveItImageNext;
    console.log("Changed image to haveItNext");
    sugoiSound.addEventListener("ended", function() {addOverlayReplay();});
    sugoiSound.play();
  });
  
  // Turn on overlay
  document.getElementById("overlay-first").style.display = "block";
}

/* Main entry point */

main();
