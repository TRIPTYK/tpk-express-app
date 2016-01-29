var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    birthday: {
        type: String
    },
    sex: {
        type: String
    },
    street: {
        type: String
    },
    number: {
        type: String
    },
    cp: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model('participant', ParticipantSchema);