import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  tasks: [{ text: String, completed: Boolean }],
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
