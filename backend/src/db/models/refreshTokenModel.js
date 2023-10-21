import { model } from "mongoose";
import { refreshTokenSchema } from "../schemas";

const RefreshToken = model("RefreshToken", refreshTokenSchema);

class RefreshTokenModel {
  async create({ userId, token, expires }) {
    const newToken = await RefreshToken.create({ userId, token, expires });
    return newToken;
  }

  async findByUserId(userId) {
    const user = await RefreshToken.findOne({ userId });
    return user;
  }

  async updateByUserId(userId, { token, expires }) {
    const updatedToken = await RefreshToken.findOneAndUpdate(
      { userId },
      { token, expires },
      { new: true },
    );
    return updatedToken;
  }

  async deleteByUserId(userId) {
    const result = await RefreshToken.deleteOne({ userId });
    return result;
  }
}

const refreshTokenModel = new RefreshTokenModel();

export { refreshTokenModel };
