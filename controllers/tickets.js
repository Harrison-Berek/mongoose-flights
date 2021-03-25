const Ticket = require('../models/ticket');
const Flight = require('../models/flight')

module.exports = {
    create,
    new: newTicket
};

function newTicket(req, res) {
    const flightId = req.params.id;
    console.log(req.params.id);
    res.render('tickets/new', { flightId: flightId})
};

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`)
    })
};


