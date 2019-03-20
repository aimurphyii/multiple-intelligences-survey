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

var UserInfo = function (name, birthdate, testdate) {
  this.name = name;
  this.birthdate = birthdate;
  this.testdate = testdate;
};


// make arrays for each intelligence to count up number of trues. trues will be pushed up from each question object on click
// var types={
var linguistCount = 0;
var logicCount = 0;
var musicalCount = 0;
var bodilyCount = 0;
var spatialCount = 0;
var interCount = 0;
var intraCount = 0;
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

// Objects/test questions

new IqType('I’d rather draw a map than give someone verbal directions.', 'spatial', '1', 'audio/q1.mp3');
new IqType('If I am angry or happy, I usually know exactly why.', 'intra', '2', 'audio/q2.mp3');
new IqType('I can play (or used to play) a musical instrument.', 'musical', '3', 'audio/q3.mp3');
new IqType('I can associate music with my moods.', 'musical', '4', 'audio/q4.mp3');
new IqType('I can add or multiply quickly in my head.', 'logic', '5', 'audio/q5.mp3');
new IqType('I can help a friend sort out strong feelings because I successfully dealt with similar feelings myself.', 'inter', '6', 'audio/q6.mp3');
new IqType('I like to work with calculators and computers.', 'logic', '7', 'audio/q7.mp3');
new IqType('I pick up new dance steps fast.', 'logic', '8', 'audio/q8.mp3');
new IqType('It is easy for me to say what I think in an argument or debate.', 'logic', '9', 'audio/q9.mp3');
new IqType('I enjoy a good lecture, speech, or sermon.', 'logic', '10', 'audio/q10.mp3');
new IqType('I always know north from south no matter where I am.', 'logic', '11', 'audio/q11.mp3');
new IqType('I like to gather together groups of people for parties of special events.', 'logic', '12', 'audio/q12.mp3');
new IqType('Life seems empty without music.', 'logic', '13', 'audio/q13.mp3');
new IqType('I always understand the drawings that come with new gadgets or appliances.', 'logic', '14', 'audio/q14.mp3');
new IqType('I like to work puzzles and play games.', 'logic', '15', 'audio/q15.mp3');
new IqType('Learning to ride a bike (or skates) was easy.', 'logic', '16', 'audio/q16.mp3');
new IqType('I am irritated when I hear an argument or statement that sounds illogical.', 'logic', '17', 'audio/q17.mp3');
new IqType('I can convince other people to follow my plans.', 'logic', '18', 'audio/q18.mp3');
new IqType('My sense of balance and coordination is good.', 'logic', '19', 'audio/q19.mp3');
new IqType('I often see patterns and relationships between numbers faster and easier than others do.', 'logic', '20', 'audio/q20.mp3');
new IqType('I enjoy building models (or sculpting).', 'logic', '21', 'audio/q21.mp3');
new IqType('I’m good at finding the fine points of word meanings.', 'logic', '22', 'audio/q22.mp3');
new IqType('I can look at an object one way and see it turned sideways or backwards just as easily.', 'logic', '23', 'audio/q23.mp3');
new IqType('I often connect a piece of music with some event in my life.', 'logic', '24', 'audio/q24.mp3');
new IqType('I like to work with numbers and figures.', 'logic', '25', 'audio/q25.mp3');
new IqType('I like to sit quietly and reflect on my inner feelings.', 'logic', '26', 'audio/q26.mp3');
new IqType('Just looking at shapes of buildings and structures is pleasurable to me.', 'logic', '27', 'audio/q27.mp3');
new IqType('I like to hum, whistle, and sing in the shower or when I’m alone.', 'logic', '28', 'audio/q28.mp3');
new IqType('I’m good at athletics.', 'logic', '29', 'audio/q29.mp3');
new IqType('I enjoy writing detailed letters to friends.', 'logic', '30', 'audio/q30.mp3');
new IqType('I’m usually aware of the expression on my face.', 'logic', '31', 'audio/q31.mp3');
new IqType('I’m sensitive to the expressions on other people’s faces.', 'logic', '32', 'audio/q32.mp3');
new IqType('I stay “in touch” with my moods. I have no trouble identifying them.', 'logic', '33', 'audio/q33.mp3');
new IqType('I am sensitive to the moods of others.', 'logic', '34', 'audio/q34.mp3');
new IqType('I have a good sense of what others think of me.', 'logic', '35', 'audio/q35.mp3');

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
  if (qcounter<7) {
    console.log('test q current q is at' ,testQuestions[currentQuestion].category);
    console.log(testQuestions[currentQuestion].qvalue);
    if (testQuestions[currentQuestion].category === 'linguist'){
      linguistCount++;
    }else if(testQuestions[currentQuestion].category === 'logic'){
      logicCount++;
    }else if(testQuestions[currentQuestion].category === 'musical'){
      musicalCount++;
    }else if(testQuestions[currentQuestion].category === 'bodily'){
      bodilyCount++;
    }else if(testQuestions[currentQuestion].category === 'spatial'){
      spatialCount++;
    }else if(testQuestions[currentQuestion].category === 'inter'){
      interCount++;
    }else{
      intraCount++;
    };
    console.log('music is ', musicalCount);
    console.log('linguist is ', linguistCount);
    console.log('visual is ', spatialCount);
    console.log('intra is ', intraCount);
    console.log('inter is ', interCount);
    console.log('bodily is ', bodilyCount);
    console.log('logic is ', logicCount);
    console.log(event.target);
  //  clear for next round

  currentQuestion++;
  qcounter++;

  showQuestion();
  showTitle();
  // showAudio();
  showAnswers();
  } 
// console.log('currentQuestion ',parseInt(currentQuestion));

// types[testQuestions[parseInt(currentQuestion)].category]++;
// console.log('types are', types[testQuestions[parseInt(currentQuestion)].category]);
}


function handleFalse(event) {
  console.log(event.target);
if (qcounter<35){
  // clear for next round
  qcounter++;
  currentQuestion++;
  showQuestion();
  showTitle();
  // showAudio();
  showAnswers();

}
}

// console.log(musical);

// Have progress bar across top. (maybe stretch goal)

// event handler will add to general counter and intelligence specific counters as well as prompting next question

// create a function that will push new questions into the template