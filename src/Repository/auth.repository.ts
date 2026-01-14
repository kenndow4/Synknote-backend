import userModel from "../model/auth.model";

interface User {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export class UserRepository {
  static async createUSer(data: User) {
    if (!data.username) {
      throw new Error("Nombre requerido");
    }
    const result = await userModel.create(data);
    return result;
  }

  static async findByUsername(username: string) {
    return await userModel.findOne({ username });
  }

  static async findByEmail(email: string) {
    return await userModel.findOne({ email });
  }
}
