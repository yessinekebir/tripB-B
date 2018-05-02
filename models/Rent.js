const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
  renter: {type: Schema.Types.ObjectId, ref:'User'},
  start: {type: Date , required: true}, //definisci come Date
  end: {type: Date , required: true},  // definisci come Date
  cost: {type: Number},
  house: {type:Schema.Types.ObjectId, ref:'House'}
});

module.exports = mongoose.model('Rent', RentSchema);
