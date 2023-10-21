import { Schema } from "mongoose";

const replySchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isWriter: {
      type: Boolean,
      require: true,
      default: false,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
      //required: true,
      default: null,
    },
    contents: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500, // 글자 제한 수 의논 필요
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export { replySchema };
