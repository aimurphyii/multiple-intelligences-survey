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
// get the results section from DOM
var intelReport = document.getElementById('results');

// how we will create the user object
var UserInfo = function (name, birthdate, testdate) {
  this.name = name;
  this.birthdate = birthdate;
  this.testdate = testdate;
};

// this is where we access our user info
var savedUser = [];


// this guides our script to populate and refer to our questions, it also keeps a running count of where we are in the survey
var currentQuestion = 0;

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

//These will feed our chart
var  myPieChart;
var chartDrawn = false;
var iqArray = [];
var labels = [
  'Linguistic',
  'Logical-Mathematical',
  'Musical',
  'Bodily-Kinesthetic',
  'Spatial',
  'Interpersonal',
  'Intrapersonal',
];

// this array stores all of our question objects
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
};

new IqType('I’d rather draw a map than give someone verbal directions.', 'spatial', '1', 'audio/q1.mp3');
new IqType('If I am angry or happy, I usually know exactly why.', 'intra', '2', 'audio/q2.mp3');
new IqType('I can play (or used to play) a musical instrument.', 'musical', '3', 'audio/q3.mp3');
new IqType('I can associate music with my moods.', 'musical', '4', 'audio/q4.mp3');
new IqType('I can add or multiply quickly in my head.', 'logic', '5', 'audio/q5.mp3');
new IqType('I can help a friend sort out strong feelings because I successfully dealt with similar feelings myself.', 'intra', '6', 'audio/q6.mp3');
new IqType('I like to work with calculators and computers.', 'logic', '7', 'audio/q7.mp3');
new IqType('I pick up new dance steps fast.', 'bodily', '8', 'audio/q8.mp3');
new IqType('It is easy for me to say what I think in an argument or debate.', 'linguist', '9', 'audio/q9.mp3');
new IqType('I enjoy a good lecture, speech, or sermon.', 'linguist', '10', 'audio/q10.mp3');
new IqType('I always know north from south no matter where I am.', 'spatial', '11', 'audio/q11.mp3');
new IqType('I like to gather together groups of people for parties of special events.', 'inter', '12', 'audio/q12.mp3');
new IqType('Life seems empty without music.', 'musical', '13', 'audio/q13.mp3');
new IqType('I always understand the drawings that come with new gadgets or appliances.', 'spatial', '14', 'audio/q14.mp3');
new IqType('I like to work puzzles and play games.', 'logic', '15', 'audio/q15.mp3');
new IqType('Learning to ride a bike (or skates) was easy.', 'bodily', '16', 'audio/q16.mp3');
new IqType('I am irritated when I hear an argument or statement that sounds illogical.', 'linguist', '17', 'audio/q17.mp3');
new IqType('I can convince other people to follow my plans.', 'inter', '18', 'audio/q18.mp3');
new IqType('My sense of balance and coordination is good.', 'bodily', '19', 'audio/q19.mp3');
new IqType('I often see patterns and relationships between numbers faster and easier than others do.', 'logic', '20', 'audio/q20.mp3');
new IqType('I enjoy building models (or sculpting).', 'bodily', '21', 'audio/q21.mp3');
new IqType('I’m good at finding the fine points of word meanings.', 'linguist', '22', 'audio/q22.mp3');
new IqType('I can look at an object one way and see it turned sideways or backwards just as easily.', 'spatial', '23', 'audio/q23.mp3');
new IqType('I often connect a piece of music with some event in my life.', 'musical', '24', 'audio/q24.mp3');
new IqType('I like to work with numbers and figures.', 'logic', '25', 'audio/q25.mp3');
new IqType('I like to sit quietly and reflect on my inner feelings.', 'intra', '26', 'audio/q26.mp3');
new IqType('Just looking at shapes of buildings and structures is pleasurable to me.', 'spatial', '27', 'audio/q27.mp3');
new IqType('I like to hum, whistle, and sing in the shower or when I’m alone.', 'musical', '28', 'audio/q28.mp3');
new IqType('I’m good at athletics.', 'bodily', '29', 'audio/q29.mp3');
new IqType('I enjoy writing detailed letters to friends.', 'linguist', '30', 'audio/q30.mp3');
new IqType('I’m usually aware of the expression on my face.', 'intra', '31', 'audio/q31.mp3');
new IqType('I’m sensitive to the expressions on other people’s faces.', 'inter', '32', 'audio/q32.mp3');
new IqType('I stay “in touch” with my moods. I have no trouble identifying them.', 'intra', '33', 'audio/q33.mp3');
new IqType('I am sensitive to the moods of others.', 'inter', '34', 'audio/q34.mp3');
new IqType('I have a good sense of what others think of me.', 'inter', '35', 'audio/q35.mp3');


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
  savedUser.push(newUser);

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
  if (currentQuestion<testQuestions.length) {
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
    }

    console.log('music is ', musicalCount);
    console.log('linguist is ', linguistCount);
    console.log('spatial is ', spatialCount);
    console.log('intra is ', intraCount);
    console.log('inter is ', interCount);
    console.log('bodily is ', bodilyCount);
    console.log('logic is ', logicCount);
    console.log(event.target);

    //  clear for next round

  currentQuestion++;

    showQuestion();
    showTitle();
    // showAudio();
    showAnswers();
  } else {
    console.log('DONE');
    showMeResults();
  }
}

