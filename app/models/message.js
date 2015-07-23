var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: String,
  text: String,
  status: {type: String, default: 'initialized'}
});

MessageSchema.virtual('date')
  .get(function() {
    return this._id.getTimestamp();
  });

mongoose.model('Message', MessageSchema);

