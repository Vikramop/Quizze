const express = require('express');
const router = express.Router();
const Question = require('../schema/question.schema');
const Option = require('../schema/option.schema');

// Create a new question for a quiz
router.post('/questions', async (req, res) => {
  try {
    const { quizId, type, text, options } = req.body;

    const question = new Question({ quizId, type, text });
    await question.save();

    // Create options if provided
    if (options && options.length > 0) {
      const optionIds = await Promise.all(
        options.map(async (optionData) => {
          const option = new Option({
            ...optionData,
            questionId: question._id,
          });
          await option.save();
          return option._id;
        })
      );
      question.options = optionIds;
      await question.save();
    }

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all questions for a quiz
router.get('/questions/:quizId', async (req, res) => {
  try {
    const questions = await Question.find({
      quizId: req.params.quizId,
    }).populate('options');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a question
router.put('/questions/:questionId', async (req, res) => {
  try {
    const { text, options } = req.body;
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      { text },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (options && options.length > 0) {
      // Update existing options or add new ones
      const optionIds = await Promise.all(
        options.map(async (optionData) => {
          let option;
          if (optionData._id) {
            option = await Option.findByIdAndUpdate(
              optionData._id,
              optionData,
              { new: true }
            );
          } else {
            option = new Option({ ...optionData, questionId: question._id });
            await option.save();
          }
          return option._id;
        })
      );
      question.options = optionIds;
      await question.save();
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a question
router.delete('/questions/:questionId', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
