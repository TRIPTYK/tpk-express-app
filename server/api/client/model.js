var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    town: {
    	type: String 
    },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'invoice' }]
});

module.exports = mongoose.model('client', ClientSchema);