var Client = require('../api/client/model');
var Invoice = require('../api/invoice/model');

var _ = require('lodash');
var logger = require('./logger');

var clients = [{
    name: 'gilles'
}, {
    name: 'vincent'
}, {
    name: 'geoffrey'
}, {
    name: 'max'
}, {
    name: 'maximilien'
}];

var invoices = [{
    amount: '4000'
}, {
    amount: '1000'
}, {
    amount: '400'
}, {
    amount: '50000'
}];


var cleanDB = function() {
    logger.log('... cleaning the DB');
    var cleanPromises = [Client, Invoice]
        .map(function(model) {
            return model.remove().exec();
        });
    return Promise.all(cleanPromises);
};
var createDoc = function(model, doc) {
    return new Promise(function(resolve, reject) {
        new model(doc).save(function(err, saved) {
            return err ? reject(err) : resolve(saved);
        });
    });
};


var createClients = function(data) {

    var promises = clients.map(function(client) {
        client.invoices = data.invoices[Math.round(Math.random() * data.invoices.length)];
        return createDoc(Client, client);
    });

    return Promise.all(promises)
        .then(function(clients) {
            return _.merge({
                clients: clients
            }, data || {});
        });

};

var createInvoices = function(data) {

    var promises = invoices.map(function(invoice) {
        return createDoc(Invoice, invoice);
    });

    return Promise.all(promises)
        .then(function(invoices) {
            return _.merge({
                invoices: invoices
            }, data || {});
        });
};
cleanDB()
    .then(createInvoices)
    .then(createClients);