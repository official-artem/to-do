import { TodoStatus } from "appTypes/todo.type";
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: TodoStatus
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  }
});

export default mongoose.model('Todo', taskSchema);