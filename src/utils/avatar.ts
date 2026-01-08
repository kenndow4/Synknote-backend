export default class generateAvatar {
  static generate(seed: string) {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      seed
    )}`;
  }
}
