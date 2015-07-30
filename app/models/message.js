var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true, min: 10, max: 200},
  status: {type: String, default: 'initialized'},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

MessageSchema.pre('save', function(next) {
  var now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

MessageSchema.virtual('date')
.get(function() {
  return this._id.getTimestamp();
});

mongoose.model('Message', MessageSchema);

