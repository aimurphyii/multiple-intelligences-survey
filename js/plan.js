'use-strict'
// Form:
// create a form that asks for name, DOB, and date, as well as a button that submits the form and starts the test.
// grab from DOM via event handler, and store the newly input information

var userInfo = [];

var userName = document.getElementsByName('name');
var birthDate = document.getElementsByName('birthdate');
var testDate = document.getElementsByName('date');

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

function IqType(qvalue, category) {
  this.qvalue = qvalue;
  this.category = category;
  this.counter = 0;

testQuestions.push(this);
}

// Have progress bar across top. (maybe stretch goal)

// event handler will add to general counter and intelligence specific counters as well as prompting next question

// create a function that will push new questions into the template