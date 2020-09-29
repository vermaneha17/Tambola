const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    drawnNumbers: [{
        type: Number
    }]
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;