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

//Empty array for IQ types
var iqArray = [];

// Empty arrays for each IQ type
var linguistArray = [];
var logicArray = [];
var musicalArray = [];
var bodilyArray = [];
var spatialAray = [];
var interArray = [];
var intraArray = [];

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

  // var linguistCount = 0;
  // var logicCount = 0;
  // var musicalCount = 0;
  // var bodilyCount = 0;
  // var spatialCount = 0;
  // var interCount = 0;
  // var intraCount = 0;

  testQuestions.push(this);
  iqArray.push(this);
};

new IqType('I’d rather draw a map than give someone verbal directions.', 'spatial', '1', 'audio/q1.mp3');
new IqType('If I am angry or happy, I usually know exactly why.', 'intra', '2', 'audio/q2.mp3');
new IqType('I can play (or used to play) a musical instrument.', 'musical', '3', 'audio/q3.mp3');
new IqType('I can associate music with my moods.', 'musical', '4', 'audio/q4.mp3');
new IqType('I can add or multiply quickly in my head.', 'logic', '5', 'audio/q5.mp3');
new IqType('I can help a friend sort out strong feelings because I successfully dealt with similar feelings myself.', 'inter', '6', 'audio/q6.mp3');
new IqType('I like to work with calculators and computers.', 'logic', '7', 'audio/q7.mp3');







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
  if (qcounter<testQuestions.length) {
    console.log('test q current q is at' ,testQuestions[currentQuestion].category);
    console.log(testQuestions[currentQuestion].qvalue);
    if (testQuestions[currentQuestion].category === 'linguist'){
      // linguistCount++;
      // iqArray.push(linguistCount); // added this and other pushes for categories in peer programming
      currentQuestion.linguistCount++;
    }else if(testQuestions[currentQuestion].category === 'logic'){
      logicCount++;
      iqArray.push(logicCount);
      // currentQuestion.logicCount++;
    }else if(testQuestions[currentQuestion].category === 'musical'){
      musicalCount++;
      iqArray.push(musicalCount);
      // currentQuestion.musicalCount++;
    }else if(testQuestions[currentQuestion].category === 'bodily'){
      bodilyCount++;
      iqArray.push(bodilyCount);
      // currentQuestion.bodilyCount++;
    }else if(testQuestions[currentQuestion].category === 'spatial'){
      spatialCount++;
      iqArray.push(spatialCount);
      // currentQuestion.spatialCount++;
    }else if(testQuestions[currentQuestion].category === 'inter'){
      interCount++;
      iqArray.push(interCount);
      // currentQuestion.interCount++;
    }else{
      intraCount++;
      iqArray.push(intraCount);
      // iqArray[currentQuestion].intraCount += 1;
    }
    console.log('music is ', musicalCount);
    console.log('linguist is ', linguistCount);
    console.log('visual is ', spatialCount);
    console.log('intra is ', intraCount);
    console.log('inter is ', interCount);
    console.log('bodily is ', bodilyCount);
    console.log('logic is ', logicCount);
    console.log(event.target);
    console.log('***IQ ARRAY: ARE THERE SEVEN?!?!*** ', iqArray);
    //  clear for next round

    currentQuestion++;
    qcounter++;

    showQuestion();
    showTitle();
    // showAudio();
    showAnswers();
  } else {
    console.log('DONE');
    showMeResults();
  }
  // createChart();
// types[testQuestions[parseInt(currentQuestion)].category]++;
// console.log('types are', types[testQuestions[parseInt(currentQuestion)].category]);
}

// function createChart() {
//   var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'teal', 'magenta'];
//   var ctx = document.getElementById('myChart').getContent('2d');
//   ctx.canvas.width = 400;
//   ctx.canvas.height = 275;
//   var myChart = new Chart(ctx, {
//     type: 'pie',
//     data: {
//       labels: 
//     }
//   })
// }


function handleFalse(event) {
  console.log(event.target);
  if (qcounter<testQuestions.length){
  // clear for next round

    qcounter++;
    currentQuestion++;
    showQuestion();
    showTitle();
    // showAudio();
    showAnswers()
    showMeResults();
  };

}

// console.log(musical);

// Have progress bar across top. (maybe stretch goal)

// event handler will add to general counter and intelligence specific counters as well as prompting next question

// create a function that will push new questions into the template

function showMeResults() {

  // Bring to a close by turning off the event handler
  document.getElementById("true").removeEventListener('click', handleTrue);
  document.getElementById("false").removeEventListener('click', handleFalse);

  // tuck away the test forms
  surveytop.parentElement.removeChild(surveytop);
  surveymid.parentElement.removeChild(surveymid);
  surveybottom.parentElement.removeChild(surveybottom);



  // get the results section from DOM
  var intelReport = document.getElementById('results');

  // Assign content as empty string so we can dynamically create
  intelReport.innerHTML = '';
  var headline = document.createElement('h2');
  headline.innerHTML = `${userLog[UserInfo].name}, your strongest intelligence is: [intelligence here]`
  // Attach it, or it won't show up:
  intelReport.appendChild(headline);
  
  // and display the pic chart
}
