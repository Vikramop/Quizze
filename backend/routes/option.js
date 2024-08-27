const express = require('express');
const router = express.Router();
const Option = require('../schema/option.schema'); // Adjust the path as needed

// Route to update an existing option
router.put('/options/:optionId', async (req, res) => {
  try {
    const { optionId } = req.params;
    const { text, imageUrl, type } = req.body;

    // Find and update the option
    const updatedOption = await Option.findByIdAndUpdate(
      optionId,
      { text, imageUrl, type },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Option not found' });
    }

    res.json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
