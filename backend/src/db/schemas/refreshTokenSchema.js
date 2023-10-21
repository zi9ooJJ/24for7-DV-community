import { Schema } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
    expires: {
      type: Date,
    },
  },
  { timestamps: true },
);

export { refreshTokenSchema };
