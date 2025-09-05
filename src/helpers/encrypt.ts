import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string) {
  const passHash = await hash(password, 10);
  return passHash;
}

export async function comparePassword(password: string, hashPass: string) {
  const comparePass = await compare(password, hashPass);
  return comparePass;
}
