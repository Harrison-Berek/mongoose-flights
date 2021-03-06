const { findById } = require('../models/flight');
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    show, 
    new: newFlight,
    create,
};

function getDefaultDate() {
    let testFlight = new Flight();
    let dt = testFlight.departs
    let destDate = dt.toISOString().slice(0, 16);
    return destDate;
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
       res.render('flights/index', {flights});
    });
};

function show (req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
        res.render('flights/show', { title: "Flight Details", flight, tickets});
        })
    })
}

function newFlight(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/new', { 
            title : 'Add Flight',
            defaultDate: getDefaultDate() 
    })
    })
};

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
    if (err) return res.redirect('/flights/new');
    res.redirect('/flights');
});
}