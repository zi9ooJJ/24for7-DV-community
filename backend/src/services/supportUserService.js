import bcrypt from "bcrypt";
import { userModel, supportUserModel } from "../db/models";
import { UserService } from "./userService";

class SupportUserService extends UserService {
  constructor(UserModel, SupportUserModel) {
    super(UserModel);
    this.supportUserModel = SupportUserModel;
  }

  async addUser(userInfo) {
    const { email, password } = userInfo;

    const found = await this.supportUserModel.findByEmail(email);

    if (found) {
      throw new Error(`이미 가입된 이메일 입니다.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      ...userInfo,
      password: hashedPassword,
    };

    const createdNewUser = await this.supportUserModel.create(newUserInfo);

    return createdNewUser;
  }
}

const supportUserService = new SupportUserService(userModel, supportUserModel);

export { supportUserService };
