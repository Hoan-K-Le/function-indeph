'use strict';

// Passing arguments Works: value vs reference
// const bookings = [];

// const createBooking = function(flightNum, numPassengers, price) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');

// const flight = 'LH234';
// const jonas = {
//   name: 'Hoan Le',
//   passport: 231413242
// };

// const checkIn = function(flightNum, passenger) {
//   (flightNum = 'LH999'), (passenger.name = 'MR. ' + passenger.name);

//   if (passenger.passport === 231413242) {
//     alert('Check In');
//   } else {
//     alert('wrong passport!');
//   }
// };
// checkIn(flight, jonas);

// const newPassport = function(person) {
//   person.passport = Math.floor(Math.random() * 10000000);
// };

// newPassport(jonas);

// Check if there is a vowel in the name
// const checkVowel = str => {
//   if (
//     str == 'a' ||
//     str == 'e' ||
//     str == 'i' ||
//     str == 'o' ||
//     str == 'u' ||
//     false
//   ) {
//   }
//   console.log('It has a vowel in there');
// };
// console.log(checkVowel('hoan'));

// Functions Accepting callback Functions
const oneWord = function(str) {
  // replaces the space
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// HIGHER ORDER FUNCTION
const transformer = function(str, fn) {
  // using only the str parameter
  console.log(`Original String: ${str}`);
  // using the callback function with the str
  console.log(`Transformed string: ${fn(str)}`);
  // using the fn function to get the name of the function
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const capitalFirst = firstName => {
  const [firstName1, ...others] = firstName.split('');
  return [firstName1.toUpperCase(), ...others].join('');
};
console.log(capitalFirst('hoan'));

const transformFirstName = (name, fn) => {
  console.log(`Transformed name working: ${fn(name)}`);
};

console.log(transformFirstName('hoan', capitalFirst));

// // JS uses callbacks all the time
// const high5 = function() {
//   console.log('hi');
// };

// document.body.addEventListener('click', high5);

// [('Jonas', 'Martha', 'Adam')].forEach(high5);

// // count how many letters are repeated in the str
// let countCharacters = string => {
//   let count = 1;
//   for (let i = 0; i < string.length; i++) {
//     if (string[i] === string[i + 1]) {
//       count++;
//     } else {
//       console.log(`${string[i]} occur ${count} times`);
//       count = 1;
//     }
//   }
// };

// console.log(countCharacters('Haahn'));

// FUNCTION THAT RETURNS A FUNCTION
// const greet = function(greeting) {
//   return function(name) {
//     console.log(`${greeting} ${name} `);
//   };
// };
// const greeterHey = greet('hey');
// greeterHey('hoan');
// greeterHey('Jonas');
// greet('hello')('Hoan');

// // Practice
// const firstName2 = firstName => {
//   return function(lastName) {
//     console.log(`${firstName} ${lastName}`);
//   };
// };

// const firstName4 = firstName2('Hoan');
// firstName4('Le');

// // USING ARROW FUNCTION
// const greetArrow = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greetArrowHey = greetArrow('Hey');
// // or
// greetArrow('Hey')('Bree');
// greetArrowHey('Hoan');

// THIS KEYWORD
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // function
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  }
};

lufthansa.book(239, 'Hoan Le');
lufthansa.book(635, 'Bree Sabado');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: []
};

const book = lufthansa.book;

// DOES NOT WORK
// book(23, 'Sarah Williams');
console.log(book);
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 23, 'Mary Poppins');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: []
};

book.call(swiss, 583, 'Marry Cooper');
console.log(swiss);

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// Modern way of adding into an object
book.call(swiss, ...flightData);

// BIND
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23, 'jake');
bookEW23('Hoan LEEEE');
bookEW23('BREEEEEE');

// With Event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
// const addTax = (rate, value) => {
//   return value + value * rate;
// };
// console.log(addTax(0.1, 200));

// first argument is if its binded to something
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(200));

// Jonas way
const addTaxRate = function(rate) {
  return function(value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(200));

// Hoans way
const addTax = value => {
  return function(rate) {
    const taxRate = value + value * rate;
    console.log(taxRate);
  };
};
const addTaxValue = addTax(200);
addTaxValue(0.23);

// FUNCTION THAT RETURNS A FUNCTION
// const greet = function(greeting) {
//   return function(name) {
//     console.log(`${greeting} ${name} `);
//   };
// };

// CHALLENGE

// const poll = {
//   question: 'What is your favorite programming language?',
//   options: ['0: JavaScript', '1: Python', '2:Rust', '3: C++'],
//   // This generates [0,0,0,0]. More in the next section
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get Answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     // Register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;
//     this.displayResults();
//     this.displayResults('string');
//   },

//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // poll results are 13,2,4,1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   }
// };

// poll.registerNewAnswer();
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// 3;

// IMMEDIATELY INVOKED FUNCTIONS EXPRESSION
// const runOnce = function() {
//   console.log('thios will never run again');
// };
// runOnce();

// // IIFE
// (function() {
//   console.log('this will never run again');
// })();

// () => console.log('This will ALSO never run again')();

// CLOSURE
const secureBooking = function() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// Storing the function in the variable booker
const booker = secureBooking();

booker();
booker();
booker();

// Closure example

// Example 1
let f;

const g = function() {
  const a = 23;
  f = function() {
    console.log(a * 2);
  };
};

const h = function() {
  const b = 777;
  f = function() {
    console.log(b * 2);
  };
};

g();
f();
// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
// const boardPassenger = function(n, wait) {
//   const perGroup = n / 3;
//   setTimeout(function() {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);
//   console.log(`Will start boarding in ${wait} seconds`);
// };

// boardPassenger(180, 3);

(function() {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
