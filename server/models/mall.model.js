const mongoose = require('mongoose');
const {Schema} = mongoose

const MallSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name cannot be empty']
  },
  address:{
    type:String,
    required:[true, 'Address Cannot be empty']
  }
}, {
  timestamps:true
})

module.exports = mongoose.model('Mall',MallSchema)
