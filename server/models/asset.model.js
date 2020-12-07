const mongoose = require('mongoose')
const {Schema}  = mongoose

const AssetSchema = new Schema({
  name:{
    type:String,
    required:[true, 'Name Cannot be empty']
  },
  dimension:String,
  location:String,
  status:{
    type: Boolean,
    default:true
  },
  mall:{
    type: Schema.Types.ObjectID,
    ref:'Mall',
    required:[true, 'Associating shopping center cannot be empty']
  }
}, {
  timestamps:true
})

module.exports = mongoose.model('Asset',AssetSchema)
