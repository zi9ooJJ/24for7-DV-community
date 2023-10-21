import { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    contents: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000, // 글자 제한 수 의논 필요
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
    // 이미지 업로드 깜빡함, 추후 추가 예정
  },
  { timestamps: true },
);

export { postSchema };
