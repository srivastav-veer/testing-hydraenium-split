var numbers = [];
var output = [];
var fs = require('fs');
var totalLength = null;

function getRandumNumber(length) {
    let min = Math.pow(10, (length-1));
    let max = Math.pow(10, (length));
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    generate: function (length) {
        for (i=0; i<length; i++) {
            let num = getRandumNumber(6);
            numbers.push(num);
        }
        totalLength = numbers.length;
    },
    _get: function () {
        if (numbers.length === totalLength) {
            //write this to a file.
            fs.writeFile('startTime.log', 'Started at '+Math.floor(new Date().getTime() / 1000), function() {console.log('written')});
        }
        if (numbers.length==0) {
            return false;
        }
        return numbers.pop();
    },
    _set: function (number) {
        output.push(number);
        if (output.length === totalLength) {
            fs.writeFile('endTime.log', 'End at '+Math.floor(new Date().getTime() / 1000), function() {console.log('End')});
            return false;
        } else {
            return true;
        }
    },
    getLength: function() {
        return numbers.length;
    }
}

