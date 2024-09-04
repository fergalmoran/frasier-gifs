import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const hashed = await bcrypt.hash(password, 0);
  return hashed;
};

export const confirmPassword = async (
  password: string,
  hashed: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hashed);
  return result;
};
