const createError = require('http-errors');

const Game = require('../models/Game');
const Ticket = require('../models/Ticket');

module.exports = {
    createGame: (req, res, next) => {
        try {
            let game = new Game({
                drownNumbers: []
            });
            game.save();
            if (!game)
                return next(createError(426, 'Do not have any game.'));
            res.json({ 'gameId': game._id });
        } catch (err) {
            return next(err);
        }
    },

    generateTicket: async (req, res, next) => {
        try {
            let ticket = new Ticket({
                gameId: req.params.gameId,
                userName: req.params.userName
            })
            await ticket.save();
            if (!ticket)
                return next(createError(426, 'Do not have any ticket.'));
            res.json({ 'ticketId': ticket._id });
        } catch (err) {
            console.log(err);

            return next(err);
        }
    },

    randomNumber: async (req, res, next) => {
        try {
            let randomNumber = await drawRandomNumber(req.params.gameId);
            let game = await Game.findOneAndUpdate({ _id: req.params.gameId }, {
                $push: { drawnNumbers: randomNumber }
            })
            if (game)
                res.json({ 'randomNumber': randomNumber });
            else
                return next(createError(426, 'Something went wrong! Please try again.'))
        } catch (err) {
            return next(err);
        }
    },

    pickedNumbers: async (req, res, next) => {
        try {
            let game = await Game.findOne({ _id: req.params.gameId });
            if (!game)
                return next(createError(426, 'Do not have any picked numbers.'));
            res.json({ 'pickedNumbers': game.drawnNumbers });
        } catch (err) {
            return next(err);
        }
    },

    stats: async (req, res, next) => {
        try {
            let game = await Game.findOne({ _id: req.params.gameId });
            if (!game)
                return next(createError(426, 'Do not have any game.'));
            let tickets = await Ticket.find({ gameId: req.params.gameId });
            if (tickets.length == 0)
                return next(createError(426, 'Do not have any ticket and user in the game.'));
            res.json({
                'picked numbers': game.drawnNumbers,
                'number of tickets': tickets.length,
                'number of users': tickets.length
                //ticket have userName so each ticket is corresponding to one user
            });
        } catch (err) {
            return next(err);
        }
    },

    printTicket: async (req, res, next) => {
        try {
            let ticket = await Ticket.findOne({ _id: req.params.ticketId });
            if (!ticket)
                return next(createError(426, 'Do not have any ticket.'))
            console.log(ticket.ticket);
            res.json({ 'ticket': ticket.ticket });
        } catch (err) {
            return next(err);
        }
    }
}

const drawRandomNumber = async (gameId) => {
    try {
        let min = 1, max = 90;
        let number = Math.floor((max - min + 1) * Math.random()) + min;
        console.log("random num------", number);

        let drawnNumber = await Game.findOne({
            _id: gameId, drawnNumbers: { $elemMatch: { $eq: number } }
        });

        if (drawnNumber)
            drawRandomNumber(gameId);
        else
            return number;
    } catch (err) {
        throw err;
    }
}