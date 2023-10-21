import { Schema } from "mongoose";

const supportUserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["pending", "support"],
      default: "pending",
    },
  },
  { discriminatorKey: "kind", timestamps: true },
);

export { supportUserSchema };
