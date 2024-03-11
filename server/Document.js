const { Schema, model } = require("mongoose")

const documentSchema = new Schema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
    ref: "User", // Assuming you have a User model for user authentication
    required: true,
  },
  data: {
    type: Object,
  },
});

module.exports = model("Document", documentSchema);
