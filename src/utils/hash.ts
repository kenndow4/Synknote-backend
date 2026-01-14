import argon2 from "argon2";

export class Hash {
  static async hash(value: string): Promise<string> {
    return argon2.hash(value);
  }

  static async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
