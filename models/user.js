var mongoose = require('mongoose')
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

var User = new Schema({
  name: String,
  password:String,
  email: String,
  mobile:String,
  avatarUrl: String,
  _roomId: ObjectId,
  online: Boolean,
  level:String,
  level_name:String,
  user_type:String,
  belong_analyst:ObjectId,
  belong_analyst_name:String,
  analyst_intro:String,
  belong_saleMan:String,
  belong_saleMan_name:String
});

module.exports = User