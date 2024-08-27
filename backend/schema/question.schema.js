const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    type: {
      type: String,
      enum: ['MCQ', 'Poll'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);