// handles false answers by moving to next question and counting up or rendering results
function handleFalse(event) {
  console.log(event.target);

  if (currentQuestion<testQuestions.length-1){

    currentQuestion++;
    showQuestion();
    showTitle();
    // showAudio();
    showAnswers()
  }else{
    showMeResults();
  };
  }

// console.log(musical);

// Have progress bar across top. (maybe stretch goal)

// event handler will add to general counter and intelligence specific counters as well as prompting next question

function showMeResults() {
// create and render chart data
  iqArray.push(parseInt(linguistCount));
  iqArray.push(parseInt(logicCount));
  iqArray.push(parseInt(musicalCount));
  iqArray.push(parseInt(bodilyCount));
  iqArray.push(parseInt(spatialCount));
  iqArray.push(parseInt(interCount));
  iqArray.push(parseInt(intraCount));
  console.log('iqarray is currently, ', iqArray);

  // Bring to a close by turning off the event handler
  document.getElementById("true").removeEventListener('click', handleTrue);
  document.getElementById("false").removeEventListener('click', handleFalse);

  // tuck away the test forms
  surveytop.parentElement.removeChild(surveytop);
  surveymid.parentElement.removeChild(surveymid);
  surveybottom.parentElement.removeChild(surveybottom);


  // Assign content as empty string so we can dynamically create
  intelReport.innerHTML = '';
  var headline = document.createElement('h2');
  headline.innerHTML = `${savedUser[0].name}, your strongest intelligence is: [intelligence here]`
  // Attach it, or it won't show up:
  intelReport.appendChild(headline);

  // and display the pie chart
  createChart();
}

// now we are going to build out the data object for our chart
var data = {
  // created an array with strings for naming puroses
  labels: labels,
  datasets: [
    {
      // using repurpsed array to render type counts for chart data
      data: iqArray,
      // used corresponding colors from css
      backgroundColor: [
        'rgba(204, 68, 75, 0.60)',
        'rgba(255, 111, 188, 0.60)',
        'rgba(133, 253, 255, 0.60)',
        'rgba(112, 255, 200, 0.60)',
        'rgba(89, 99, 232, 0.60)',
        'rgba(224, 255, 98, 0.60)',
        'rgba(232, 170, 89, 0.60)',
      ],
    }
  ]
};

// make a chart
function createChart() {
  // this is the line that is giving grief

  var ctx = document.getElementById('myChart').getContext('2d');
  ctx.canvas.width = 200;
  ctx.canvas.height = 75;



  // this is where the chart is actually built, the data traces back to our data object above

  myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    // options: options
  });
  // change the boolean for our chart
  chartDrawn = true;
}
