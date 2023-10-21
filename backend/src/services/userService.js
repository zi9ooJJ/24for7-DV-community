import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel, supportUserModel, refreshTokenModel } from "../db/models";

class UserService {
  constructor(userModel, supportUserModel, refreshTokenModel) {
    this.userModel = userModel;
    this.supportUserModel = supportUserModel;
    this.refreshTokenModel = refreshTokenModel;
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  async addUser(userInfo) {
    const { email, password } = userInfo;

    // TODO: soft Delete 적용시 수정 필요
    // isDeleted = true일 때와 false일 때

    const found = await this.userModel.findByEmail(email);
    if (found) {
      throw new Error(`이미 가입된 이메일 입니다.`);
    }

    const hashedPassword = await this.hashPassword(password);
    const newUserInfo = { ...userInfo, password: hashedPassword };

    let createdNewUser = null;
    if (userInfo.role === "user") {
      createdNewUser = await this.userModel.create(newUserInfo);
    } else {
      createdNewUser = await this.supportUserModel.create(newUserInfo);
    }

    return createdNewUser;
  }

  async getUserById(userId) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error(`userId가 DB에 존재하지 않습니다`);
    }

    return user;
  }

  async getUsersByRole(role) {
    const validRoles = ["user", "pending", "support"];
    const isValidRole = validRoles.includes(role);

    if (!isValidRole) {
      throw new Error(`유효한 userRole이 아닙니다.`);
    }
    const users = await this.userModel.findByRole(role);
    return users;
  }

  async getTokenByUserId(userId) {
    const user = await this.refreshTokenModel.findByUserId(userId);
    return user;
  }

  async editUser(userInfo, toUpdate) {
    const { userId, currentPassword } = userInfo;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error(`userId가 DB에 존재하지 않습니다`);
    }

    let newToUpdate = { ...toUpdate };

    if (currentPassword) {
      const correctPassword = user.password;
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        correctPassword,
      );

      if (!isPasswordCorrect) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      const { password, ...rest } = toUpdate;

      if (password) {
        const hashedPassword = await this.hashPassword(password);
        newToUpdate = { ...rest, password: hashedPassword };
      }
    }

    let updatedUser = null;

    if (user.role === "user") {
      updatedUser = await this.userModel.updateById(userId, newToUpdate);
    } else {
      updatedUser = await this.supportUserModel.updateById(userId, newToUpdate);
    }

    return updatedUser;
  }
  async editUserRole(userId, role) {
    const validRoles = ["support"];
    const isValidRole = validRoles.includes(role);

    if (!isValidRole) {
      throw new Error(`유효한 userRole이 아닙니다.`);
    }

    const updatedUser = await this.supportUserModel.updateById(userId, {
      role,
    });

    return updatedUser;
  }

  async login({ email, password }) {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw new Error(`Email을 찾을 수 없습니다.`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("패스워드가 일치하지 않습니다.");
    }
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    await this.createRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }
  async generateAccessToken(user) {
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    return accessToken;
  }

  async generateRefreshToken(user) {
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    return refreshToken;
  }
  async createRefreshToken(userId, token) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const found = await this.refreshTokenModel.findByUserId(userId);

    if (!found) {
      await this.refreshTokenModel.create({
        userId,
        token: token,
        expires,
      });
    } else {
      await this.refreshTokenModel.updateByUserId(userId, {
        token: token,
        expires,
      });
    }
  }
  async updateRefreshToken(userId, token) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.refreshTokenModel.updateByUserId(userId, {
      token: token,
      expires,
    });
  }
  async deleteRefreshToken(userId) {
    await this.refreshTokenModel.deleteByUserId(userId);
  }

  async deleteUser(userId) {
    const user = await this.userModel.deleteById(userId);

    if (!user) {
      throw new Error(`가입된 정보가 없습니다.`);
    }
    await this.refreshTokenModel.deleteByUserId(userId);
    return user;
  }
}

const userService = new UserService(
  userModel,
  supportUserModel,
  refreshTokenModel,
);
export { userService, UserService };
