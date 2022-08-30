const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    // user: { type: ObjectId, required: true, ref: "user" },
    user: {
      // 수정 후
      _id: { type: ObjectId, required: true, ref: "user" },
      fullNmae: { type: String, required: true },
    },
    blog: { type: ObjectId, required: true, ref: "blog" },
  },
  { timestamps: true }
);

const Comment = model("comment", CommentSchema);

module.exports = { Comment, CommentSchema };
