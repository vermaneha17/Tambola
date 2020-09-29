const createError = require('http-errors');

function createTicket() {
    let ticket = new Array(3);
    for (let i = 0; i < ticket.length; i++) {
        fillRow(ticket, i);
    }
    return ticket;
}

function fillRow(ticket, rowIndex) {
    let row = new Array(9);
    let count = 0;
    while (count < 5) {
        let randomColIndx = getEmptyColRandomIndex(row);
        row[randomColIndx] = getUniqueNumber(ticket, randomColIndx, rowIndex);
        count++
    }
    ticket[rowIndex] = row;
}

function getEmptyColRandomIndex(row) {
    let randomIndx;
    do {
        randomIndx = randomInt(0, row.length)
    } while (row[randomIndx] != undefined)
    return randomIndx;
}

function isNumberAlreadyPlaced(ticket, colIndex, rowIndex, number) {
    for (let i = 0; i < rowIndex; i++) {
        if (ticket[i][colIndex] == number) {
            return true;
        }
    }
    return false;
}

function getUniqueNumber(ticket, colIndex, rowIndex) {
    let num;
    do {
        num = getNumber(colIndex);
    } while (isNumberAlreadyPlaced(ticket, colIndex, rowIndex, num));
    return num
}

function getNumber(index) {
    let min, max;
    if (index == 0) {
        min = 1;
        max = 10;
    } else if (index == 8) {
        min = 80;
        max = 91;
    } else {
        min = index * 10;
        max = (index * 10) + 9
    }
    return randomInt(min, max)
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

function printTicket(ticket) {

    for (let i = 0; i < ticket.length; i++) {
        console.log(JSON.stringify(ticket[i]));
    }
}

printTicket(createTicket());

