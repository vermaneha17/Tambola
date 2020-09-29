const express = require('express');

const router = new express.Router();
const gameController = require('../controllers/game');

router.post('/api/game/create', gameController.createGame);
router.post('/api/game/:gameId/ticket/:userName/generate', gameController.generateTicket);
router.get('/api/ticket/ticketId', gameController.printTicket);
router.post('/api/game/:gameId/number/random', gameController.randomNumber);
router.get('/api/game/:gameId/numbers', gameController.pickedNumbers);
router.get('/api/game/:gameId/stats', gameController.stats);
module.exports = router;
