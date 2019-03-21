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

var linguist = [];
var logic = [];
var music = [];
var bodily = [];
var spatial = [];
var inter = [];
var intra = [];

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
  this.true = 0;

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
}

userForm.addEventListener('submit', handleUserInfo);


// this funciton will handle the rendering of new questions

function showQuestion() {
  for (var i = 0; i < testQuestions.length; i++){

  // generate Q title and counter
  qtitle.textContent = `Question ${testQuestions[i].index} of 35`;
  surveytop.appendChild(qtitle);

  // generate audio
  qaudio.innerHTML = '<audio id=\"\" src=\"\" type=\"audio/mp3\" controls=\"\"></audio>';
  surveytop.appendChild(qaudio);

  // generate test question

  question.innerHTML =
    `<div id=\"question\">${testQuestions[i].qvalue}</div>`;
  surveymid.appendChild(question);
  
  // generate answer selections

  answerTrue.innerHTML = '<div id=\"true\">T</div>';
  testanswer.appendChild(answerTrue);

  answerFalse.innerHTML = '<div id=\"false\">F</div>';
  testanswer.appendChild(answerFalse);

}
}


  // accept answers
  answerTrue.addEventListener('click', handleTrue);
  answerFalse.addEventListener('click', handleFalse);

function handleTrue(event) {
  for (var i = 0; i < testQuestions.length; i++) {
    testQuestions[i].true++;
    console.log(event.target);
    console.log(testQuestions[i].true);
    counter++;
  }

  //  clear for next round
  // surveytop.removeChild(qaudio);
  // surveytop.removeChild(qtitle);
  // surveymid.removeChild(question);
  // survey.removeChild(testanswer);
  showQuestion();
}


function handleFalse(event) {
  console.log(event.target);

  // clear for next round
  surveytop.removeChild(qaudio);
  surveytop.removeChild(qtitle);
  surveymid.removeChild(question);
  // survey.removeChild(testanswer);
  showQuestion();
  counter++;
}

// Have progress bar across top. (maybe stretch goal)

// event handler will add to general counter and intelligence specific counters as well as prompting next question

// create a function that will push new questions into the template