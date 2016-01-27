var Client = require('./model');
var _ = require('lodash');
var logger = require('../../utils/logger');

exports.params = function(req, res, next, id) {
    Client.findById(id)
        .then(function(client) {
            if (!client) {
                next(new Error('No client with that id'));
            } else {
                req.client = client;
                next();
            }
        }, function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    Client.find({})
        .then(function(clients) {
            res.json(clients);
        }, function(err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    var client = req.client;
    res.json(client);
};

exports.put = function(req, res, next) {
    var client = req.client;

    var update = req.body;

    _.merge(client, update);

    client.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function(req, res, next) {
    var newClient = req.body;
    newClient.author = req.user._id;
    Client.create(newClient)
        .then(function(client) {
            res.json(client);
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