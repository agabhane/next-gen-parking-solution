var mongoose = require('mongoose');

var slotSchema = new mongoose.Schema({
    companyId: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    type: {
        type: String, required: true
    },
    capacity: {
        type: Number, required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Slot', slotSchema);