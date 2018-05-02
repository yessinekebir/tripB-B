const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
  admin: {type: Schema.Types.ObjectId, ref:'User'},
  city: {type: String, required: true,index:{sparse:true}},
  address: {type: String, required: true},
  price: {type: Number, required: true},
  rents: {type: Schema.Types.ObjectId, ref:'Rent'},
  likes: {type: Number, default:0}
});

module.exports = mongoose.model('House', HouseSchema);
