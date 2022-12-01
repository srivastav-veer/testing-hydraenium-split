var curl = require('curl');

function getNumber() {
  return new Promise ((resolve, reject) => {
    curl.get('http://13.233.151.221:8080/numbers/get',{}, function (err, response, body) {
      number = JSON.parse(body);
      number = number.number;
      resolve(number);
    })
  });
}
//http://13.233.151.221:8080/numbers/set?number
function setNumber(number) {
  return new Promise ((resolve, reject) => {
    curl.get('http://13.233.151.221:8080/numbers/set?number='+number, {}, (err, response, body) => {
      console.log(body);
      number = JSON.parse(body);
      number = number.number;
      resolve(number);
    });
  });
}

(async () => {
  exit = false;
  let counter=0;
  while (!exit) {
    let number = await getNumber();
    if (number) {
      let num = 1;
      for (num = 1, i=number ; ((num < number*9891) && i<100) ; i=i/2) {
        console.log(num);
        num *= i
      }
      console.log('calculated:', num);
      response = await setNumber(num);
      counter++;
      console.log('Completed:', counter, response);
      if (!response) {
        exit = true;
      }
    } else {
      exit = true;
    }
  }
  console.log('Exiting');
})();

