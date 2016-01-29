var Participant = require('./model');
var _ = require('lodash');
var logger = require('../../utils/logger');

exports.params = function(req, res, next, id) {
    Participant.findById(id)
        .then(function(participant) {
            if (!participant) {
                next(new Error('No participant with that id'));
            } else {
                req.participant = participant;
                next();
            }
        }, function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    Participant.find({})
        .then(function(participants) {
            res.json(participants);
        }, function(err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    var participant = req.participant;
    res.json(participant);
};

exports.put = function(req, res, next) {
    var participant = req.participant;

    var update = req.body;

    _.merge(participant, update);

    participant.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function(req, res, next) {
    var newParticipant = req.body;
    Participant.create(newParticipant)
        .then(function(participant) {
            res.json(participant);
        }, function(err) {
            logger.error(err);
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};