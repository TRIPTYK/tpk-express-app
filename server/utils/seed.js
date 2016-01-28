var Client = require('../api/client/model');
var Invoice = require('../api/invoice/model');

var _ = require('lodash');
var logger = require('./logger');

var clients =[
   {name:'gilles'},
   {name:'vincent'},
   {name:'geoffrey'},
   {name:'max'}
];

var invoices =[
    {amount:'4000'},
    {amount:'1000'},
    {amount:'400'},
    {amount:'50000'}
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};


var createClients = function(data) {

    var addInvoices = function(client, invoice){
        client.invoices.push(invoice);
        return new Promise(function(resolve,reject){
           client.save(function(err,saved){
               return err ? reject(err):resolve(saved);   
           });
        });
    };
    
    var newClients = clients.map(function(client,i){
        client.invoices
    }) 
 
};

var createInvoices = function(data) {

  var promises = invoices.map(function(invoice) {
    return createDoc(Invoice, invoice);
  });

  return Promise.all(promises)
    .then(function(invoices) {
      return _.merge({users: invoices}, data || {});
    });
};

