'use strict';
// Form:
// create a form that asks for name, DOB, and date, as well as a button that submits the form and starts the test.
// grab from DOM via event handler, and store the newly input information

var testanswer = document.getElementById('testanswer');
var userForm = document.getElementById('userform');
var surveytop = document.getElementById('surveytop');
var surveymid = document.getElementById('surveymid');
var surveybottom = document.getElementById('surveybottom');

var answerTrue = document.createElement('li');
var answerFalse = document.createElement('li');

var qtitle = document.getElementById('qtitle');
var qaudio = document.getElementById('qaudio');
var question = document.createElement('p');

// survey.parentElement.removeChild(survey);

// var birthDate = document.getElementsByName('birthdate');
// var testDate = document.getElementsByName('date');

var qcounter = 0;
var userLog = [];

var UserInfo = function (name, birthdate, testdate) {
  this.name = name;
  this.birthdate = birthdate;
  this.testdate = testdate;
}


// make arrays for each intelligence to count up number of trues. trues will be pushed up from each question object on click
// var types={
var linguistCount = 0;
var logic = 0;
var musicalCount = 0;
var bodily = 0;
var spatial = 0;
var inter = 0;
var intra = 0;
// }

var testQuestions = [];

// For each question:
// create constructor function to construct test question objects with properties of:
// question value (wording of q)
// quetion number (ordered questions, no random)
// category of intelligence (this will add to intel array count)
// to track overal count, creat baseline var counter = 0

var IqType = function (qvalue, category, index, filepath) {
  this.qvalue = qvalue;
  this.category = category;
  this.index = index;
  this.filepath = filepath;

  testQuestions.push(this);
}

new IqType('I’d rather draw a map than give someone verbal directions.', 'visual', '1', 'audio/q1.mp3');
new IqType('If I am angry or happy, I usually know exactly why.', 'intra', '2', 'audio/q2.mp3');
new IqType('I can play (or used to play) a musical instrument.', 'musical', '3', 'audio/q3.mp3');
new IqType('I can associate music with my moods.', 'musical', '4', 'audio/q4.mp3');

console.log('questions ', testQuestions);
console.log(testQuestions[0].qvalue);
console.log(testQuestions[1].index);

// this function handles input into our form
function handleUserInfo(event) {
  event.preventDefault();

  var userName = event.target.name.value;
  var birthDate = event.target.birthdate.value;
  var testDate = event.target.date.value;

  var newUser = new UserInfo(userName, birthDate, testDate);

  userLog.push(newUser);
  console.log('userLog is ', userLog);
  console.log('newUser is ', newUser);
  // we need to figure out how to log dates in and in what format

  // this will tuck away our form once submitted
  var input = document.getElementById('input');
  input.parentElement.removeChild(input);
  showQuestion();
  showTitle();
  // showAudio();
  showAnswers();
}

userForm.addEventListener('submit', handleUserInfo);

// build a function to call our objects

var currentQuestion = 0;

// this funciton will handle the rendering of new questions

function showTitle() {
  // generate Q title and counter
  qtitle.textContent = `Question ${testQuestions[currentQuestion].index} of 35`;
  surveytop.appendChild(qtitle);
}

// function showAudio() {
//   // generate audio
//   qaudio.innerHTML = `<audio id=\"\" src=\"${testQuestions[currentQuestion].filepath}\" type=\"audio/mp3\" controls=\"\"></audio>`;
//   surveytop.appendChild(qaudio);
// }

function showQuestion() {
  // generate test question

  question.innerHTML =
    `<div class="${testQuestions[currentQuestion].category}" id=\"question\">${testQuestions[currentQuestion].qvalue}</div>`;
  surveymid.appendChild(question);
}

function showAnswers() {
  // generate answer selections

  answerTrue.innerHTML = '<div id=\"true\">T</div>';
  testanswer.appendChild(answerTrue);

  answerFalse.innerHTML = '<div id=\"false\">F</div>';
  testanswer.appendChild(answerFalse);

}


// accept answers

// create listener for each true and false
// create if things we want to happen/else run fn to show next prompt
answerTrue.addEventListener('click', handleTrue);
answerFalse.addEventListener('click', handleFalse);

function handleTrue(event) {
  if (qcounter<4) {
    console.log('test q current q is at' ,testQuestions[currentQuestion].category);
    if (testQuestions[currentQuestion].category === 'linguist'){
      linguistCount++;
    }else if(testQuestions[currentQuestion].category === 'logic'){
      logic++;
    }else if(testQuestions[currentQuestion].category === 'musical'){
      musicalCount++;
    }else if(testQuestions[currentQuestion].category === 'bodily'){
      bodily++;
    }else if(testQuestions[currentQuestion].category === 'spatial'){
      spatial++;
    }else if(testQuestions[currentQuestion].category === 'inter'){
      inter++;
    }else{
      intra++;
    };
    console.log('music is ', testQuestions[currentQuestion].musical);
    console.log(event.target);
    qcounter++;
  //  clear for next round

  showQuestion();
  showTitle();
  // showAudio();
  showAnswers();
  }
// console.log('currentQuestion ',parseInt(currentQuestion));
currentQuestion++;
// types[testQuestions[parseInt(currentQuestion)].category]++;
// console.log('types are', types[testQuestions[parseInt(currentQuestion)].category]);
}


function handleFalse(event) {
  console.log(event.target);
if (qcounter<35){
  // clear for next round

  showQuestion();
  showTitle();
  // showAudio();
  showAnswers();
  qcounter++;
}
}

// console.log(musical);

// Have progress bar across top. (maybe stretch goal)

// event handler will add to general counter and intelligence specific counters as well as prompting next question

// create a function that will push new questions into the template