var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
    amount: {
        type: Number,
        required: true
    }
});

InvoiceSchema.pre('save', function(next){ 
    this.amount = this.amount*2;
    next();
});

module.exports = mongoose.model('invoice', InvoiceSchema);