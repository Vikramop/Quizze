const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'image', 'image and text'],
      required: true,
    },
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Option', OptionSchema);
