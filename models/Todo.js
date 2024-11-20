const mongoose = require('mongoose');

// Define the To-Do Schema
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Task title (required)
  isCompleted: { type: Boolean, default: false }, // Completion status (default: false)
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Export the Model
module.exports = mongoose.model('Todo', TodoSchema);
