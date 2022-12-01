var curl = require('curl');

function getNumber() {
  return new Promise ((resolve, reject) => {
    curl.get('http://localhost:8080/numbers/get',{}, function (err, response, body) {
      number = JSON.parse(body);
      number = number.number;
      resolve(number);
    })
  });
}

function setNumber(number) {
  return new Promise ((resolve, reject) => {
    curl.get('http://localhost:8080/numbers/set?number='+number, {}, (err, response, body) => {
      console.log(body);
      number = JSON.parse(body);
      number = number.number;
      resolve(number);
    });
  });
}

(async () => {
  exit = false;
  while (!exit) {
    let counter=0;
    let number = await getNumber();
    let num = 1;
    for (num = 1, i=number ; ((num < number*9891) && i<100) ; i=i/2) {
      console.log(num);
      num *= i
    }
    console.log('calculated:', num);
    response = await setNumber(num);
    counter++;
    console.log('Completed:', counter);
    if (!response) {
      exit = true;
    }
  }
})();

