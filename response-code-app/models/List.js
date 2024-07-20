const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  responseCodes: [String],
  imageLinks: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('List', ListSchema);
