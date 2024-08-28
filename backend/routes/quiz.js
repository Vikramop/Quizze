const express = require('express');
const router = express.Router();
const Quiz = require('../schema/quiz.schema');
const Question = require('../schema/question.schema');
const Option = require('../schema/option.schema');
const jwt = require('jsonwebtoken');

// Create a new quiz
// Route to create a new quiz
router.post('/quizzes', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = decoded._id;

    const { name, questionType } = req.body;

    // Create new quiz
    const newQuiz = new Quiz({
      // userId: req.user._id, // Assuming user ID is available in req.user
      userId,
      name,
      questionType,
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router.post('/quizzes', async (req, res) => {
//   try {
//     // Assuming the token is passed in the Authorization header as Bearer token
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

//     const userId = decoded._id; // Extract the userId from the decoded token
//     const { name } = req.body;

//     const newQuiz = new Quiz({
//       userId,
//       name,
//     });

//     await newQuiz.save();
//     res.status(201).json(newQuiz);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Get all quizzes for a user
router.get('/quizzes/:userId', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.params.userId }).populate(
      'questions'
    );
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a quiz
router.put('/quizzes/:quizId', async (req, res) => {
  try {
    const { name } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      { name },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a quiz
router.delete('/quizzes/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a question for a specific quiz
router.post('/quizzes/:quizId/questions', async (req, res) => {
  try {
    const { quizId } = req.params;
    const { type, text, options } = req.body;

    console.log('Received options:', options); // Log the received options

    // Convert options from JSON string if necessary
    let parsedOptions;
    if (typeof options === 'string') {
      try {
        parsedOptions = JSON.parse(options);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid options format' });
      }
    } else {
      parsedOptions = options;
    }

    // Verify the quiz belongs to the authenticated user
    const quiz = await Quiz.findOne({ _id: quizId });
    if (!quiz) {
      return res
        .status(404)
        .json({ message: 'Quiz not found or you do not have permission.' });
    }

    // Check if the number of questions is below 5
    if (quiz.questions.length >= 5) {
      console.log('length :', quiz.questions.length);

      return res
        .status(400)
        .json({ message: 'Cannot add more than 5 questions to a quiz.' });
    }

    // Create new question
    const question = new Question({
      quizId,
      type,
      text,
    });

    // Save question to get its ID
    const savedQuestion = await question.save();

    // If options are provided, create them and link to the question
    if (Array.isArray(parsedOptions) && parsedOptions.length) {
      const optionPromises = parsedOptions.map(async (optionData) => {
        const option = new Option({
          questionId: savedQuestion._id,
          ...optionData,
        });
        return await option.save();
      });
      const savedOptions = await Promise.all(optionPromises);

      // Update question with saved option IDs
      savedQuestion.options = savedOptions.map((option) => option._id);
      await savedQuestion.save();
    }

    // Add question ID to the quiz's questions array
    quiz.questions.push(savedQuestion._id);
    await quiz.save();

    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a specific question
router.delete('/quizzes/:quizId/questions/:questionId', async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    // Verify the quiz belongs to the authenticated user
    const quiz = await Quiz.findOne({ _id: quizId });
    if (!quiz) {
      return res
        .status(404)
        .json({ message: 'Quiz not found or you do not have permission.' });
    }

    // Find and delete the question
    const question = await Question.findOneAndDelete({ _id: questionId });
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    // Remove the question from the quiz's questions array
    quiz.questions = quiz.questions.filter(
      (id) => id.toString() !== questionId
    );
    await quiz.save();

    // Optionally, delete related options
    await Option.deleteMany({ questionId });

    res.status(200).json({ message: 'Question deleted successfully.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
